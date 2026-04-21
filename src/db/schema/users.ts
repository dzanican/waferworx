import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ["management", "technician", "customer"] }).notNull(),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  customerId: text("customer_id").references(() => customers.id),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const customers = sqliteTable("customers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  accountNumber: text("account_number").unique(),
  industry: text("industry"),
  notes: text("notes"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const sites = sqliteTable("sites", {
  id: text("id").primaryKey(),
  customerId: text("customer_id").notNull().references(() => customers.id),
  name: text("name").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  postalCode: text("postal_code"),
  country: text("country"),
  accessRestrictions: text("access_restrictions"),
  safetyRequirements: text("safety_requirements"),
  notes: text("notes"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const contacts = sqliteTable("contacts", {
  id: text("id").primaryKey(),
  customerId: text("customer_id").notNull().references(() => customers.id),
  siteId: text("site_id").references(() => sites.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  role: text("role"),
  isEscalation: integer("is_escalation", { mode: "boolean" }).notNull().default(false),
  isPrimary: integer("is_primary", { mode: "boolean" }).notNull().default(false),
  notes: text("notes"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});
