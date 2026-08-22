# Rules.md — AI Development Rules

**Project:** Human Resource Management System (HRMS)
These rules are derived from the project description (`HRMS_Architecture.md`) and the stack decisions recorded in `Architecture.md` (React / Node.js + Express / MySQL via MySQL Workbench / Axios / JWT). They are guardrails for any AI agent (or human) implementing or extending this project.

---

## General Rules
1. Follow `PRD.md`, `Architecture.md`, `Rules.md`, `Phases.md`, and `Design.md` as the source of truth for this project. Do not reinterpret the original Excalidraw-derived description from memory once these docs exist — update the docs instead if the description changes.
2. Do not implement any feature, screen, or field not listed in `PRD.md`'s Core Features or `Architecture.md`'s System Components, unless the person explicitly requests an extension.
3. Where the source material says `Not specified` or `TBD`, do not silently invent behavior — implement the simplest behavior consistent with the stated business rules, and flag the assumption in code comments and the PR/commit description.
4. Preserve source terminology exactly: "Employees" (not "Staff"), "Time Off" (not "Leave Management"), "My Profile", "Salary Info", "Login ID", "Systray". Do not rename these in code-facing strings, routes, or UI copy without noting the substitution.

## Technology Rules
5. Frontend: React only. Use React Router for navigation between Sign In, Employees Dashboard, Profile, Attendance, Time Off. Do not introduce a second frontend framework.
6. All frontend → backend calls go through Axios, via a single shared client (`src/api/axiosClient.js`) with the base URL and auth header configured in one place. Do not scatter raw `fetch` calls across components.
7. Backend: Node.js + Express. Database: MySQL, with schema authored/maintained in MySQL Workbench and exported as the source-of-truth DDL; Sequelize (or an agreed equivalent ORM) maps to that schema. Do not switch database engines or ORMs without updating `Architecture.md` first.
8. Any new dependency (frontend or backend) must have a clear purpose tied to a feature in `PRD.md`. Avoid adding UI kits, state libraries, or backend frameworks beyond what's listed in `Architecture.md`'s Technology Stack unless justified in a docs update.

## Code Organization Rules
9. Follow the folder structure proposed in `Architecture.md` (`frontend/src/modules/{auth,layout,employees,profile,attendance,timeoff}`, `backend/src/services/{authService,employeeService,attendanceService,timeOffService,payrollService,notificationService}`). Keep one module/service per HRMS domain area — do not merge Attendance and Time Off logic into one file/service, since the source treats them as distinct panels with distinct permissions.
10. Keep Axios API call functions grouped per module (`employeeApi.js`, `attendanceApi.js`, etc.), mirroring the backend service boundaries.
11. Keep role-gating logic (what an Employee vs. Admin/HR can see or do) in a single, reusable place per layer — a `roleGuard` middleware on the backend, and a shared `RoleContext`/route-guard on the frontend — rather than duplicating `if (role === 'admin')` checks ad hoc throughout components/controllers.

## Architecture Rules
12. Do not change the six-service backend split (Auth & User, Employee, Attendance, Time Off, Payroll/Salary, Notification/Status) without updating `Architecture.md` and documenting the reasoning, since this split is taken directly from the source's own "Suggested Technical Architecture."
13. Attendance remains the system of record for payable days. Any change to payroll calculation must continue to derive payable days from Attendance + approved/unpaid Time Off — do not hardcode or bypass this pipeline.
14. Do not add new external integrations (payment gateways, SSO providers, etc.) that are not in `Architecture.md`'s External Integrations section without first updating that document, since the source names none.

## UI/UX Rules
15. Follow `Design.md` for all visual/styling decisions. Do not introduce a new color palette, typography system, or layout pattern that isn't documented there.
16. Employee cards must always be clickable and must always show a status indicator (present/on leave/absent) as described in the source — do not ship a card view without this.
17. The Salary Info tab must never render, even in the DOM, for a non-admin session — this is a UI rule in addition to the backend authorization rule below.

## Error Handling Rules
18. Every Axios call must handle both the success and error path; do not leave unhandled promise rejections. Surface backend validation errors (e.g., invalid date range on a Time Off request) to the user in the relevant form, not as a generic error.
19. Backend endpoints must return consistent error shapes (e.g., `{ error: { code, message } }`) and correct HTTP status codes (400 validation, 401 unauthenticated, 403 unauthorized, 404 not found, 500 server error).

## Security Rules
20. All role/permission checks described in the source's Access Matrix (§2) must be enforced **server-side**, not only hidden in the UI. Frontend hiding of the Salary Info tab, the all-employee Attendance/Time Off views, and Approve/Reject controls is a UX convenience, not a security boundary.
21. Passwords (including system-generated first-time passwords) must be hashed before storage; never log or return plaintext passwords in API responses beyond the one-time creation response to Admin.
22. Login IDs must follow the stated generation format exactly (`[OI][First2FirstName][First2LastName][YearOfJoining][4-digit serial]`); do not alter this format without a documented reason.
23. File uploads (company logo, sick-leave attachment) must be validated for type/size before storage.

## Testing Rules
24. Every backend service must have tests for its role-based authorization paths (e.g., an Employee-role request to a Salary Info or all-employee-Attendance endpoint must be rejected).
25. Payroll calculation logic (Basic/HRA/Standard Allowance/Performance Bonus/Leave Travel Allowance/Fixed Allowance/PF/Professional Tax) must have unit tests validating the formulas stated in `PRD.md`.
26. Attendance-to-payable-days logic must have tests covering: full attendance, unpaid leave days, missing/absent days, and approved paid leave.

## Performance Rules
27. The Employees dashboard (card grid with live status) is the most frequently loaded screen (post-login landing page) — avoid N+1 queries when fetching status per card; prefer a single aggregated query/endpoint.
28. `Not specified` beyond the above — no other performance targets are given in the source; do not invent specific latency/throughput SLAs.

## Dependency Rules
29. Pin major versions of React, Express, Sequelize, and MySQL driver in `package.json`; avoid unpinned "latest" ranges for these core dependencies.
30. Keep the MySQL Workbench-exported schema file under version control (`database/hrms_schema.mwb` + exported `.sql`) so schema changes are traceable and Sequelize migrations stay in sync with it.

## AI Behavior Rules
31. Always consult `PRD.md`, `Architecture.md`, `Rules.md`, `Phases.md`, and `Design.md` before implementing a new piece of functionality.
32. Do not modify the documented architecture (service boundaries, data model, role model) without explicit justification recorded in `Architecture.md`'s "Architectural Decisions" table.
33. Do not create speculative functionality beyond what's in `PRD.md`'s Core Features / Functional Requirements — if a feature seems useful but isn't sourced, propose it rather than silently building it.
34. When the project description or diagram is genuinely ambiguous (e.g., the Sign-Up form's company-level fields vs. "employees cannot self-register," or whether the first-time password change is forced or optional), ask for clarification rather than guessing; where you must proceed, pick the narrower/safer interpretation and note the assumption.
35. Keep changes focused: a change to one module (e.g., Time Off) should not require unrelated edits to another module (e.g., Salary Info) unless the dependency is one already documented in `Architecture.md`'s data/application flow.
