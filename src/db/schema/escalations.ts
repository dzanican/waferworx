import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { jobs } from "./jobs";

export const escalations = sqliteTable("escalations", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull().references(() => jobs.id),
  escalationType: text("escalation_type", { 
    enum: ["engineering", "management", "vendor", "other"] 
  }).notNull(),
  ownerId: text("owner_id").references(() => users.id),
  ownerName: text("owner_name"),
  ownerEmail: text("owner_email"),
  priority: text("priority", { enum: ["low", "medium", "high", "critical"] }).notNull().default("medium"),
  status: text("status", { 
    enum: ["open", "in_progress", "resolved", "closed"] 
  }).notNull().default("open"),
  description: text("description").notNull(),
  resolution: text("resolution"),
  escalatedBy: text("escalated_by").references(() => users.id),
  escalatedAt: text("escalated_at").notNull(),
  resolvedAt: text("resolved_at"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const remoteSupportLogs = sqliteTable("remote_support_logs", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull().references(() => jobs.id),
  escalationId: text("escalation_id").references(() => escalations.id),
  sessionDate: text("session_date").notNull(),
  sessionDuration: integer("session_duration"),
  supportEngineer: text("support_engineer"),
  sessionNotes: text("session_notes").notNull(),
  recommendations: text("recommendations"),
  actionsTaken: text("actions_taken"),
  followUpRequired: integer("follow_up_required", { mode: "boolean" }).notNull().default(false),
  followUpNotes: text("follow_up_notes"),
  recordedBy: text("recorded_by").references(() => users.id),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});
