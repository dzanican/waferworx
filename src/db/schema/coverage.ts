import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { customers, sites } from "./users";
import { tools } from "./tools";

export const serviceContractTypes = sqliteTable("service_contract_types", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  responseSlaHours: integer("response_sla_hours"),
  includesParts: integer("includes_parts", { mode: "boolean" }).notNull().default(false),
  includesLabor: integer("includes_labor", { mode: "boolean" }).notNull().default(false),
  includesTravel: integer("includes_travel", { mode: "boolean" }).notNull().default(false),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const warranties = sqliteTable("warranties", {
  id: text("id").primaryKey(),
  toolId: text("tool_id").notNull().references(() => tools.id),
  warrantyType: text("warranty_type").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  coveredSystems: text("covered_systems"),
  exclusions: text("exclusions"),
  notes: text("notes"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const serviceContracts = sqliteTable("service_contracts", {
  id: text("id").primaryKey(),
  customerId: text("customer_id").notNull().references(() => customers.id),
  siteId: text("site_id").references(() => sites.id),
  contractTypeId: text("contract_type_id").references(() => serviceContractTypes.id),
  contractNumber: text("contract_number"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  annualValue: real("annual_value"),
  coveredTools: text("covered_tools"),
  exclusions: text("exclusions"),
  responseSlaHours: integer("response_sla_hours"),
  notes: text("notes"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const serviceContractTools = sqliteTable("service_contract_tools", {
  id: text("id").primaryKey(),
  contractId: text("contract_id").notNull().references(() => serviceContracts.id),
  toolId: text("tool_id").notNull().references(() => tools.id),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
});
