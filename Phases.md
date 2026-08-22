# Phases.md — Implementation Roadmap

**Project:** Human Resource Management System (HRMS)
**Stack:** React (frontend) · Node.js/Express (backend) · MySQL via MySQL Workbench (database) · Axios (API layer) · JWT (auth)

Phase order follows the dependency chain implied by the source's own architecture: the database schema and the Employee/Auth services must exist before anything else, because Login ID generation depends on employee identity fields, and every other module (Employees dashboard, Profile, Attendance, Time Off, Salary) depends on an authenticated, identified employee. Attendance and Time Off must both exist before Payroll/Salary, since payable days is explicitly computed from Attendance + Time Off. Each phase below is end-to-end for its slice: schema → backend service → API route → Axios integration → frontend UI → connection to dependent modules.

---

## Phase 0 — Project Setup & Tooling

**Objective:** Stand up the repositories, base tooling, and environments so every later phase has somewhere to land.

**Features / Tasks:**
- [ ] Initialize `frontend/` React app (Vite or CRA), install React Router, Axios, Tailwind CSS (or chosen styling approach)
- [ ] Initialize `backend/` Node.js + Express app, install Sequelize, mysql2 driver, jsonwebtoken, bcrypt, joi/express-validator, cors, dotenv
- [ ] Set up MySQL instance (local/dev) and open MySQL Workbench for schema design
- [ ] Configure environment variables for both apps (`.env` for DB connection, JWT secret, API base URL)
- [ ] Set up linting/formatting (ESLint + Prettier) for both apps
- [ ] Set up base folder structure per `Architecture.md`
- [ ] Configure a base Axios client (`src/api/axiosClient.js`) with base URL and interceptor stubs (for future auth header injection)
- [ ] Set up Jest (backend) and Jest + React Testing Library (frontend)

**Dependencies:** None (first phase).

**Expected Deliverables:** Running empty React app; running empty Express app with a health-check route (`GET /api/health`); MySQL instance reachable; repo folder structure matching `Architecture.md`.

**Validation:** `npm run dev` starts both apps without errors; `GET /api/health` returns 200; Axios client resolves the backend base URL.

**Definition of Done:** Both apps boot locally, are connected to source control, and share a documented `.env.example`.

---

## Phase 1 — Database Schema Design (MySQL Workbench)

**Objective:** Model the full HRMS data domain in MySQL Workbench before any backend model code is written, so the schema (not ad hoc ORM guesses) is the source of truth.

**Features / Tasks:**
- [ ] Model `employees` table (identity, private info, resume/about fields, role, login_id, password_hash — see `Architecture.md` Data Architecture)
- [ ] Model `skills` and `certifications` tables (FK → employees)
- [ ] Model `salary_profiles` table (FK → employees, 1:1)
- [ ] Model `attendance_records` table (FK → employees)
- [ ] Model `time_off_requests` table (FK → employees)
- [ ] Model `leave_allocations` table (FK → employees)
- [ ] Define all foreign keys, indexes (e.g., unique index on `login_id`, index on `employee_id` + `date` for attendance), and constraints
- [ ] Export the MySQL Workbench model as `database/hrms_schema.mwb` and forward-engineer the DDL to `database/hrms_schema.sql`
- [ ] Generate/hand-write Sequelize models and initial migration from the exported DDL

**Dependencies:** Phase 0 (MySQL instance and backend app must exist).

**Expected Deliverables:** `hrms_schema.mwb`, `hrms_schema.sql`, Sequelize models for all six entities, initial migration applied to a dev database.

**Validation:** Running the migration against a clean MySQL database creates all tables with correct FKs/indexes; Sequelize can connect and read an empty table for each model.

**Definition of Done:** Schema matches every field enumerated in `Architecture.md`'s Data Architecture section; migration is reproducible from a clean database.

---

## Phase 2 — Auth & User Service + Employee Service (Backend Core)

**Objective:** Implement the two tightly coupled backend services that everything else depends on: employee identity and authentication. (Coupled because Login ID generation needs the employee's name and joining year, per the source's generation rule.)

