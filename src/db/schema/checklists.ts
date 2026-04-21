import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { platforms } from "./tools";
import { jobs } from "./jobs";

export const checklistTemplates = sqliteTable("checklist_templates", {
  id: text("id").primaryKey(),
  platformId: text("platform_id").references(() => platforms.id),
  name: text("name").notNull(),
  type: text("type", { 
    enum: ["install", "pm", "troubleshooting", "qualification", "warranty_repair", "other"] 
  }).notNull(),
  description: text("description"),
  version: text("version"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const checklistTemplateItems = sqliteTable("checklist_template_items", {
  id: text("id").primaryKey(),
  templateId: text("template_id").notNull().references(() => checklistTemplates.id),
  sectionName: text("section_name"),
  itemText: text("item_text").notNull(),
  itemType: text("item_type", { 
    enum: ["checkbox", "text", "number", "select", "photo"] 
  }).notNull().default("checkbox"),
  options: text("options"),
  isRequired: integer("is_required", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const checklistRuns = sqliteTable("checklist_runs", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull().references(() => jobs.id),
  templateId: text("template_id").notNull().references(() => checklistTemplates.id),
  technicianId: text("technician_id").notNull().references(() => users.id),
  status: text("status", { 
    enum: ["in_progress", "completed", "cancelled"] 
  }).notNull().default("in_progress"),
  startedAt: text("started_at").notNull(),
  completedAt: text("completed_at"),
  notes: text("notes"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const checklistRunItems = sqliteTable("checklist_run_items", {
  id: text("id").primaryKey(),
  runId: text("run_id").notNull().references(() => checklistRuns.id),
  templateItemId: text("template_item_id").notNull().references(() => checklistTemplateItems.id),
  isCompleted: integer("is_completed", { mode: "boolean" }).notNull().default(false),
  value: text("value"),
  notes: text("notes"),
  completedAt: text("completed_at"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});
