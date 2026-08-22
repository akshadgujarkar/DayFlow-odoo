# Phases.md — Implementation Roadmap
## Dayflow — Human Resource Management System (HRMS)

Phase order is derived from the dependency chain implied by the two sources: Authentication gates every other module; Employee Profile holds the core data (including Basic Salary, which Payroll depends on) that other modules reference; the Employees List depends on Profile data and (for its status icons) on Attendance/Time-Off; Payroll depends on both Profile (Basic Salary) and Attendance (payable days). Future Enhancements are last because the text explicitly labels them as such (§6).

---

## Phase 0: Clarify Open Contradictions & Gaps
**Objective:** Resolve the blocking ambiguities identified in `PRD.md` before building Authentication or the landing experience, since two later phases depend on the answers.

**Tasks:**
- [ ] Confirm the registration model: employee self-registration (per text §3.1.1) vs. Admin/HR-provisioned accounts with auto-generated Login ID/password (per diagram annotation) — or both, for different scenarios.
- [ ] Confirm whether a separate "Dashboard" screen (per text §3.2) is required, or whether the Employees list page (per diagram) is the intended single landing page.
- [ ] Confirm whether the salary calculation percentages/amounts shown in the diagram (Basic 50%, HRA 50% of Basic, PF 12%/12%, Professional Tax ₹200, etc.) are fixed system defaults or Admin-configurable rates.
- [ ] Confirm technology stack (frontend, backend, database, hosting) — none specified in sources.
- [ ] Confirm password policy and email-verification requirements referenced in text §3.1.1 but not detailed.

**Dependencies:** None — this phase precedes all implementation.
**Expected Deliverables:** A written decision for each open item above, appended to the relevant doc(s).
**Validation:** All items above have a documented, stakeholder-confirmed answer.
**Definition of Done:** No `TBD`/contradiction remains that would block Phase 1 implementation choices.

---

## Phase 1: Authentication & Authorization Foundation
**Objective:** Establish account creation, login, and role-based access, since every other module is gated by role.

**Tasks:**
- [ ] Implement Sign Up flow per the confirmed model from Phase 0.
- [ ] Implement Sign In flow (Login ID/Email + Password) with visible error messaging on invalid credentials.
- [ ] Implement Login ID auto-generation (if confirmed): `[Company Prefix][first 2 letters of first name][first 2 letters of last name][Year of Joining][Serial Number]`.
- [ ] Implement first-time auto-generated password + forced/optional password change flow (if confirmed).
- [ ] Implement role assignment and role-based session/authorization (Admin/HR Officer vs. Employee).

**Dependencies:** Phase 0 decisions on registration model and password policy.
**Expected Deliverables:** Working Sign Up/Sign In with role-based sessions.
**Validation:** A user can register/be provisioned, log in, and is denied on invalid credentials with an error shown; role is correctly attached to the session.
**Definition of Done:** Both roles can authenticate and are routed with the correct permission level for all subsequent phases to build on.

---

## Phase 2: Employee Profile Management
**Objective:** Build the core employee data model and profile UI, since Payroll (Basic Salary), the Employees List (card info), Attendance, and Time Off all reference employee identity/profile data.

**Tasks:**
- [ ] Implement profile header fields (Name, Job Position, Email, Mobile, Company, Department, Manager, Location, Login ID).
- [ ] Implement Private Info tab (DOB, Address, Nationality, Personal Email, Gender, Marital Status, Bank Details, PAN No, UAN No, Emp Code, Date of Joining).
- [ ] Implement Resume, Settings/Security, and free-text bio sections (About, "What I love about my job," interests, Skills, Certifications).
- [ ] Implement edit permissions: Employee can edit address/phone/photo on their own profile; Admin can edit all fields on any profile.
- [ ] Implement read-only profile view for a non-owner viewing another employee's profile.
- [ ] Gate the Salary Info tab so only Admin/HR can see it (tab itself is built in Phase 5, but the visibility rule/permission hook belongs here).

**Dependencies:** Phase 1 (roles/sessions).
**Expected Deliverables:** Full profile view/edit for both roles, correctly scoped.
**Validation:** Field-level edit permissions match `Rules.md`; view-only mode confirmed for non-owner viewers.
**Definition of Done:** Employee and Admin profile experiences match `PRD.md` Feature 3 and `Design.md` profile layout.

---

## Phase 3: Employees List (Landing Page)
**Objective:** Build the searchable employee directory that (per the diagram) is the post-login landing page.

**Tasks:**
- [ ] Implement top navigation bar (Company Logo, Employees, Attendance, Time Off) present on all authenticated screens.
- [ ] Implement profile avatar dropdown (My Profile, Log Out).
- [ ] Implement searchable grid of employee cards (photo + basic info).
- [ ] Implement per-card status indicator (present/on-leave/absent) — note this has a placeholder dependency on Attendance/Time-Off data (Phase 4/5); build the UI now, wire the live data once those phases land.
- [ ] Implement click-through from a card to the target employee's profile in read-only mode.

