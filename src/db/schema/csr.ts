import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { users, contacts } from "./users";
import { jobs } from "./jobs";

export const customerServiceReports = sqliteTable("customer_service_reports", {
  id: text("id").primaryKey(),
  jobId: text("job_id").notNull().references(() => jobs.id),
  technicianId: text("technician_id").notNull().references(() => users.id),
  reportNumber: text("report_number").notNull().unique(),
  
  visitStartDate: text("visit_start_date").notNull(),
  visitEndDate: text("visit_end_date").notNull(),
  
  problemDescription: text("problem_description").notNull(),
  workPerformed: text("work_performed").notNull(),
  recommendations: text("recommendations"),
  
  totalHours: real("total_hours").default(0),
  travelHours: real("travel_hours").default(0),
  laborHours: real("labor_hours").default(0),
  
  status: text("status", { 
    enum: ["draft", "submitted", "approved", "rejected", "signed"] 
  }).notNull().default("draft"),
  
  submittedAt: text("submitted_at"),
  approvedBy: text("approved_by").references(() => users.id),
  approvedAt: text("approved_at"),
  rejectionReason: text("rejection_reason"),
  
  customerContactId: text("customer_contact_id").references(() => contacts.id),
  customerSignature: text("customer_signature"),
  customerSignedAt: text("customer_signed_at"),
  customerSignedName: text("customer_signed_name"),
  customerDisputes: text("customer_disputes"),
  
  pdfStorageKey: text("pdf_storage_key"),
  
  notes: text("notes"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const csrHourBreakdown = sqliteTable("csr_hour_breakdown", {
  id: text("id").primaryKey(),
  csrId: text("csr_id").notNull().references(() => customerServiceReports.id),
  date: text("date").notNull(),
  category: text("category").notNull(),
  hours: real("hours").notNull(),
  description: text("description"),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});
