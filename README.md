# Dayflow HRMS — Human Resource Management System

A full-stack Human Resource Management System built with **React** (frontend) · **Node.js/Express** (backend) · **MySQL** (database) · **Axios** · **JWT**. Dayflow provides a secure, role-based platform for managing employee records, tracking attendance, handling leave requests, and administering payroll.

## 🌟 Core Functionality

### 1. Authentication & Role-Based Access Control (RBAC)
- **Secure Login:** JWT-based authentication using HTTP-only cookies and bcrypt for password hashing.
- **Role Isolation:** Strict separation of privileges between `Admin` and `Employee` roles.
- **Route Guards:** Frontend protected routes and backend middleware ensure authorized access to sensitive endpoints.

### 2. Employee Directory & Profiles
- **Admin Privileges:** Admins can view the full employee directory and access detailed private information (e.g., contact info, emergency contacts, hire date) for any user.
- **Employee Privacy:** Regular employees can only view basic directory information. Navigating to another user's detailed profile is strictly prohibited (Access Denied).
- **Profile Management:** Employees can view and update their own personal and private information.

### 3. Attendance Tracking
- **Real-Time Check-In/Out:** Employees can clock in and clock out daily. 
- **Hours Calculation:** The system automatically computes total hours worked for each session.
- **Attendance Logs:** Admins can view company-wide attendance records, while employees can only see their own history.

### 4. Leave & Time-Off Management
- **Apply for Leave:** Employees can submit time-off requests specifying the leave type (Paid, Sick, Unpaid), start date, end date, and personalized remarks.
- **Admin Review Workflow:** Admins have a dedicated view to monitor all pending requests. They can review the employee's remarks, leave an administrative comment, and strictly Approve or Reject the request.
- **Dynamic Status Updates:** If an employee has an approved leave request for the current day, their dashboard status automatically updates to "Leave". (Otherwise, it defaults to "Present" if they checked in, or "Absent").

### 5. Payroll Management
- **Salary Structure Control:** Admins have full access to view, configure, and update the payroll data (Base Salary, Bonuses, Deductions) for any employee.
- **Read-Only Access for Employees:** Employees have a dedicated "Salary Info" tab on their profile to securely view their own compensation breakdown. This view is strictly read-only for non-admins.

## 📂 Repository Structure

```text
DayFlow-odoo/
├── frontend/     # React + Vite SPA (Tailwind CSS, React Router, Axios)
├── backend/      # Node.js + Express REST API (Sequelize, JWT, bcrypt)
├── database/     # MySQL Workbench schema (.mwb) + exported DDL (.sql)
└── docs/         # Project documentation (PRD, Architecture, Rules, Phases, Design)
```

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- MySQL 8+

### Backend Setup

```bash
cd backend
cp .env.example .env      # Fill in DB credentials and JWT_SECRET
npm install
npm run dev               # Starts on http://localhost:5000
```
*Note: A default admin user can be seeded by running `node seed-admin.js`.*

### Frontend Setup

```bash
cd frontend
cp .env.example .env      # VITE_API_BASE_URL defaults to /api (proxied by Vite)
npm install
npm run dev               # Starts on http://localhost:3000
```

## 📚 Documentation
- [PRD.md](./docs/PRD.md) — Product requirements
- [Architecture.md](./docs/Architecture.md) — Technical architecture & folder structure
- [Rules.md](./docs/Rules.md) — Development rules for AI agents and humans
- [Design.md](./docs/Design.md) — UI/UX design decisions
- [Phases.md](./docs/Phases.md) — Implementation roadmap