**Dependencies:** Phase 1 (auth/roles), Phase 2 (profile data to display and link to).
**Expected Deliverables:** Functional landing page matching the diagram's Employees screen.
**Validation:** Search filters correctly; card click opens the correct profile in read-only mode; status icons render (even if using placeholder data until Phase 4/5).
**Definition of Done:** Matches the diagram's Employees list wireframe and the resolved Phase 0 decision on landing page.

---

## Phase 4: Attendance Management
**Objective:** Implement check-in/out and attendance viewing, since Payroll depends on this data.

**Tasks:**
- [ ] Implement Check In / Check Out control with status-dot behavior (red → green on successful check-in).
- [ ] Implement Employee's own day-wise attendance table (Date, Check In, Check Out, Work Hours, Extra Hours), defaulting to the current month, with date/month navigation.
- [ ] Implement Admin/HR view of all employees' attendance for the current day, plus summary widgets (days present, leaves count, total working days) for a selectable month.
- [ ] Wire the Employees List status indicator (Phase 3) to live attendance/leave data.
- [ ] Expose attendance data (including unpaid leave / missing days) in a form Payroll (Phase 6) can consume for payable-days calculation.

**Dependencies:** Phase 1 (auth/roles), Phase 2 (employee identity).
**Expected Deliverables:** Working attendance capture and viewing for both roles.
**Validation:** Employee sees only their own records; Admin sees all employees' current-day records and monthly summaries; check-in/out updates status immediately.
**Definition of Done:** Matches `PRD.md` Feature 4 and the diagram's Attendance screens (both employee and admin views).

---

## Phase 5: Leave & Time-Off Management
**Objective:** Implement leave balances, requests, and approvals.

**Tasks:**
- [ ] Implement leave balance summary cards by type (e.g., Paid Time Off, Sick Time Off) showing days available.
- [ ] Implement the "New" leave request form (Time off Type, Validity Period, Allocation, optional Attachment for sick leave).
- [ ] Implement Employee's own request list/status (Pending/Approved/Rejected).
- [ ] Implement Admin/HR list/table of all requests (Name, Start/End Date, Type, Status) with search.
- [ ] Implement Approve/Reject actions (with optional comment, per text) that update the requester's record immediately.
- [ ] Wire the Employees List status indicator (Phase 3) to reflect "on leave" state from approved time-off.

**Dependencies:** Phase 1 (auth/roles), Phase 2 (employee identity).
**Expected Deliverables:** Full leave request and approval workflow for both roles.
**Validation:** Employee sees only their own requests; Admin sees and can act on all requests; status changes propagate immediately.
**Definition of Done:** Matches `PRD.md` Feature 5 and the diagram's Time Off screens (both employee and admin views).

---

## Phase 6: Payroll / Salary Management
**Objective:** Implement the Admin-only Salary Info tab and read-only Employee payroll view, since this depends on Basic Salary (Phase 2 data) and payable-days data (Phase 4).

**Tasks:**
- [ ] Implement Wage input (Month/Yearly) plus working-days/week and break-time fields on the Admin-only Salary Info tab.
- [ ] Implement automatic calculation of Basic Salary, HRA, Standard Allowance, Performance Bonus, LTA, and Fixed Allowance from Wage, per the rates confirmed in Phase 0.
- [ ] Implement automatic calculation of PF (Employer/Employee %) and Professional Tax.
- [ ] Enforce that the total of all components never exceeds the defined Wage.
- [ ] Implement recalculation of payable days using Attendance data (Phase 4) for payslip purposes.
- [ ] Implement the Employee's read-only payroll view.
- [ ] Enforce Admin-only visibility/edit on the Salary Info tab at both UI and access-control layers.

**Dependencies:** Phase 2 (profile/Basic Salary field), Phase 4 (attendance-driven payable days), Phase 0 (confirmed rates).
**Expected Deliverables:** Fully functioning Admin salary configuration and Employee read-only payroll view.
**Validation:** Changing Wage recalculates all components/deductions correctly; totals never exceed Wage; non-Admin users cannot access the tab.
**Definition of Done:** Matches `PRD.md` Feature 6 and the diagram's Salary Info screen and worked examples.

---

## Phase 7: Future Enhancements (Explicitly Out of Current Scope)
**Objective:** Items explicitly labeled "Future Enhancements" in the text (§6) — not to be started until all prior phases are complete and re-prioritized by stakeholders.

**Tasks:**
- [ ] Email & notification alerts.
- [ ] Analytics & reports dashboard (e.g., salary slips, attendance reports).

**Dependencies:** All prior phases (this phase reports on/notifies about data those phases produce).
**Expected Deliverables:** Not specified — scope to be defined when this phase is prioritized.
**Validation:** Not specified.
**Definition of Done:** Not specified — needs its own requirements pass before implementation.
