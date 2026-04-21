import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { customers, sites } from "./users";

export const platforms = sqliteTable("platforms", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  manufacturer: text("manufacturer"),
  description: text("description"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const tools = sqliteTable("tools", {
  id: text("id").primaryKey(),
  customerId: text("customer_id").notNull().references(() => customers.id),
  siteId: text("site_id").references(() => sites.id),
  platformId: text("platform_id").references(() => platforms.id),
  serialNumber: text("serial_number").notNull(),
  model: text("model"),
  name: text("name"),
  chamberDetails: text("chamber_details"),
  softwareVersion: text("software_version"),
  installedOptions: text("installed_options"),
  customerModifications: text("customer_modifications"),
  installDate: text("install_date"),
  status: text("status", { enum: ["operational", "down", "maintenance", "decommissioned"] }).notNull().default("operational"),
  notes: text("notes"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const toolHistory = sqliteTable("tool_history", {
  id: text("id").primaryKey(),
  toolId: text("tool_id").notNull().references(() => tools.id),
  eventType: text("event_type", { 
    enum: ["installation", "upgrade", "modification", "fault", "pm", "repair", "calibration", "other"] 
  }).notNull(),
  eventDate: text("event_date").notNull(),
  description: text("description").notNull(),
  performedBy: text("performed_by"),
  jobId: text("job_id"),
  notes: text("notes"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});
