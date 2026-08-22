# Rules.md — AI Development Rules
## Dayflow — Human Resource Management System (HRMS)

These rules govern any AI agent (or human developer) implementing or extending Dayflow. They are derived only from `PRD.md`, `Architecture.md`, and the two original sources (project description + Excalidraw wireframes) — no generic best-practice rules are imported that aren't grounded in what this project's own sources imply.

## General Rules
1. Treat `PRD.md`, `Architecture.md`, `Rules.md`, `Phases.md`, and `Design.md` as the source of truth for this project. If a task isn't covered by them, stop and ask for clarification rather than inventing behavior.
2. Do not resolve the two flagged contradictions (registration flow; presence/absence of a "Dashboard") unilaterally. Surface them to a human stakeholder before building the affected feature, since the two sources genuinely disagree.
3. Anywhere a document says `Not specified` or `TBD`, treat it as an open question requiring stakeholder input — do not silently pick a default (e.g., do not invent a tech stack, a password policy, or a folder structure).

## Technology Rules
4. Do not choose or assume a specific frontend framework, backend framework, database, or hosting provider on the agent's own authority — none is specified in the source material. If a stack must be chosen to make progress, record the choice explicitly as a project decision (not as something derived from the sources) and get it confirmed.
5. Do not assume this project runs on or integrates with Odoo. The "OI"/"Odoo India" reference appears only inside a worked example of the Login ID format; it is not evidence of a required platform dependency.

## Code Organization Rules
6. Since no folder/file structure is specified, propose one only when explicitly asked, and clearly label it as a proposal, not as something derived from the source material.
7. Keep the six identified modules (Authentication, Employees List, Employee Profile, Attendance, Time Off, Payroll/Salary) as distinct logical boundaries, mirroring the screen/tab structure shown in the wireframes, so that Admin-only gating (Salary Info) stays easy to enforce and audit at a module boundary.

## Architecture Rules
8. Do not add system components (services, queues, caches, microservices, etc.) that are not implied by the two sources. If a component is required for the feature to function (e.g., a database), flag the addition explicitly as a necessary implementation detail rather than presenting it as something the sources specified.
9. Preserve the attendance → payroll dependency (attendance/leave data reduces payable days in payslip computation) as a hard dependency between the Attendance and Payroll modules — do not decouple them without stakeholder sign-off, since this is an explicit diagram annotation.
10. Preserve the Time-Off → Employee-record dependency: an Approve/Reject action must be reflected on the requester's record "immediately," per the text.

## UI/UX Rules
11. Preserve the wireframe's global navigation pattern on every authenticated screen: Company Logo (branding) + Employees + Attendance + Time Off, plus a profile avatar dropdown offering "My Profile" and "Log Out."
12. Preserve the Employees list as the post-login landing page (per the diagram annotation), unless a stakeholder confirms the text's separate "Dashboard" concept should override it.
13. Preserve the per-card status indicator convention on the Employees list (present/on-leave/absent icons) exactly as annotated; do not invent additional status states not listed in either source (text lists Present/Absent/Half-day/Leave; diagram lists present/on-leave/absent — reconcile any new status only with stakeholder input, since the two lists don't fully match).
14. Keep Salary Info hidden from non-Admin roles at the UI layer, not just the API layer — this is stated as a visibility rule, not just a data-access rule.
15. Preserve the profile's view-only mode when a user opens another employee's card from the Employees list, as opposed to the fully editable mode a user gets on their own profile (or that Admin gets on any profile).

## Error Handling Rules
16. Display a visible error message on invalid Sign In credentials (explicit text requirement). Do not silently fail or redirect without feedback.
17. Do not invent error-handling behavior beyond what's specified (e.g., no specific retry, timeout, or offline behavior is defined) — implement minimally sensible handling and flag it as an implementation detail, not a sourced requirement.

## Security Rules
18. Enforce role-based access control for every field/section marked Admin-only in the sources (Salary Info tab; all-employee Attendance and Time-Off views; editing other employees' profiles).
19. Treat Bank Details, PAN No, UAN No, and salary figures as sensitive data requiring restricted access (Admin and profile-owner only) even though neither source states an explicit privacy/compliance requirement — this follows directly from the stated field-level Admin-only gating pattern already established for Salary Info.
20. Do not implement or assume a specific password-hashing scheme, token type, or session mechanism without stakeholder confirmation — none is specified.

## Testing Rules
21. No testing requirements, frameworks, or coverage targets are specified in either source — do not assume a testing strategy; ask if one is required before adding test tooling as part of a "faithful to spec" implementation.

## Performance Rules
22. No performance requirements (latency, load, concurrency) are specified — do not optimize against unstated targets or claim compliance with performance NFRs that don't exist in the sources.

## Dependency Rules
23. Do not add third-party libraries/services beyond what's implied (e.g., an email-verification provider is implied by text §3.1.1 but not named) without flagging the addition and its purpose explicitly.

## AI Behavior Rules
24. Follow `PRD.md`, `Architecture.md`, `Rules.md`, `Phases.md`, and `Design.md` as the operating spec for this project.
25. Do not modify the module boundaries or the attendance/payroll/time-off dependencies described in `Architecture.md` without explicit justification tied back to the sources.
26. Do not create speculative functionality beyond what `PRD.md` describes (e.g., do not add notifications, reports, or analytics now — these are explicitly listed as Future/Planned, not current scope).
27. When encountering genuine ambiguity or a source conflict (e.g., the registration-flow and Dashboard contradictions), ask for clarification rather than guessing — do not pick a side silently.
28. Keep changes focused: implement one module/feature at a time per `Phases.md`, and avoid touching unrelated modules in the same change.
