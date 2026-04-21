import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { tools, platforms } from "./tools";
import { serviceContracts } from "./coverage";

export const pmTemplates = sqliteTable("pm_templates", {
  id: text("id").primaryKey(),
  platformId: text("platform_id").references(() => platforms.id),
  name: text("name").notNull(),
  description: text("description"),
  intervalDays: integer("interval_days"),
  intervalHours: integer("interval_hours"),
  estimatedDuration: integer("estimated_duration"),
  checklistTemplateId: text("checklist_template_id"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const pmSchedules = sqliteTable("pm_schedules", {
  id: text("id").primaryKey(),
  toolId: text("tool_id").notNull().references(() => tools.id),
  templateId: text("template_id").references(() => pmTemplates.id),
  contractId: text("contract_id").references(() => serviceContracts.id),
  name: text("name").notNull(),
  intervalDays: integer("interval_days"),
  lastCompletedDate: text("last_completed_date"),
  nextDueDate: text("next_due_date"),
  status: text("status", { 
    enum: ["active", "paused", "completed", "cancelled"] 
  }).notNull().default("active"),
  notes: text("notes"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const pmCompletions = sqliteTable("pm_completions", {
  id: text("id").primaryKey(),
  scheduleId: text("schedule_id").notNull().references(() => pmSchedules.id),
  jobId: text("job_id"),
  completedDate: text("completed_date").notNull(),
  completedBy: text("completed_by"),
  notes: text("notes"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});
