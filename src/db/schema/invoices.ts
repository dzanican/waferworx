import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { users, customers } from "./users";
import { jobs } from "./jobs";

export const invoices = sqliteTable("invoices", {
  id: text("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  customerId: text("customer_id").notNull().references(() => customers.id),
  jobId: text("job_id").references(() => jobs.id),
  
  status: text("status", { 
    enum: ["draft", "pending_review", "approved", "sent", "paid", "cancelled"] 
  }).notNull().default("draft"),
  
  invoiceDate: text("invoice_date"),
  dueDate: text("due_date"),
  
  subtotal: real("subtotal").default(0),
  taxRate: real("tax_rate").default(0),
  taxAmount: real("tax_amount").default(0),
  total: real("total").default(0),
  
  laborTotal: real("labor_total").default(0),
  partsTotal: real("parts_total").default(0),
  travelTotal: real("travel_total").default(0),
  otherTotal: real("other_total").default(0),
  
  notes: text("notes"),
  terms: text("terms"),
  
  pdfStorageKey: text("pdf_storage_key"),
  
  createdBy: text("created_by").references(() => users.id),
  approvedBy: text("approved_by").references(() => users.id),
  approvedAt: text("approved_at"),
  sentAt: text("sent_at"),
  paidAt: text("paid_at"),
  
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const invoiceLines = sqliteTable("invoice_lines", {
  id: text("id").primaryKey(),
  invoiceId: text("invoice_id").notNull().references(() => invoices.id),
  lineType: text("line_type", { 
    enum: ["labor", "parts", "travel", "other"] 
  }).notNull(),
  description: text("description").notNull(),
  quantity: real("quantity").notNull().default(1),
  unitPrice: real("unit_price").notNull().default(0),
  total: real("total").notNull().default(0),
  date: text("date"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const invoiceReadinessFlags = sqliteTable("invoice_readiness_flags", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull().references(() => jobs.id),
  flagType: text("flag_type", { 
    enum: ["missing_hours", "missing_signature", "missing_attachments", "incomplete_csr", "pending_parts", "pending_approval"] 
  }).notNull(),
  description: text("description"),
  isResolved: integer("is_resolved", { mode: "boolean" }).notNull().default(false),
  resolvedAt: text("resolved_at"),
  resolvedBy: text("resolved_by").references(() => users.id),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});
