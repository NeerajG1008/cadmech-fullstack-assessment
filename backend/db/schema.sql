-- ================================================
-- SmartLab Equipment Manager — Database Schema
-- CADMech Full Stack Assessment
-- ================================================
-- Choose one of the following based on your database:
--   - MySQL
--   - PostgreSQL
--   - SQLite
--
-- All three syntaxes are provided below.
-- Use ONLY the section for your chosen database.
-- ================================================


-- ────────────────────────────────────────────────
-- OPTION 1: SQLite
-- ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS equipment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN (
        'CNC Machine',
        'IoT Sensor',
        'Automation Trainer',
        'PLC Module',
        'Hydraulic System',
        'Pneumatic System',
        'Electrical Panel'
    )),
    status TEXT NOT NULL DEFAULT 'Active' CHECK(status IN (
        'Active',
        'Under Maintenance',
        'Decommissioned'
    )),
    location TEXT,
    serial_number TEXT UNIQUE,
    description TEXT,
    installed_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sample seed data (optional — helps during development)
INSERT INTO equipment (name, type, status, location, serial_number, description, installed_date) VALUES
    ('CNC Lathe Trainer V2', 'CNC Machine', 'Active', 'Lab 3 - Building A', 'CNC-2024-0042', 'CNC lathe training unit for undergraduate lab sessions', '2024-01-15'),
    ('Temperature Sensor Array', 'IoT Sensor', 'Active', 'Lab 1 - Building B', 'IOT-2024-0105', 'Industrial temperature monitoring sensor cluster', '2024-03-20'),
    ('PLC Training Module S7-1200', 'PLC Module', 'Under Maintenance', 'Lab 5 - Building A', 'PLC-2023-0033', 'Siemens S7-1200 based PLC trainer for automation practicals', '2023-08-10'),
    ('Hydraulic Press Simulator', 'Hydraulic System', 'Active', 'Lab 2 - Building C', 'HYD-2024-0018', 'Hydraulic press simulation unit for fluid power training', '2024-02-28'),
    ('Pneumatic Circuit Trainer', 'Pneumatic System', 'Decommissioned', 'Storage - Building D', 'PNE-2021-0007', 'Legacy pneumatic circuit training board — replaced by V3', '2021-06-15'),
    ('CNC Milling Trainer V3', 'CNC Machine', 'Active', 'Lab 3 - Building A', 'CNC-2024-0089', '3-axis CNC milling trainer with tool changer simulation', '2024-05-01'),
    ('Vibration Sensor Kit', 'IoT Sensor', 'Active', 'Lab 1 - Building B', 'IOT-2024-0112', 'Industrial vibration monitoring for predictive maintenance training', '2024-04-10'),
    ('Motor Control Panel', 'Electrical Panel', 'Under Maintenance', 'Lab 4 - Building A', 'ELP-2023-0021', 'AC/DC motor control and protection panel for electrical labs', '2023-11-22'),
    ('Automation Line Simulator', 'Automation Trainer', 'Active', 'Lab 6 - Building B', 'AUT-2024-0056', 'Miniature production line simulator with conveyor and sorting', '2024-06-15'),
    ('Electrical Wiring Trainer', 'Electrical Panel', 'Active', 'Lab 4 - Building A', 'ELP-2024-0035', 'Industrial wiring and protection device training panel', '2024-07-01');


-- ────────────────────────────────────────────────
-- OPTION 2: MySQL
-- ────────────────────────────────────────────────

/*
CREATE DATABASE IF NOT EXISTS cadmech_equipment;
USE cadmech_equipment;

CREATE TABLE IF NOT EXISTS equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM(
        'CNC Machine',
        'IoT Sensor',
        'Automation Trainer',
        'PLC Module',
        'Hydraulic System',
        'Pneumatic System',
        'Electrical Panel'
    ) NOT NULL,
    status ENUM('Active', 'Under Maintenance', 'Decommissioned') NOT NULL DEFAULT 'Active',
    location VARCHAR(255),
    serial_number VARCHAR(100) UNIQUE,
    description TEXT,
    installed_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/


-- ────────────────────────────────────────────────
-- OPTION 3: PostgreSQL
-- ────────────────────────────────────────────────

/*
CREATE TYPE equipment_type AS ENUM (
    'CNC Machine',
    'IoT Sensor',
    'Automation Trainer',
    'PLC Module',
    'Hydraulic System',
    'Pneumatic System',
    'Electrical Panel'
);

CREATE TYPE equipment_status AS ENUM (
    'Active',
    'Under Maintenance',
    'Decommissioned'
);

CREATE TABLE IF NOT EXISTS equipment (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type equipment_type NOT NULL,
    status equipment_status NOT NULL DEFAULT 'Active',
    location VARCHAR(255),
    serial_number VARCHAR(100) UNIQUE,
    description TEXT,
    installed_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
*/
