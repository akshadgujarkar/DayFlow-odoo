# Design.md — UI/UX Design System

**Project:** Human Resource Management System (HRMS)

> The source (`HRMS_Architecture.md`) describes screen **structure and content** in detail (what fields/cards/tabs exist and where) but does not specify a visual design system (no named colors, typeface, spacing scale, or component library). Per the accuracy rules, this document marks all such items `Not specified` rather than inventing a palette/typography system, and only fills in what can legitimately be read from the described layout and interaction patterns.

---

## Design Philosophy

Not stated explicitly. **Inference** from the described structure: the product favors a **card-based, dashboard-first** layout (Employees as a grid of cards; Time Off balances as cards; a persistent top nav and systray) with **tab-based** organization for dense per-record content (Profile's Resume/Private Info/Skills/Certification/Salary Info tabs). This suggests a clean, functional, data-dense enterprise-tool aesthetic rather than a marketing/consumer aesthetic — but no explicit style direction (e.g., "minimal," "corporate," "playful") is stated, so this remains an inference about layout patterns only, not a committed visual style.

## Brand / Visual Identity

- App/Web Logo appears on Sign-In and Sign-Up pages, and a Company Logo appears in the shared top navigation. **Source: explicitly stated** (logo exists and is positioned there); the actual logo asset, colors, and mark are `Not specified`.
- Company-specific branding: the Sign-Up form includes an "Upload Logo" field, implying the platform is **multi-tenant/company-brandable** — the exact branding mechanism (e.g., does the uploaded logo replace the nav logo per company?) is `Not specified`.

## Color System

`Not specified.` The source only names colors functionally, as status semantics, not as a palette:
- 🟢 Green — Present in office (status dot on employee card; also the "successful check-in" state of the systray indicator)
- 🔴 Red — Default/not-checked-in state of the systray indicator (flips to green on check-in)
- 🟡 Yellow — Absent (no time-off applied)
- ✈️ (icon, not a color) — On leave

**Rule for implementation:** reuse this red/green/yellow status semantic consistently everywhere status is shown (systray, employee cards) since the source uses it in both places; do not invent additional status colors without updating this document. All other UI colors (backgrounds, text, primary/secondary action colors, borders) are `Not specified` — choose a neutral, accessible palette at implementation time and record the final choice here.

## Typography

`Not specified.` No typeface, sizes, or weights are named in the source. Choose an accessible, readable system/web font at implementation time (e.g., a standard sans-serif) and record the final choice here; keep a clear visual hierarchy between the Profile header identity block, tab labels, and body/form text, since the source implies a layered information hierarchy (header → tabs → content blocks) even without specifying fonts.

## Spacing

`Not specified.` No spacing scale or grid system is given. Use a consistent spacing scale (e.g., a 4px/8px base unit system) at implementation time.

## Layout

Layout structure **is** described and should be preserved:
- **Global:** persistent top navigation bar (Company Logo, Employees, Attendance, Time Off links, Avatar dropdown on the right) present on every authenticated page; systray/quick-actions region for Check-In/Check-Out and status, accessible from any page.
- **Employees Dashboard:** header row with search bar + NEW button (Admin/HR), below it a responsive grid of Employee Cards.
- **My Profile / Employee Profile:** a header/identity block at the top (photo + key identity fields), followed by a tabbed content area (Resume, Private Info, Skills, Certification, Salary Info*).
- **Attendance:** a summary-cards row (days present, leaves, working days) above a per-day table/list, with date/month navigation controls (`<-`, month selector, `->`).
- **Time Off:** balance cards row (Paid Time Off, Sick Time Off) above a request table/list; requests open in a modal or dedicated page for the request form.

## Components

Components explicitly implied by the source and their described content:

| Component | Described Fields/Behavior |
|---|---|
| Employee Card | Profile picture, Name, basic info, status indicator (top-right), clickable |
| Top Navigation Bar | Company Logo, Employees, Attendance, Time Off, Avatar (dropdown: My Profile, Log Out) |
| Systray Widget | Check In / Check Out actions, red→green status dot, "Since HH:MM" timer |
| Profile Header | Avatar, Name, Login ID, Email, Mobile, Company, Department, Manager, Location |
| Profile Tabs | Resume, Private Info, Skills, Certification, Salary Info (Admin only) |
| Skills Card | List of skills + "+ Add Skills" action |
| Certification Card | List of certifications + add action |
| Salary Info Panel | Wage Type, Working Schedule, Salary Components table, Tax Deductions section, Month/Year Wage display |
| Attendance Summary Cards | Days present count, Leaves count, Total working days |
| Attendance Table Row | Date, Day, Check In, Check Out, Work Hours, Extra hours, Break Time |
| Time Off Balance Card | Type label (e.g., "Paid Time Off"), days available |
| Time Off Table | Name, Start Date, End Date, Type, Status |
| Time Off Request Form (modal/page) | Employee (pre-filled/selectable), Type, Validity Period, Allocation, Attachment, Submit/Discard |
| Sign-In Form | Login Id/Email, Password, Sign In button, "Sign Up" link |
| Sign-Up Form | Company Name, Name, Email, Phone, Password, Confirm Password, Upload Logo, Sign Up button, "Sign In" link |

Visual styling (borders, shadows, radii) for these components is `Not specified`; implement using standard card/table/tab/modal patterns consistent with the layout above.

## Responsive Design

`Not specified.` The source describes a "web/app-based platform," implying at least web and possibly a mobile app surface, but no responsive breakpoints, mobile-specific layouts, or app-vs-web differences are detailed. Implement the card grid and tables as responsive by default (e.g., grid reflow, horizontally scrollable tables on small screens) as a reasonable default, and record actual breakpoints here once decided.

## Accessibility

`Not specified.` No accessibility requirements are stated. Follow standard accessible practices (sufficient color contrast especially for the red/yellow/green status semantics, keyboard-navigable forms/tabs/modals, labeled form fields) as a baseline, and do not rely on color alone for status (the source already pairs color with distinct icons — 🟢/✈️/🟡 — which naturally supports this; preserve that icon+color pairing rather than color alone).

## Interaction Design

Interactions explicitly described in the source:
- Employee cards are clickable → open profile (view-only or editable depending on role).
- Systray Check-In/Check-Out is a persistent, always-available action from any page; successful check-in visibly flips the status indicator red→green and starts a running timer.
- Time Off request form has explicit Submit/Discard actions (i.e., a cancelable draft state).
- Admin/HR Time Off view offers explicit Approve/Reject actions per request.
- Search filters the Employees dashboard and (for Admin) the Time Off list.

## UX Principles

Not explicitly stated as principles, but consistently implied by the described behavior across panels:
- **Role-appropriate disclosure:** the same underlying screens (e.g., Profile) render differently — view-only vs. editable, Salary tab hidden vs. visible — based on role, rather than using separate screens per role.
- **Always-available core action:** Check-In/Check-Out is accessible from anywhere via the systray, not buried in the Attendance page.
- **Status at a glance:** both the Employees dashboard (per-card icon) and the systray (red/green + timer) surface live status without requiring navigation.

Any UX principle beyond what's directly observable in the above is `Not specified`.
