import { generateId } from "@/lib/utils";
import { hashPassword } from "@/lib/auth";

export function getSeedData() {
  const now = new Date().toISOString();
  
  // Demo user IDs
  const managementUserId = generateId();
  const technicianUserId = generateId();
  const customerUserId = generateId();
  
  // Customer and related IDs
  const customerId = generateId();
  const siteId = generateId();
  const contactId = generateId();
  
  // Platform and tool IDs
  const platformId = generateId();
  const toolId = generateId();
  
  // Coverage IDs
  const contractTypeId = generateId();
  const warrantyId = generateId();
  const contractId = generateId();
  
  // Job status IDs
  const statusOpenId = generateId();
  const statusInProgressId = generateId();
  const statusOnHoldId = generateId();
  const statusCompletedId = generateId();
  const statusClosedId = generateId();
  
  // Visit phase IDs
  const phaseInitialId = generateId();
  const phaseFollowUpId = generateId();
  const phaseFinalId = generateId();
  
  // Utilization category IDs
  const catTravelId = generateId();
  const catInstallId = generateId();
  const catWarrantyId = generateId();
  const catPaidServiceId = generateId();
  const catTrainingId = generateId();
  const catInternalId = generateId();
  
  // Job ID
  const jobId = generateId();

  return {
    users: [
      {
        id: managementUserId,
        username: "Management",
        passwordHash: hashPassword("Password"),
        role: "management" as const,
        email: "management@waferworx.demo",
        firstName: "Admin",
        lastName: "Manager",
        phone: "555-0100",
        customerId: null,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: technicianUserId,
        username: "FSE",
        passwordHash: hashPassword("Password"),
        role: "technician" as const,
        email: "fse@waferworx.demo",
        firstName: "John",
        lastName: "Technician",
        phone: "555-0101",
        customerId: null,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: customerUserId,
        username: "Customer",
        passwordHash: hashPassword("Password"),
        role: "customer" as const,
        email: "customer@acmesemi.demo",
        firstName: "Jane",
        lastName: "Customer",
        phone: "555-0102",
        customerId: customerId,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ],
    
    customers: [
      {
        id: customerId,
        name: "Acme Semiconductor",
        accountNumber: "ACME-001",
        industry: "Semiconductor Manufacturing",
        notes: "Premium customer with multiple fabs",
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ],
    
    sites: [
      {
        id: siteId,
        customerId: customerId,
        name: "Fab 1 - Austin",
        address: "1234 Silicon Way",
        city: "Austin",
        state: "TX",
        postalCode: "78701",
        country: "USA",
        accessRestrictions: "Cleanroom access required. Badge at security.",
        safetyRequirements: "Safety glasses and ESD protection required.",
        notes: "Main production facility",
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ],
    
    contacts: [
      {
        id: contactId,
        customerId: customerId,
        siteId: siteId,
        firstName: "Mike",
        lastName: "Engineer",
        email: "mike.engineer@acmesemi.demo",
        phone: "555-0200",
        role: "Process Engineer",
        isEscalation: false,
        isPrimary: true,
        notes: "Primary contact for Fab 1",
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ],
    
    platforms: [
      {
        id: platformId,
        name: "CVD-3000",
        manufacturer: "WaferWorx",
        description: "Chemical Vapor Deposition System",
        isActive: true,
        createdAt: now,
      },
    ],
    
    tools: [
      {
        id: toolId,
        customerId: customerId,
        siteId: siteId,
        platformId: platformId,
        serialNumber: "CVD3K-2024-001",
        model: "CVD-3000X",
        name: "CVD Tool 1",
        chamberDetails: "4-chamber configuration",
        softwareVersion: "v3.2.1",
        installedOptions: "Auto-clean, Remote monitoring",
        customerModifications: null,
        installDate: "2024-01-15",
        status: "operational" as const,
        notes: "Primary production tool",
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ],
    
    serviceContractTypes: [
      {
        id: contractTypeId,
        name: "Full Service",
        description: "Comprehensive coverage including parts, labor, and travel",
        responseSlaHours: 24,
        includesParts: true,
        includesLabor: true,
        includesTravel: true,
        isActive: true,
        createdAt: now,
      },
    ],
    
    warranties: [
      {
        id: warrantyId,
        toolId: toolId,
        warrantyType: "Standard",
        startDate: "2024-01-15",
        endDate: "2025-01-15",
        coveredSystems: "All systems",
        exclusions: "Consumables, customer damage",
        notes: "1-year standard warranty",
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ],
    
    serviceContracts: [
      {
        id: contractId,
        customerId: customerId,
        siteId: siteId,
        contractTypeId: contractTypeId,
        contractNumber: "SC-2024-001",
        startDate: "2024-01-15",
        endDate: "2026-01-15",
        annualValue: 150000,
        coveredTools: toolId,
        exclusions: "Consumables",
        responseSlaHours: 24,
        notes: "2-year full service contract",
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ],
    
    jobStatuses: [
      { id: statusOpenId, name: "Open", description: "Job created, not yet started", sortOrder: 1, isTerminal: false, color: "#3B82F6", createdAt: now },
      { id: statusInProgressId, name: "In Progress", description: "Technician actively working", sortOrder: 2, isTerminal: false, color: "#F59E0B", createdAt: now },
      { id: statusOnHoldId, name: "On Hold", description: "Waiting for parts or customer", sortOrder: 3, isTerminal: false, color: "#EF4444", createdAt: now },
      { id: statusCompletedId, name: "Completed", description: "Work finished, pending review", sortOrder: 4, isTerminal: false, color: "#10B981", createdAt: now },
      { id: statusClosedId, name: "Closed", description: "Job fully closed", sortOrder: 5, isTerminal: true, color: "#6B7280", createdAt: now },
    ],
    
    visitPhases: [
      { id: phaseInitialId, name: "Initial Visit", description: "First visit for this job", sortOrder: 1, createdAt: now },
      { id: phaseFollowUpId, name: "Follow-Up", description: "Return visit to continue work", sortOrder: 2, createdAt: now },
      { id: phaseFinalId, name: "Final Completion", description: "Final visit to close out job", sortOrder: 3, createdAt: now },
    ],
    
    utilizationCategories: [
      { id: catTravelId, name: "Travel", code: "TRAVEL", description: "Travel time to/from site", isBillable: true, sortOrder: 1, isActive: true, createdAt: now },
      { id: catInstallId, name: "Install", code: "INSTALL", description: "Installation work", isBillable: true, sortOrder: 2, isActive: true, createdAt: now },
      { id: catWarrantyId, name: "Warranty", code: "WARRANTY", description: "Warranty repair work", isBillable: false, sortOrder: 3, isActive: true, createdAt: now },
      { id: catPaidServiceId, name: "Paid Service", code: "PAID_SVC", description: "Billable service work", isBillable: true, sortOrder: 4, isActive: true, createdAt: now },
      { id: catTrainingId, name: "Training", code: "TRAINING", description: "Customer training", isBillable: true, sortOrder: 5, isActive: true, createdAt: now },
      { id: catInternalId, name: "Internal", code: "INTERNAL", description: "Internal/non-billable work", isBillable: false, sortOrder: 6, isActive: true, createdAt: now },
    ],
    
    jobs: [
      {
        id: jobId,
        jobNumber: "JOB-2024-0001",
        customerId: customerId,
        siteId: siteId,
        toolId: toolId,
        technicianId: technicianUserId,
        statusId: statusInProgressId,
        visitPhaseId: phaseInitialId,
        parentJobId: null,
        title: "CVD-3000 Annual PM",
        description: "Perform annual preventive maintenance on CVD Tool 1",
        priority: "medium" as const,
        entitlementType: "contract" as const,
        plannedWeekYear: 2024,
        plannedWeekNumber: 15,
        plannedStartDate: "2024-04-08",
        plannedEndDate: "2024-04-12",
        actualStartDate: "2024-04-08",
        actualEndDate: null,
        actualWeeksWorked: 1,
        holdReason: null,
        holdDate: null,
        isReturnVisit: false,
        returnVisitReason: null,
        travelDays: 1,
        notes: "Customer requested morning start times",
        isArchived: false,
        createdBy: managementUserId,
        createdAt: now,
        updatedAt: now,
      },
    ],
    
    // Reference IDs for use in app
    ids: {
      managementUserId,
      technicianUserId,
      customerUserId,
      customerId,
      siteId,
      contactId,
      platformId,
      toolId,
      contractTypeId,
      warrantyId,
      contractId,
      statusOpenId,
      statusInProgressId,
      statusOnHoldId,
      statusCompletedId,
      statusClosedId,
      phaseInitialId,
      phaseFollowUpId,
      phaseFinalId,
      catTravelId,
      catInstallId,
      catWarrantyId,
      catPaidServiceId,
      catTrainingId,
      catInternalId,
      jobId,
    },
  };
}
