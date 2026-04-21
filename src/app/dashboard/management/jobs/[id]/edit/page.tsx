"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { ArrowLeft, Save } from "lucide-react";

const jobData = {
  id: "job-1",
  jobNumber: "JOB-2024-0001",
  title: "CVD-3000 Annual PM",
  description: "Perform annual preventive maintenance on CVD Tool 1. Include chamber cleaning, RF generator inspection, and full system qualification.",
  customerId: "cust-1",
  siteId: "site-1",
  toolId: "tool-1",
  technicianId: "tech-1",
  status: "in_progress",
  priority: "medium",
  entitlement: "contract",
  plannedStartDate: "2024-04-08",
  plannedEndDate: "2024-04-12",
  notes: "Customer requested morning start times. Contact Mike Engineer on arrival.",
};

export default function EditJobPage() {
  const params = useParams();
  const router = useRouter();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    title: jobData.title,
    description: jobData.description,
    customerId: jobData.customerId,
    siteId: jobData.siteId,
    toolId: jobData.toolId,
    technicianId: jobData.technicianId,
    status: jobData.status,
    priority: jobData.priority,
    entitlement: jobData.entitlement,
    plannedStartDate: jobData.plannedStartDate,
    plannedEndDate: jobData.plannedEndDate,
    notes: jobData.notes,
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title) {
      addToast("Please enter a job title", "error");
      return;
    }
    
    addToast("Job updated successfully", "success");
    router.push(`/dashboard/management/jobs/${params.id}`);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/management/jobs/${params.id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Job</h2>
          <p className="text-gray-500">{jobData.jobNumber}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Basic job information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="on_hold">On Hold</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                id="priority"
                value={formData.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assignment</CardTitle>
          <CardDescription>Customer, tool, and technician assignment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerId">Customer</Label>
            <Select
              id="customerId"
              value={formData.customerId}
              onChange={(e) => handleChange("customerId", e.target.value)}
            >
              <option value="cust-1">Acme Semiconductor</option>
              <option value="cust-2">TechFab Inc</option>
              <option value="cust-3">Silicon Valley Chips</option>
              <option value="cust-4">MegaChip Corp</option>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteId">Site</Label>
              <Select
                id="siteId"
                value={formData.siteId}
                onChange={(e) => handleChange("siteId", e.target.value)}
              >
                <option value="site-1">Fab 1 - Austin</option>
                <option value="site-2">Fab 2 - Dallas</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="toolId">Tool</Label>
              <Select
                id="toolId"
                value={formData.toolId}
                onChange={(e) => handleChange("toolId", e.target.value)}
              >
                <option value="tool-1">CVD Tool 1 (CVD3K-2024-001)</option>
                <option value="tool-2">CVD Tool 2 (CVD3K-2023-002)</option>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="technicianId">Assigned Technician</Label>
            <Select
              id="technicianId"
              value={formData.technicianId}
              onChange={(e) => handleChange("technicianId", e.target.value)}
            >
              <option value="">Unassigned</option>
              <option value="tech-1">John Technician</option>
              <option value="tech-2">Sarah Engineer</option>
              <option value="tech-3">Mike Smith</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule & Billing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plannedStartDate">Planned Start Date</Label>
              <Input
                id="plannedStartDate"
                type="date"
                value={formData.plannedStartDate}
                onChange={(e) => handleChange("plannedStartDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plannedEndDate">Planned End Date</Label>
              <Input
                id="plannedEndDate"
                type="date"
                value={formData.plannedEndDate}
                onChange={(e) => handleChange("plannedEndDate", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="entitlement">Entitlement Type</Label>
            <Select
              id="entitlement"
              value={formData.entitlement}
              onChange={(e) => handleChange("entitlement", e.target.value)}
            >
              <option value="contract">Contract</option>
              <option value="warranty">Warranty</option>
              <option value="billable">Billable</option>
              <option value="goodwill">Goodwill</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Additional notes..."
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Link href={`/dashboard/management/jobs/${params.id}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
