import { getSeedData } from "@/db/seed";

// For demo purposes, we use in-memory data from seed
// In production, this would query D1 database

let seedData: ReturnType<typeof getSeedData> | null = null;

function getData() {
  if (!seedData) {
    seedData = getSeedData();
  }
  return seedData;
}

// Users
export function getUsers() {
  return getData().users;
}

export function getUserById(id: string) {
  return getData().users.find((u) => u.id === id);
}

export function getTechnicians() {
  return getData().users.filter((u) => u.role === "technician");
}

// Customers
export function getCustomers() {
  return getData().customers;
}

export function getCustomerById(id: string) {
  return getData().customers.find((c) => c.id === id);
}

// Sites
export function getSites() {
  return getData().sites;
}

export function getSiteById(id: string) {
  return getData().sites.find((s) => s.id === id);
}

export function getSitesByCustomerId(customerId: string) {
  return getData().sites.filter((s) => s.customerId === customerId);
}

// Contacts
export function getContacts() {
  return getData().contacts;
}

export function getContactsByCustomerId(customerId: string) {
  return getData().contacts.filter((c) => c.customerId === customerId);
}

// Platforms
export function getPlatforms() {
  return getData().platforms;
}

// Tools
export function getTools() {
  return getData().tools;
}

export function getToolById(id: string) {
  return getData().tools.find((t) => t.id === id);
}

export function getToolsByCustomerId(customerId: string) {
  return getData().tools.filter((t) => t.customerId === customerId);
}

// Warranties
export function getWarranties() {
  return getData().warranties;
}

export function getWarrantiesByToolId(toolId: string) {
  return getData().warranties.filter((w) => w.toolId === toolId);
}

// Service Contracts
export function getServiceContracts() {
  return getData().serviceContracts;
}

export function getServiceContractsByCustomerId(customerId: string) {
  return getData().serviceContracts.filter((c) => c.customerId === customerId);
}

// Job Statuses
export function getJobStatuses() {
  return getData().jobStatuses;
}

export function getJobStatusById(id: string) {
  return getData().jobStatuses.find((s) => s.id === id);
}

// Visit Phases
export function getVisitPhases() {
  return getData().visitPhases;
}

// Utilization Categories
export function getUtilizationCategories() {
  return getData().utilizationCategories;
}

// Jobs
export function getJobs() {
  return getData().jobs;
}

export function getJobById(id: string) {
  return getData().jobs.find((j) => j.id === id);
}

export function getJobsByTechnicianId(technicianId: string) {
  return getData().jobs.filter((j) => j.technicianId === technicianId);
}

export function getJobsByCustomerId(customerId: string) {
  return getData().jobs.filter((j) => j.customerId === customerId);
}

// Reference IDs
export function getIds() {
  return getData().ids;
}

// Service Contract Types
export function getServiceContractTypes() {
  return getData().serviceContractTypes;
}
