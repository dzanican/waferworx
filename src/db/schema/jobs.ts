import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users, customers, sites } from "./users";
import { tools } from "./tools";

export const jobStatuses = sqliteTable("job_statuses", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
  isTerminal: integer("is_terminal", { mode: "boolean" }).notNull().default(false),
  color: text("color"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const visitPhases = sqliteTable("visit_phases", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const jobs = sqliteTable("jobs", {
  id: text("id").primaryKey(),
  jobNumber: text("job_number").notNull().unique(),
  customerId: text("customer_id").notNull().references(() => customers.id),
  siteId: text("site_id").references(() => sites.id),
  toolId: text("tool_id").references(() => tools.id),
  technicianId: text("technician_id").references(() => users.id),
  statusId: text("status_id").notNull().references(() => jobStatuses.id),
  visitPhaseId: text("visit_phase_id").references(() => visitPhases.id),
  parentJobId: text("parent_job_id"),
  
  title: text("title").notNull(),
  description: text("description"),
  priority: text("priority", { enum: ["low", "medium", "high", "critical"] }).notNull().default("medium"),
  
  entitlementType: text("entitlement_type", { 
    enum: ["warranty", "contract", "billable", "training", "internal", "goodwill"] 
  }).notNull().default("billable"),
  
  plannedWeekYear: integer("planned_week_year"),
  plannedWeekNumber: integer("planned_week_number"),
  plannedStartDate: text("planned_start_date"),
  plannedEndDate: text("planned_end_date"),
  
  actualStartDate: text("actual_start_date"),
  actualEndDate: text("actual_end_date"),
  actualWeeksWorked: integer("actual_weeks_worked"),
  
  holdReason: text("hold_reason"),
  holdDate: text("hold_date"),
  
  isReturnVisit: integer("is_return_visit", { mode: "boolean" }).notNull().default(false),
  returnVisitReason: text("return_visit_reason"),
  
  travelDays: integer("travel_days").default(0),
  
  notes: text("notes"),
  isArchived: integer("is_archived", { mode: "boolean" }).notNull().default(false),
  createdBy: text("created_by").references(() => users.id),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const jobDailyUpdates = sqliteTable("job_daily_updates", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull().references(() => jobs.id),
  authorId: text("author_id").notNull().references(() => users.id),
  updateDate: text("update_date").notNull(),
  machineState: text("machine_state"),
  workCompleted: text("work_completed").notNull(),
  openRisks: text("open_risks"),
  nextSteps: text("next_steps"),
  partsNeeded: text("parts_needed"),
  toolsNeeded: text("tools_needed"),
  hoursWorked: integer("hours_worked"),
  isPassDown: integer("is_pass_down", { mode: "boolean" }).notNull().default(false),
  isCustomerVisible: integer("is_customer_visible", { mode: "boolean" }).notNull().default(false),
  approvalStatus: text("approval_status", { enum: ["draft", "submitted", "approved", "rejected"] }).notNull().default("draft"),
  approvedBy: text("approved_by").references(() => users.id),
  approvedAt: text("approved_at"),
  rejectionReason: text("rejection_reason"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const jobComments = sqliteTable("job_comments", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull().references(() => jobs.id),
  authorId: text("author_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  isInternal: integer("is_internal", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});
