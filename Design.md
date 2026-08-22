# Design.md — UI/UX Design System
## Dayflow — Human Resource Management System (HRMS)

> Source note: Unlike `Architecture.md`, this document benefits directly from the Excalidraw board, since it is a set of UI wireframes. Everything below reflects only what is actually drawn/annotated. Visual details not present in the wireframes (exact colors, fonts, spacing units) are marked `Not specified` rather than invented.

---

## Design Philosophy

Not explicitly stated. **Inference** from the wireframes: a utilitarian, data-dense, form/table-driven enterprise HR tool — card grids for browsing (Employees list), tables for records (Attendance, Time Off list), and tabbed forms for detail data (Profile, Salary Info). No stated design principles (e.g., "minimalist," "accessible-first") appear in either source.

## Brand / Visual Identity

- **Product name:** Dayflow
- **Tagline:** "Every workday, perfectly aligned."
- **Logo placement:** A "Company Logo" placeholder appears at the top-left of the navigation bar on every screen (Sign Up/Sign In screens also show an "App/Web Logo" placeholder). Actual logo artwork is `Not specified` — the wireframes only show placeholder blocks.
- Company Sign-Up allows uploading a custom company logo (diagram: "Upload Logo" field on the Sign Up screen), suggesting per-company branding is a supported concept — **Inference**, not explicitly stated as a "white-label" or "multi-tenant" requirement.

## Color System

No formal color palette (primary/secondary/neutral tokens) is defined in either source. The only colors that appear with a consistent, repeated, functional meaning are:

| Color | Hex (as drawn) | Meaning (as annotated/used) |
|---|---|---|
| Red | `#e03131` | "NEW" badge indicator (e.g., "+ New" button decoration on the Time Off screens) |
| Green | `#099268` (stroke) / `#b2f2bb` (fill) | Check-in success status dot (turns green after a successful check-in) |
| Pink/Rose | `#ffc9c9` | Fill used behind profile-picture placeholder circles — **Inference:** likely just a placeholder avatar background in the mockup, not necessarily an intended brand color; flagged as low-confidence. |

The text description separately mentions a status legend using 🟢 green (present), ✈️ airplane icon (on leave), and 🟡 yellow (absent) for the Employees list cards — **note:** no yellow/green hex values are explicitly present as distinct rectangle/ellipse fills in the wireframe tied to that specific legend (the legend appears as a text annotation, not as colored UI elements in the extracted shapes), so the exact yellow/green shades for that specific indicator are `Not specified` and should not be assumed identical to the check-in green above.

All other UI chrome (backgrounds, borders, text) in the wireframes uses default Excalidraw stroke/fill (`#1e1e1e` stroke, transparent fill) — i.e., wireframe-grey, not a real palette. Do not treat these as final design colors.

## Typography

Not specified. The wireframes use Excalidraw's default handwritten-style font for all text, which is a wireframing artifact, not an intended product typeface. No font family, weight, or type scale is specified anywhere in either source.

## Spacing & Layout

- **Global layout pattern (consistent across every authenticated screen):** A top navigation bar containing, left-to-right: Company Logo, "Employees," "Attendance," "Time Off," with a profile avatar icon at the far right.
- **Employees list:** Search bar near the top; below it, a responsive-looking grid of employee cards (3 columns × 3 rows shown in the mockup — **Inference:** the 3-column grid is illustrative of the mockup's sample data, not a stated fixed column count).
- **Employee Profile:** Left-hand summary sidebar (photo, name, contact/job facts) with a tabbed content area to the right (Resume / Private Info / Salary Info / Settings) plus free-text sections below (About, "What I love about my job," interests, Skills, Certifications).
- **Attendance & Time Off (both Employee and Admin variants):** Header with date/month navigation controls (`<-` / `->`), summary stat widgets, and a table/list below.
- **Time Off request form:** A modal/panel-style form (fields stacked vertically: Employee, Time off Type, Validity Period [From/To date pickers], Allocation, Attachment) with Submit/Discard actions at the bottom.
- Specific spacing units (px/rem), grid systems, or breakpoints are `Not specified`.

## Components (as drawn)

| Component | Where used | Notes |
|---|---|---|
| Top navigation bar | Every authenticated screen | Company Logo, Employees, Attendance, Time Off + profile avatar dropdown |
| Profile avatar dropdown | Top-right, every screen | Options: "My Profile," "Log Out" |
| Search bar | Employees list, Time Off (admin) list | Text input, no advanced filter UI shown |
| Employee card | Employees list | Photo/avatar, basic info, status icon (top-right corner) |
| Status icon/dot | Employee cards; Check-in control | Present (🟢), On Leave (✈️), Absent (🟡) per legend text; separate red→green dot specifically for check-in state |
| Tabs | Employee Profile (Resume / Private Info / Salary Info / Settings) | Salary Info tab conditionally rendered — Admin only |
| Check In / Check Out button | Attendance (employee systray) | Paired with the red/green status dot |
| Data table | Attendance (both views), Time Off (admin list) | Column headers vary per screen — see `PRD.md` Feature 4/5 for exact columns |
| Summary stat widget | Attendance (admin): "Count of days present," "Leaves count," "Total working days"; Time Off (employee): balance cards per leave type | Card-style number + label |
| Date/Month navigator | Attendance (both views) | `<-` / `->` arrows + current period label (e.g., "22, October 2025," "Oct") |
| "New" button | Time Off | Opens the leave-request form |
| Leave request form | Time Off (employee) | Employee, Time off Type (dropdown), Validity Period (date range), Allocation, Attachment, Submit/Discard |
| Approve/Reject buttons | Time Off (admin list) | Per-request actions |
| Salary component row | Salary Info tab | Label, computation type toggle (Fixed/Percentage — implied by "%" and "₹/month" unit labels shown per row), value |
| "+Add Skills" control | Employee Profile | Tag-style input, implied |

## Responsive Design

Not specified. All wireframes are drawn at a single, wide desktop-style canvas size; no mobile or tablet layout variant is present in the file, and no responsive behavior is annotated.

## Accessibility

Not specified. No accessibility annotations (contrast, ARIA labeling, keyboard navigation, screen-reader considerations) appear in either source.

## Interaction Design (as annotated)

- Clicking an employee card on the Employees list opens that employee's profile in **view-only (non-editable)** mode (explicit annotation).
- Clicking the profile avatar opens a dropdown with "My Profile" and "Log Out" (explicit annotation).
- Successful Check In changes the status dot from red to green (explicit annotation).
- Salary component values recalculate automatically when the Wage value changes (explicit annotation); the sum of components is constrained to not exceed the Wage.
- Approve/Reject actions on a leave request reflect on the employee's record "immediately" (text §3.5.2 — no diagram animation/transition is shown, this is a data-consistency statement, not a UI micro-interaction spec).

## UX Principles

Not explicitly stated as principles in either source. Observable patterns worth preserving (Inference, not stated as formal principles):
- Role-based information scoping is a consistent pattern across every module (Employee sees "my own"; Admin/HR sees "everyone's"), applied uniformly to Attendance, Time Off, and Profile.
- Read-only vs. editable states are used deliberately to protect data the viewer shouldn't modify (other employees' profiles; Employee's own Salary Info).
