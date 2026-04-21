import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { platforms, tools } from "./tools";

export const serviceBulletins = sqliteTable("service_bulletins", {
  id: text("id").primaryKey(),
  bulletinNumber: text("bulletin_number").notNull().unique(),
  title: text("title").notNull(),
  type: text("type", { 
    enum: ["service_bulletin", "field_change_notice", "safety_notice", "technical_tip"] 
  }).notNull(),
  platformId: text("platform_id").references(() => platforms.id),
  severity: text("severity", { enum: ["info", "recommended", "mandatory", "critical"] }).notNull().default("info"),
  description: text("description").notNull(),
  affectedSystems: text("affected_systems"),
  procedure: text("procedure"),
  partsRequired: text("parts_required"),
  estimatedTime: integer("estimated_time"),
  effectiveDate: text("effective_date"),
  expirationDate: text("expiration_date"),
  attachmentKey: text("attachment_key"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const bulletinApplications = sqliteTable("bulletin_applications", {
  id: text("id").primaryKey(),
  bulletinId: text("bulletin_id").notNull().references(() => serviceBulletins.id),
  toolId: text("tool_id").notNull().references(() => tools.id),
  status: text("status", { 
    enum: ["pending", "scheduled", "completed", "not_applicable"] 
  }).notNull().default("pending"),
  completedDate: text("completed_date"),
  completedBy: text("completed_by"),
  jobId: text("job_id"),
  notes: text("notes"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});
