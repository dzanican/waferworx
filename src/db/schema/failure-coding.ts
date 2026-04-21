import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { jobs } from "./jobs";

export const subsystems = sqliteTable("subsystems", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  platformId: text("platform_id"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const symptomCodes = sqliteTable("symptom_codes", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  subsystemId: text("subsystem_id").references(() => subsystems.id),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const causeCodes = sqliteTable("cause_codes", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const actionCodes = sqliteTable("action_codes", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const jobFailureCoding = sqliteTable("job_failure_coding", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull().references(() => jobs.id),
  subsystemId: text("subsystem_id").references(() => subsystems.id),
  symptomCodeId: text("symptom_code_id").references(() => symptomCodes.id),
  suspectedCauseId: text("suspected_cause_id").references(() => causeCodes.id),
  confirmedCauseId: text("confirmed_cause_id").references(() => causeCodes.id),
  actionCodeId: text("action_code_id").references(() => actionCodes.id),
  symptomDescription: text("symptom_description"),
  rootCauseAnalysis: text("root_cause_analysis"),
  correctiveAction: text("corrective_action"),
  preventiveAction: text("preventive_action"),
  recordedBy: text("recorded_by").references(() => users.id),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});
