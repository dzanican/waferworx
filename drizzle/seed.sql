-- WaferWorx Demo Data Seed
-- Run with: wrangler d1 execute waferworx-db --file=./drizzle/seed.sql

-- Clear existing data
DELETE FROM daily_updates;
DELETE FROM job_parts;
DELETE FROM jobs;
DELETE FROM tools;
DELETE FROM service_contracts;
DELETE FROM sites;
DELETE FROM contacts;
DELETE FROM customers;
DELETE FROM users;
DELETE FROM platforms;
DELETE FROM job_statuses;

-- Job Statuses
INSERT INTO job_statuses (id, name, color, sort_order) VALUES
  ('status-open', 'Open', 'blue', 1),
  ('status-in-progress', 'In Progress', 'yellow', 2),
  ('status-on-hold', 'On Hold', 'red', 3),
  ('status-completed', 'Completed', 'green', 4),
  ('status-closed', 'Closed', 'gray', 5);

-- Platforms
INSERT INTO platforms (id, name, model_prefix, description) VALUES
  ('platform-cvd', 'CVD-3000', 'CVD3K', 'Chemical Vapor Deposition System'),
  ('platform-etch', 'ETCH-2000', 'ETCH', 'Plasma Etch System'),
  ('platform-pvd', 'PVD-1500', 'PVD', 'Physical Vapor Deposition System');

-- Users
INSERT INTO users (id, username, password_hash, role, first_name, last_name, email, phone, is_active, created_at) VALUES
  ('user-mgmt', 'Management', '$2a$10$demo.hash.management', 'management', 'Admin', 'Manager', 'admin@waferworx.demo', '555-0100', 1, datetime('now')),
  ('user-tech1', 'FSE', '$2a$10$demo.hash.fse', 'technician', 'John', 'Technician', 'john@waferworx.demo', '555-0101', 1, datetime('now')),
  ('user-tech2', 'tech2', '$2a$10$demo.hash.tech2', 'technician', 'Sarah', 'Engineer', 'sarah@waferworx.demo', '555-0102', 1, datetime('now')),
  ('user-tech3', 'tech3', '$2a$10$demo.hash.tech3', 'technician', 'Mike', 'Smith', 'mike@waferworx.demo', '555-0103', 1, datetime('now')),
  ('user-cust', 'Customer', '$2a$10$demo.hash.customer', 'customer', 'Jane', 'Customer', 'jane@acmesemi.demo', '555-0200', 1, datetime('now'));

-- Customers
INSERT INTO customers (id, name, account_number, industry, created_at) VALUES
  ('cust-acme', 'Acme Semiconductor', 'ACME-001', 'Semiconductor Manufacturing', datetime('now')),
  ('cust-techfab', 'TechFab Inc', 'TFAB-002', 'Semiconductor Manufacturing', datetime('now')),
  ('cust-svc', 'Silicon Valley Chips', 'SVC-003', 'Semiconductor Manufacturing', datetime('now')),
  ('cust-mega', 'MegaChip Corp', 'MEGA-004', 'Semiconductor Manufacturing', datetime('now'));

-- Sites
INSERT INTO sites (id, customer_id, name, address, city, state, country, postal_code, timezone) VALUES
  ('site-acme-fab1', 'cust-acme', 'Fab 1 - Austin', '123 Tech Drive', 'Austin', 'TX', 'USA', '78701', 'America/Chicago'),
  ('site-acme-fab2', 'cust-acme', 'Fab 2 - Austin', '456 Innovation Blvd', 'Austin', 'TX', 'USA', '78702', 'America/Chicago'),
  ('site-techfab-main', 'cust-techfab', 'Main Fab', '789 Silicon Way', 'San Jose', 'CA', 'USA', '95110', 'America/Los_Angeles'),
  ('site-svc-fab2', 'cust-svc', 'Fab 2', '321 Chip Lane', 'Phoenix', 'AZ', 'USA', '85001', 'America/Phoenix'),
  ('site-mega-new', 'cust-mega', 'New Fab', '555 Wafer Road', 'Portland', 'OR', 'USA', '97201', 'America/Los_Angeles');

-- Contacts
INSERT INTO contacts (id, customer_id, site_id, first_name, last_name, email, phone, title, is_primary) VALUES
  ('contact-acme-1', 'cust-acme', 'site-acme-fab1', 'Jane', 'Customer', 'jane@acmesemi.demo', '555-0200', 'Fab Manager', 1),
  ('contact-acme-2', 'cust-acme', 'site-acme-fab1', 'Bob', 'Engineer', 'bob@acmesemi.demo', '555-0201', 'Process Engineer', 0),
  ('contact-techfab-1', 'cust-techfab', 'site-techfab-main', 'Alice', 'Manager', 'alice@techfab.demo', '555-0300', 'Operations Manager', 1),
  ('contact-svc-1', 'cust-svc', 'site-svc-fab2', 'Charlie', 'Director', 'charlie@svc.demo', '555-0400', 'Fab Director', 1);

