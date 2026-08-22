CREATE DATABASE IF NOT EXISTS `dayflow-odoo`;
USE `dayflow-odoo`;

CREATE TABLE `employees` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `login_id` VARCHAR(50) NOT NULL UNIQUE,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `personal_email` VARCHAR(150),
  `mobile` VARCHAR(20),
  `company` VARCHAR(100),
  `department` VARCHAR(100),
  `manager` VARCHAR(100),
  `location` VARCHAR(100),
  `role` ENUM('admin', 'employee') NOT NULL DEFAULT 'employee',
  `password_hash` VARCHAR(255) NOT NULL,
  `date_of_birth` DATE,
  `gender` VARCHAR(20),
  `nationality` VARCHAR(50),
  `marital_status` VARCHAR(20),
  `residing_address` TEXT,
  `bank_name` VARCHAR(100),
  `account_number` VARCHAR(50),
  `ifsc_code` VARCHAR(20),
  `pan_no` VARCHAR(20),
  `uan_no` VARCHAR(20),
  `date_of_joining` DATE,
  `job_position` VARCHAR(100),
  `emp_code` VARCHAR(50),
  `about` TEXT,
  `job_love_text` TEXT,
  `hobbies_text` TEXT,
  `profile_picture_url` VARCHAR(255),
  `company_logo_url` VARCHAR(255),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `skills` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `employee_id` INT NOT NULL,
  `skill_name` VARCHAR(100) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE
);

CREATE TABLE `certifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `employee_id` INT NOT NULL,
  `certification_name` VARCHAR(150) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE
);

CREATE TABLE `salary_profiles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `employee_id` INT NOT NULL UNIQUE,
  `wage_type` VARCHAR(50) NOT NULL,
  `wage_amount` DECIMAL(12, 2) NOT NULL,
  `working_days_per_week` INT NOT NULL,
  `basic_salary` DECIMAL(12, 2),
  `hra` DECIMAL(12, 2),
  `standard_allowance` DECIMAL(12, 2),
  `performance_bonus` DECIMAL(12, 2),
  `leave_travel_allowance` DECIMAL(12, 2),
  `fixed_allowance` DECIMAL(12, 2),
  `professional_tax` DECIMAL(12, 2),
  `pf_employee_contribution` DECIMAL(12, 2),
  `pf_employer_contribution` DECIMAL(12, 2),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE
);

CREATE TABLE `attendance_records` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `employee_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `check_in_time` DATETIME,
  `check_out_time` DATETIME,
  `work_hours` DECIMAL(5, 2),
  `extra_hours` DECIMAL(5, 2),
  `break_time` DECIMAL(5, 2),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `idx_emp_date` (`employee_id`, `date`)
);

CREATE TABLE `time_off_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `employee_id` INT NOT NULL,
  `type` ENUM('Paid Time Off', 'Sick Leave', 'Unpaid Leaves') NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `allocation_days` DECIMAL(5, 2) NOT NULL,
  `attachment_url` VARCHAR(255),
  `status` ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE
);

CREATE TABLE `leave_allocations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `employee_id` INT NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `allocated_days` DECIMAL(5, 2) NOT NULL,
  `remaining_days` DECIMAL(5, 2) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`employee_id`) REFERENCES `employees`(`id`) ON DELETE CASCADE
);
