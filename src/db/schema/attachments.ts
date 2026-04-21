import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users";

export const attachments = sqliteTable("attachments", {
  id: text("id").primaryKey(),
  entityType: text("entity_type", { 
    enum: ["job", "tool", "csr", "utilization", "checklist", "escalation", "bulletin", "daily_update"] 
  }).notNull(),
  entityId: text("entity_id").notNull(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size").notNull(),
  storageKey: text("storage_key").notNull(),
  mimeType: text("mime_type"),
  description: text("description"),
  isCustomerVisible: integer("is_customer_visible", { mode: "boolean" }).notNull().default(false),
  uploadedBy: text("uploaded_by").references(() => users.id),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const serviceManuals = sqliteTable("service_manuals", {
  id: text("id").primaryKey(),
  platformId: text("platform_id"),
  title: text("title").notNull(),
  version: text("version"),
  description: text("description"),
  storageKey: text("storage_key").notNull(),
  fileType: text("file_type").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});