-- Service Contracts
INSERT INTO service_contracts (id, customer_id, contract_number, start_date, end_date, contract_type, annual_value, status) VALUES
  ('contract-acme', 'cust-acme', 'SC-2024-001', '2024-01-01', '2024-12-31', 'Full Service', 120000, 'active'),
  ('contract-techfab', 'cust-techfab', 'SC-2024-002', '2024-01-01', '2024-12-31', 'PM Only', 45000, 'active'),
  ('contract-svc', 'cust-svc', 'SC-2024-003', '2024-03-01', '2025-02-28', 'Full Service', 60000, 'active');

-- Tools
INSERT INTO tools (id, serial_number, name, platform_id, customer_id, site_id, install_date, warranty_end_date, software_version, status) VALUES
  ('tool-cvd1', 'CVD3K-2024-001', 'CVD Tool 1', 'platform-cvd', 'cust-acme', 'site-acme-fab1', '2024-01-15', '2025-01-15', 'v3.2.1', 'operational'),
  ('tool-cvd2', 'CVD3K-2023-002', 'CVD Tool 2', 'platform-cvd', 'cust-acme', 'site-acme-fab1', '2023-06-01', '2024-06-01', 'v3.1.0', 'operational'),
  ('tool-etch1', 'ETCH-2023-001', 'Etch Tool 1', 'platform-etch', 'cust-techfab', 'site-techfab-main', '2023-03-15', '2024-03-15', 'v4.0.2', 'operational'),
  ('tool-pvd1', 'PVD-2022-001', 'PVD Tool 1', 'platform-pvd', 'cust-svc', 'site-svc-fab2', '2022-09-01', '2023-09-01', 'v2.8.0', 'operational'),
  ('tool-cvd3', 'CVD3K-2024-003', 'CVD Tool 3', 'platform-cvd', 'cust-mega', 'site-mega-new', '2024-02-01', '2025-02-01', 'v3.2.1', 'installation');

-- Jobs
INSERT INTO jobs (id, job_number, title, description, customer_id, site_id, tool_id, technician_id, status_id, priority, entitlement_type, planned_week_year, planned_week_number, planned_start_date, planned_end_date, created_at) VALUES
  ('job-1', 'JOB-2024-0001', 'CVD-3000 Annual PM', 'Annual preventive maintenance for CVD-3000X system', 'cust-acme', 'site-acme-fab1', 'tool-cvd1', 'user-tech1', 'status-in-progress', 'medium', 'contract', 2024, 15, '2024-04-08', '2024-04-12', datetime('now')),
  ('job-2', 'JOB-2024-0002', 'CVD Tool 2 Quarterly PM', 'Quarterly preventive maintenance', 'cust-acme', 'site-acme-fab1', 'tool-cvd2', 'user-tech2', 'status-open', 'medium', 'contract', 2024, 19, '2024-05-06', '2024-05-08', datetime('now')),
  ('job-3', 'JOB-2024-0003', 'Etch Tool PM', 'Semi-annual PM for etch system', 'cust-techfab', 'site-techfab-main', 'tool-etch1', NULL, 'status-open', 'low', 'contract', 2024, 20, '2024-05-13', '2024-05-15', datetime('now')),
  ('job-4', 'JOB-2024-0004', 'RF Generator Replacement', 'Replace failed RF generator', 'cust-acme', 'site-acme-fab1', 'tool-cvd1', 'user-tech2', 'status-completed', 'high', 'warranty', 2024, 11, '2024-03-13', '2024-03-15', datetime('now')),
  ('job-5', 'JOB-2024-0005', 'New Tool Installation', 'Install new CVD-3000X system', 'cust-mega', 'site-mega-new', 'tool-cvd3', 'user-tech3', 'status-completed', 'high', 'billable', 2024, 6, '2024-02-05', '2024-02-09', datetime('now'));

-- Daily Updates
INSERT INTO daily_updates (id, job_id, date, machine_state, work_completed, open_risks, next_steps, hours_worked, is_pass_down, author_id, created_at) VALUES
  ('update-1', 'job-1', '2024-04-08', 'Down for PM', 'Completed safety verification and LOTO. Started chamber 1 inspection.', 'None identified', 'Continue with chamber 1 cleaning tomorrow', 8, 0, 'user-tech1', datetime('now')),
  ('update-2', 'job-1', '2024-04-09', 'Down for PM', 'Completed chamber 1 and 2 PM. Found worn O-rings on chamber 2 load lock.', 'O-rings need replacement', 'Replace O-rings, continue with chambers 3-4', 9, 1, 'user-tech1', datetime('now')),
  ('update-3', 'job-1', '2024-04-10', 'Down for PM', 'Replaced O-rings. Completed chamber 3 PM. Started chamber 4.', 'None', 'Complete chamber 4 and RF system check', 8, 0, 'user-tech1', datetime('now'));

-- Commit
COMMIT;