**Features / Tasks:**
- [ ] Employee Service: `POST /api/employees` (Admin-only) — create employee with base identity fields
- [ ] Auth & User Service: Login ID generator implementing `[OI][First2FirstName][First2LastName][YearOfJoining][4-digit serial]`, including per-year serial increment and collision handling
- [ ] Auth & User Service: first-time password generator + bcrypt hashing before storage
- [ ] Auth & User Service: `POST /api/auth/login` — validate Login ID/Email + password, issue JWT with `role` claim
- [ ] Auth & User Service: `POST /api/auth/change-password`
- [ ] Backend middleware: `authGuard` (verifies JWT), `roleGuard` (checks `admin` vs `employee`)
- [ ] Unit tests for Login ID format, password hashing, and login success/failure paths
- [ ] Unit tests for `roleGuard` denying employee-role requests to admin-only routes

**Dependencies:** Phase 1 (schema/models for `employees` must exist).

**Expected Deliverables:** Working `POST /api/employees`, `POST /api/auth/login`, `POST /api/auth/change-password`; reusable `authGuard`/`roleGuard` middleware.

**Validation:** Creating an employee via API returns a generated Login ID matching the required format; logging in with the returned credentials returns a valid JWT; a request to an admin-only stub route with an employee-role token returns 403.

**Definition of Done:** An Admin can be seeded/created, can create an Employee via the API, and that Employee can log in and receive a token — end to end at the API level (no UI yet).

---

## Phase 3 — Frontend Auth Module + Shared Layout + Route Guards

**Objective:** Build the entry point of the app: Sign In (and the non-functional-for-self-registration Sign Up screen), the shared navigation shell, and role-based routing — wired to the Phase 2 API via Axios.

**Features / Tasks:**
- [ ] `AuthContext` / session state (stores JWT, decoded role, logged-in user)
- [ ] Axios client: attach `Authorization: Bearer <token>` header from `AuthContext`; handle 401 by redirecting to Sign In
- [ ] Sign In page (Login ID/Email + Password fields, Sign In button) calling `POST /api/auth/login`
- [ ] Sign Up page UI (Company Name, Name, Email, Phone, Password, Confirm Password, Upload Logo) — rendered per the source's design, but not wired to create an employee account (per business rule: employees cannot self-register); link back to Sign In
- [ ] Shared top navigation bar (Company Logo, Employees, Attendance, Time Off links) — links become active once further phases add their pages
- [ ] Avatar dropdown (My Profile, Log Out)
- [ ] Systray shell (Check-In/Check-Out buttons + status indicator + timer) — UI only in this phase; wired to Attendance Service in Phase 6
- [ ] Route guards: unauthenticated → redirect to Sign In; role-based route protection (e.g., Admin-only routes)

**Dependencies:** Phase 2 (login endpoint must exist and issue role-bearing JWT).

**Expected Deliverables:** Functional Sign In flow; app shell with nav/avatar/systray visible after login; protected routes redirecting appropriately by auth state and role.

**Validation:** Logging in with valid credentials lands the user on a protected placeholder route; logging out clears session and blocks protected routes; an Employee-role session cannot reach an Admin-only placeholder route.

**Definition of Done:** A created Employee (from Phase 2) can sign in through the actual UI and see the shared layout; the Sign Up screen renders but correctly does not create an account.

---

## Phase 4 — Employees Dashboard (Card Grid)

**Objective:** Build the post-login landing page: the employee card grid with search, NEW button, and status indicators — the primary navigation hub into Profile.

