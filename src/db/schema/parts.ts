import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { jobs } from "./jobs";

export const parts = sqliteTable("parts", {
  id: text("id").primaryKey(),
  partNumber: text("part_number").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  manufacturer: text("manufacturer"),
  category: text("category"),
  unitCost: real("unit_cost"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const jobParts = sqliteTable("job_parts", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull().references(() => jobs.id),
  partId: text("part_id").references(() => parts.id),
  partNumber: text("part_number").notNull(),
  partName: text("part_name"),
  quantity: integer("quantity").notNull().default(1),
  serialNumberRemoved: text("serial_number_removed"),
  serialNumberInstalled: text("serial_number_installed"),
  status: text("status", { 
    enum: ["used", "pending", "backordered", "cancelled"] 
  }).notNull().default("used"),
  unitCost: real("unit_cost"),
  isBillable: integer("is_billable", { mode: "boolean" }).notNull().default(true),
  notes: text("notes"),
  addedBy: text("added_by").references(() => users.id),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const consumables = sqliteTable("consumables", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull().references(() => jobs.id),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull().default(1),
  unitCost: real("unit_cost"),
  isBillable: integer("is_billable", { mode: "boolean" }).notNull().default(true),
  notes: text("notes"),
  addedBy: text("added_by").references(() => users.id),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});
