import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { jobs } from "./jobs";

export const utilizationCategories = sqliteTable("utilization_categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  description: text("description"),
  isBillable: integer("is_billable", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const utilizationSheets = sqliteTable("utilization_sheets", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull().references(() => jobs.id),
  technicianId: text("technician_id").notNull().references(() => users.id),
  weekYear: integer("week_year").notNull(),
  weekNumber: integer("week_number").notNull(),
  weekStartDate: text("week_start_date").notNull(),
  weekEndDate: text("week_end_date").notNull(),
  totalHours: real("total_hours").default(0),
  billableHours: real("billable_hours").default(0),
  nonBillableHours: real("non_billable_hours").default(0),
  status: text("status", { 
    enum: ["draft", "submitted", "approved", "rejected"] 
  }).notNull().default("draft"),
  submittedAt: text("submitted_at"),
  approvedBy: text("approved_by").references(() => users.id),
  approvedAt: text("approved_at"),
  rejectionReason: text("rejection_reason"),
  notes: text("notes"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const utilizationLines = sqliteTable("utilization_lines", {
  id: text("id").primaryKey(),
  sheetId: text("sheet_id").notNull().references(() => utilizationSheets.id),
  categoryId: text("category_id").notNull().references(() => utilizationCategories.id),
  dayOfWeek: integer("day_of_week").notNull(),
  date: text("date").notNull(),
  hours: real("hours").notNull().default(0),
  entitlementType: text("entitlement_type", { 
    enum: ["warranty", "contract", "billable", "training", "internal", "goodwill"] 
  }),
  notes: text("notes"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});