**Features / Tasks:**
- [ ] Backend: `GET /api/employees` — list employees with search filter (Admin/HR see all; Employee sees the same list per the source's "View Employees list (cards)" row, view-only)
- [ ] Backend: extend the list endpoint (or add `GET /api/status/:employeeId`) to include a per-employee status field, stubbed initially (`present` default) — full wiring to Attendance/Time Off happens in Phase 9
- [ ] Frontend: Employees Module — card grid component, search bar, NEW button (Admin/HR only) opening the employee-creation form (wired to Phase 2's `POST /api/employees`)
- [ ] Frontend: Employee Card component — photo, name, basic info, status indicator (🟢/✈️/🟡)
- [ ] Frontend: card click routing — Employee role → view-only profile route; Admin/HR role → editable profile route
- [ ] Set this page as the default post-login route

**Dependencies:** Phase 2 (employee list data), Phase 3 (auth/session, layout, routing).

**Expected Deliverables:** Working Employees Dashboard as the landing page after login, with search, NEW (Admin/HR), and clickable cards.

**Validation:** Newly created employees appear in the grid; search filters correctly; clicking a card navigates to the correct profile route/mode for the current role.

**Definition of Done:** Card grid is fully functional against real data; status icons render (even if using stubbed status pending Phase 9).

---

## Phase 5 — Profile Module (Resume, Private Info, Skills, Certifications)

**Objective:** Implement the full My Profile / Employee Profile experience, including role-scoped edit permissions, excluding Salary Info (handled in Phase 8).

**Features / Tasks:**
- [ ] Backend: `GET /api/employees/:id` — return full record for Admin/HR or self; return a field-filtered (non-Salary) record for other Employees viewing a card
- [ ] Backend: `PUT /api/employees/:id` — enforce field-level permission (Employee can only update About/job-love/hobbies/Skills/Certifications sections; Admin/HR can update all non-Salary fields)
- [ ] Backend: skills/certifications sub-resources (`POST/DELETE /api/employees/:id/skills`, `.../certifications`)
- [ ] Frontend: Profile header (photo, name, Login ID, email, mobile, company, department, manager, location)
- [ ] Frontend: Tabs — Resume (About, "what I love about my job", hobbies, edit icons), Private Info (DOB, gender, nationality, marital status, personal email, address, bank details, DOJ, job position, emp code), Skills (list + Add Skills), Certification (list + add)
- [ ] Frontend: view-only rendering mode when opened via card click by a non-admin; editable mode for self and for Admin/HR
- [ ] Wire "My Profile" avatar-dropdown link to this module, pre-loading the logged-in user's own record

**Dependencies:** Phase 4 (card click navigation), Phase 2/3 (auth/role context).

**Expected Deliverables:** Fully working profile view/edit for Resume, Private Info, Skills, Certification tabs, respecting role-based field permissions.

**Validation:** An Employee cannot submit an edit to a restricted field (server rejects it even if attempted); Admin/HR can edit any non-Salary field on any employee; a non-admin opening another employee's card sees a genuinely read-only form.

**Definition of Done:** Profile module is complete except for the Salary Info tab (explicitly deferred to Phase 8, since it depends on Attendance/payable-days concepts introduced later).

---

## Phase 6 — Attendance Service (Backend + Frontend + Systray Wiring)

**Objective:** Implement check-in/check-out, the employee's day-wise monthly view, and the Admin all-employee current-day view; wire the systray built in Phase 3.

**Features / Tasks:**
- [ ] Backend: `POST /api/attendance/check-in`, `POST /api/attendance/check-out` — write/update today's `attendance_records` row for the authenticated user
- [ ] Backend: `GET /api/attendance/me` — day-wise rows for the current month + summary (days present, leaves, total working days)
- [ ] Backend: `GET /api/attendance/today` — Admin/HR only: all employees present today, with filters
- [ ] Backend: work-hours/extra-hours computation from check-in/check-out timestamps
- [ ] Frontend: wire systray Check-In/Check-Out buttons to the new endpoints; flip status indicator red→green on success; running "Since HH:MM" timer
- [ ] Frontend: Attendance Module — Employee view (month selector, date navigation, summary cards, per-day table: Date, Day, Check In, Check Out, Work Hours, Extra hours, Break Time)
- [ ] Frontend: Attendance Module — Admin/HR view (table of all employees present today, filters, date navigation)
- [ ] Add "Attendance" nav link (built in Phase 3) to route here

**Dependencies:** Phase 3 (systray shell, nav), Phase 2 (authenticated employee identity).

**Expected Deliverables:** Fully functional Attendance module for both roles; systray check-in/out working from any page.

**Validation:** Checking in updates the status indicator and creates/updates today's record; checking out computes work hours; the monthly summary matches the sum of day rows; Admin's today view correctly excludes Employee-only data leakage and includes all employees.

**Definition of Done:** Attendance data is being recorded and is queryable per-employee and per-day — ready to be consumed by Time Off (Phase 7) and Payroll (Phase 8).

---

## Phase 7 — Time Off Service (Backend + Frontend)

**Objective:** Implement leave requests, own/all scoping, approval workflow, and allocation management.

**Features / Tasks:**
- [ ] Backend: `POST /api/timeoff` — create a request (type, start/end date, allocation days, optional attachment upload)
- [ ] Backend: `GET /api/timeoff/me` — own requests only
- [ ] Backend: `GET /api/timeoff` — Admin/HR only, all requests
- [ ] Backend: `PATCH /api/timeoff/:id/approve`, `PATCH /api/timeoff/:id/reject`
- [ ] Backend: `GET/PUT /api/timeoff/allocations` — Admin/HR manages per-employee, per-type balances
- [ ] Backend: on approval, trigger downstream effects — mark relevant date range as leave for Attendance/payable-days purposes (feeds Phase 8) and update the card status source (feeds Phase 9)
- [ ] Backend: file upload handling for sick-leave attachments (validate type/size)
- [ ] Frontend: Time Off Module — Leave Balance Cards (Paid Time Off, Sick Time Off), request list/table (Name, Start, End, Type, Status)
- [ ] Frontend: Time Off Type Request form/modal (Employee selector for Admin, Type, Validity Period, Allocation, Attachment, Submit/Discard)
- [ ] Frontend: Employee view (own requests + create) vs. Admin/HR view (all requests + Approve/Reject) + Allocation management tab
- [ ] Add "Time Off" nav link (built in Phase 3) to route here

**Dependencies:** Phase 6 (Attendance must exist so approved leave can feed payable-days calculation), Phase 2/3 (auth/roles).

**Expected Deliverables:** Fully functional Time Off module: request → pending → approve/reject, own/all scoping, allocations.

**Validation:** An Employee sees only their own requests; Admin sees all and can approve/reject; approving a request is reflected in that employee's payable-days input (verified against Phase 6 data) and (once Phase 9 lands) the card icon.

**Definition of Done:** Time Off workflow is complete and its approval effects are persisted in a form Payroll (Phase 8) and Notification/Status (Phase 9) can consume.

---

## Phase 8 — Payroll / Salary Service (Backend + Salary Info Tab)

**Objective:** Implement salary component computation and expose the Admin-only Salary Info tab, consuming Attendance + Time Off as payable-days inputs.

**Features / Tasks:**
- [ ] Backend: `GET /api/employees/:id/salary`, `PUT /api/employees/:id/salary` — Admin/HR only
- [ ] Backend: payable-days calculation — attendance days minus unpaid/missing days, adjusted by approved Time Off (per source business rules §8)
- [ ] Backend: salary component computation engine implementing the stated formulas — Basic Salary (% of wage), HRA (50% of Basic), Standard Allowance (fixed), Performance Bonus (% of Basic), Leave Travel Allowance (% of Basic), Fixed Allowance (remainder)
- [ ] Backend: Professional Tax (from Gross) and Provident Fund (on Basic, employee + employer contribution) deduction calculation
- [ ] Backend: monthly/yearly wage display values (₹/month, optional hourly rate)
- [ ] Frontend: Salary Info tab in Profile Module (Phase 5's Profile shell), rendered only for Admin/HR sessions — Wage Type, Working Schedule, computed components table, tax/PF section, month/year wage display
- [ ] Unit tests validating each formula against the example values in `PRD.md` (e.g., 50% wage → 25000 Basic; HRA 12500; etc.)

**Dependencies:** Phase 5 (Profile shell/tabs), Phase 6 (Attendance/payable days), Phase 7 (approved Time Off affecting payable days).

**Expected Deliverables:** Working Salary Info tab with live computed components; payable-days pipeline fully connected from Attendance + Time Off into Payroll.

**Validation:** Changing the wage recalculates all dependent components correctly; an Employee-role request to the salary endpoints is rejected (403); payable days reflect a mix of present days, unpaid leave, and approved paid leave correctly in a test scenario.

**Definition of Done:** The full control-flow chain described in the source (Attendance + Time Off → Payable Days → Salary Components + PF + Tax → Payslip figures) is implemented and testable end to end.

---

## Phase 9 — Notification / Status Service (Real-Time Card Indicators)

**Objective:** Replace the stubbed status used in Phase 4 with real, live-updating status derived from Attendance and Time Off, closing the loop described in the source's interconnection diagram.

**Features / Tasks:**
- [ ] Backend: status-resolution logic per employee — 🟢 if checked in today (Attendance), ✈️ if on approved leave today (Time Off), 🟡 otherwise (absent, no time-off applied)
- [ ] Backend: expose this via the `GET /api/employees` list endpoint (enriched) and/or a dedicated `GET /api/status/:employeeId`
- [ ] Frontend: Employees Dashboard cards consume real status instead of the Phase 4 stub
- [ ] Frontend: systray status indicator (red/green) and timer stay in sync with backend Attendance state on page load/refresh
- [ ] (Optional, if within scope) Lightweight polling or WebSocket/SSE push so card status updates without a full page reload when another user checks in or a leave is approved

**Dependencies:** Phase 6 (Attendance data), Phase 7 (Time Off approval data), Phase 4 (card grid to update).

**Expected Deliverables:** Employees Dashboard showing accurate, live status icons reflecting real Attendance and Time Off state.

**Validation:** Checking in changes that employee's card from 🟡/other to 🟢 without a manual data fix; an approved leave for today shows ✈️ on the correct card.

**Definition of Done:** All interconnections described in the source's §6 diagram are implemented and observable in the running app.

---

## Phase 10 — Cross-Module Integration Testing & Hardening

**Objective:** Validate the system end to end against the full control flow and close gaps in security, validation, and error handling.

**Features / Tasks:**
- [ ] End-to-end test: Admin creates employee → employee logs in → checks in → requests leave → Admin approves → payable days and Salary Info reflect it → dashboard card shows correct status
- [ ] Security review: re-verify every Admin-only endpoint rejects Employee-role tokens (Salary, employee creation, all-Attendance, all-Time Off, Approve/Reject, Allocations)
- [ ] Validation review: required fields, date-range validity on Time Off, file type/size on uploads, IFSC/PAN format checks (if enforced)
- [ ] Error handling review: consistent error response shape and status codes across all endpoints; Axios error handling present on every frontend call
- [ ] Performance pass on the Employees dashboard query (avoid N+1 status lookups per card, per `Rules.md`)
- [ ] Accessibility/basic UX pass on forms and tables (labels, keyboard navigation) — best-effort, since not specified in the source

**Dependencies:** Phases 1–9 complete.

**Expected Deliverables:** Passing end-to-end test suite; documented list of any remaining known gaps.

**Validation:** All automated tests pass; manual walkthrough of the full user journey (Admin + Employee) succeeds without errors.

**Definition of Done:** The system behaves correctly and securely across every module and role for the full documented feature set.

---

## Phase 11 — Deployment

**Objective:** Ship the application (deployment specifics are not given in the source; this phase is proposed).

**Features / Tasks:**
- [ ] Containerize `frontend`, `backend` (Dockerfiles); provision/point to a managed or containerized MySQL instance
- [ ] Apply the MySQL Workbench-exported schema (via Sequelize migrations) to the target environment
- [ ] Configure environment variables/secrets (DB credentials, JWT secret, file storage config) for the target environment
- [ ] Set up CI (lint, test, build) and CD (deploy on merge to main, or manual trigger)
- [ ] Smoke-test the deployed environment against the Phase 10 end-to-end scenario

**Dependencies:** Phase 10 (system validated).

**Expected Deliverables:** Deployed, reachable frontend and backend, connected to a production/staging MySQL database.

**Validation:** Smoke test passes in the deployed environment; no dev-only configuration (e.g., permissive CORS, debug logging of secrets) is present.

**Definition of Done:** HRMS is live and usable end to end in the target environment.
