"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";

// Demo data for dropdowns
const customers = [
  { id: "cust-1", name: "Acme Semiconductor" },
  { id: "cust-2", name: "TechFab Inc" },
  { id: "cust-3", name: "Silicon Valley Chips" },
  { id: "cust-4", name: "MegaChip Corp" },
];

const sites: Record<string, { id: string; name: string }[]> = {
  "cust-1": [{ id: "site-1", name: "Fab 1 - Austin" }, { id: "site-2", name: "Fab 2 - Dallas" }],
  "cust-2": [{ id: "site-3", name: "Main Fab" }],
  "cust-3": [{ id: "site-4", name: "Fab 2" }],
  "cust-4": [{ id: "site-5", name: "New Fab" }],
};

const tools: Record<string, { id: string; name: string; model: string }[]> = {
  "site-1": [
    { id: "tool-1", name: "CVD Tool 1", model: "CVD-3000X" },
    { id: "tool-2", name: "CVD Tool 2", model: "CVD-3000X" },
  ],
  "site-2": [{ id: "tool-3", name: "PVD Tool 1", model: "PVD-1500" }],
  "site-3": [{ id: "tool-4", name: "Etch Tool 1", model: "ETCH-2000" }],
  "site-4": [{ id: "tool-5", name: "PVD Tool 2", model: "PVD-1500" }],
  "site-5": [{ id: "tool-6", name: "New CVD Tool", model: "CVD-3000X" }],
};

const technicians = [
  { id: "tech-1", name: "John Technician" },
  { id: "tech-2", name: "Sarah Engineer" },
  { id: "tech-3", name: "Mike Smith" },
];

export default function NewJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    customerId: "",
    siteId: "",
    toolId: "",
    technicianId: "",
    priority: "medium",
    entitlementType: "billable",
    plannedWeekYear: new Date().getFullYear().toString(),
    plannedWeekNumber: "",
    plannedStartDate: "",
    plannedEndDate: "",
    travelDays: "1",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Reset dependent fields
      if (field === "customerId") {
        updated.siteId = "";
        updated.toolId = "";
      }
      if (field === "siteId") {
        updated.toolId = "";
      }
      
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In production, this would create the job via API
    router.push("/dashboard/management/jobs");
  };

  const availableSites = formData.customerId ? sites[formData.customerId] || [] : [];
  const availableTools = formData.siteId ? tools[formData.siteId] || [] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/management/jobs">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create New Job</h2>
          <p className="text-gray-500">Create a new service job and assign it to a technician</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Basic information about the service job</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., CVD-3000 Annual PM"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the work to be performed..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => handleChange("priority", e.target.value)}
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entitlementType">Entitlement Type *</Label>
                  <Select
                    id="entitlementType"
                    value={formData.entitlementType}
                    onChange={(e) => handleChange("entitlementType", e.target.value)}
                    required
                  >
                    <option value="warranty">Warranty</option>
                    <option value="contract">Contract</option>
                    <option value="billable">Billable (T&M)</option>
                    <option value="training">Training</option>
                    <option value="internal">Internal</option>
                    <option value="goodwill">Goodwill</option>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assignment */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment</CardTitle>
              <CardDescription>Assign to a technician</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technicianId">Technician</Label>
                <Select
                  id="technicianId"
                  value={formData.technicianId}
                  onChange={(e) => handleChange("technicianId", e.target.value)}
                >
                  <option value="">-- Unassigned --</option>
                  {technicians.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.name}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelDays">Travel Days</Label>
                <Input
                  id="travelDays"
                  type="number"
                  min="0"
                  value={formData.travelDays}
                  onChange={(e) => handleChange("travelDays", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Customer & Tool */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Customer & Tool</CardTitle>
              <CardDescription>Select the customer, site, and tool for this job</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer *</Label>
                  <Select
                    id="customerId"
                    value={formData.customerId}
                    onChange={(e) => handleChange("customerId", e.target.value)}
                    required
                  >
                    <option value="">Select customer...</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteId">Site *</Label>
                  <Select
                    id="siteId"
                    value={formData.siteId}
                    onChange={(e) => handleChange("siteId", e.target.value)}
                    disabled={!formData.customerId}
                    required
                  >
                    <option value="">Select site...</option>
                    {availableSites.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toolId">Tool</Label>
                  <Select
                    id="toolId"
                    value={formData.toolId}
                    onChange={(e) => handleChange("toolId", e.target.value)}
                    disabled={!formData.siteId}
                  >
                    <option value="">Select tool...</option>
                    {availableTools.map((tool) => (
                      <option key={tool.id} value={tool.id}>
                        {tool.name} ({tool.model})
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>Planned work week and dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plannedWeekYear">Year</Label>
                  <Select
                    id="plannedWeekYear"
                    value={formData.plannedWeekYear}
                    onChange={(e) => handleChange("plannedWeekYear", e.target.value)}
                  >
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plannedWeekNumber">Work Week</Label>
                  <Input
                    id="plannedWeekNumber"
                    type="number"
                    min="1"
                    max="52"
                    placeholder="WW#"
                    value={formData.plannedWeekNumber}
                    onChange={(e) => handleChange("plannedWeekNumber", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plannedStartDate">Start Date</Label>
                <Input
                  id="plannedStartDate"
                  type="date"
                  value={formData.plannedStartDate}
                  onChange={(e) => handleChange("plannedStartDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plannedEndDate">End Date</Label>
                <Input
                  id="plannedEndDate"
                  type="date"
                  value={formData.plannedEndDate}
                  onChange={(e) => handleChange("plannedEndDate", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Any additional notes or special instructions..."
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <Link href="/dashboard/management/jobs">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? "Creating..." : "Create Job"}
          </Button>
        </div>
      </form>
    </div>
  );
}
