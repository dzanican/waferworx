"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";
import {
  FileText,
  Download,
  Send,
  Save,
  Plus,
  Calendar,
  Clock,
  User,
  Building2,
  Cpu,
  CheckCircle,
  Edit,
} from "lucide-react";

const existingReports = [
  {
    id: "csr-1",
    number: "CSR-2024-0012",
    jobNumber: "JOB-2024-0004",
    customer: "Acme Semiconductor",
    tool: "CVD-3000X",
    visitDate: "Apr 1-3, 2024",
    status: "signed",
  },
  {
    id: "csr-2",
    number: "CSR-2024-0008",
    jobNumber: "JOB-2024-0003",
    customer: "Silicon Valley Chips",
    tool: "PVD-1500",
    visitDate: "Mar 20-22, 2024",
    status: "approved",
  },
];

const pendingJobs = [
  {
    id: "job-1",
    jobNumber: "JOB-2024-0001",
    title: "CVD-3000 Annual PM",
    customer: "Acme Semiconductor",
    tool: "CVD-3000X",
    visitDates: "Apr 8-12, 2024",
  },
];

const statusColors: Record<string, "success" | "warning" | "default" | "secondary"> = {
  "draft": "secondary",
  "submitted": "warning",
  "approved": "success",
  "signed": "success",
};

export default function TechnicianReportsPage() {
  const [activeView, setActiveView] = useState<"list" | "create">("list");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  if (activeView === "create" && selectedJob) {
    return <CSRForm jobId={selectedJob} onBack={() => setActiveView("list")} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Service Reports</h2>
          <p className="text-gray-500">Create and manage Customer Service Reports</p>
        </div>
      </div>

      {/* Pending CSRs */}
      {pendingJobs.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-5 w-5 text-yellow-600" />
              CSR Required
            </CardTitle>
            <CardDescription>These jobs need a Customer Service Report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <div className="font-medium">{job.jobNumber} - {job.title}</div>
                    <div className="text-sm text-gray-500">
                      {job.customer} • {job.tool} • {job.visitDates}
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedJob(job.id);
                      setActiveView("create");
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create CSR
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {existingReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{report.number}</div>
                    <div className="text-sm text-gray-500">
                      {report.jobNumber} • {report.customer} • {report.tool}
                    </div>
                    <div className="text-xs text-gray-400">{report.visitDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={statusColors[report.status]}>{report.status}</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CSRForm({ jobId, onBack }: { jobId: string; onBack: () => void }) {
  const { addToast } = useToast();
  const [status, setStatus] = useState("draft");
  const [formData, setFormData] = useState({
    visitStartDate: "2024-04-08",
    visitEndDate: "2024-04-12",
    problemDescription: "",
    workPerformed: "",
    recommendations: "",
    travelHours: "4",
    laborHours: "33",
    customerContactName: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    addToast("CSR saved as draft", "success");
  };

  const handlePreviewPDF = () => {
    addToast("Generating PDF preview...", "info");
    setTimeout(() => {
      addToast("PDF preview ready", "success");
    }, 1500);
  };

  const handleSubmit = () => {
    if (!formData.problemDescription || !formData.workPerformed) {
      addToast("Please fill in required fields", "error");
      return;
    }
    setStatus("submitted");
    addToast("CSR submitted for approval", "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create Customer Service Report</h2>
          <p className="text-gray-500">JOB-2024-0001 - CVD-3000 Annual PM</p>
        </div>
      </div>

      {/* Job Summary */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-gray-500">Customer</div>
                <div className="font-medium">Acme Semiconductor</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-gray-500">Tool</div>
                <div className="font-medium">CVD-3000X (CVD3K-2024-001)</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-gray-500">Visit Dates</div>
                <div className="font-medium">Apr 8-12, 2024</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-400" />
              <div>
                <div className="text-gray-500">Technician</div>
                <div className="font-medium">John Technician</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visit Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visitStartDate">Visit Start Date</Label>
                  <Input
                    id="visitStartDate"
                    type="date"
                    value={formData.visitStartDate}
                    onChange={(e) => handleChange("visitStartDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visitEndDate">Visit End Date</Label>
                  <Input
                    id="visitEndDate"
                    type="date"
                    value={formData.visitEndDate}
                    onChange={(e) => handleChange("visitEndDate", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Summary</CardTitle>
              <CardDescription>This information will be visible to the customer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="problemDescription">Problem Description / Reason for Visit *</Label>
                <Textarea
                  id="problemDescription"
                  value={formData.problemDescription}
                  onChange={(e) => handleChange("problemDescription", e.target.value)}
                  placeholder="Describe the reason for this service visit..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workPerformed">Work Performed *</Label>
                <Textarea
                  id="workPerformed"
                  value={formData.workPerformed}
                  onChange={(e) => handleChange("workPerformed", e.target.value)}
                  placeholder="Describe the work completed during this visit..."
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recommendations">Recommendations</Label>
                <Textarea
                  id="recommendations"
                  value={formData.recommendations}
                  onChange={(e) => handleChange("recommendations", e.target.value)}
                  placeholder="Any recommendations for the customer..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Sign-Off</CardTitle>
              <CardDescription>Optional - customer can sign digitally</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerContactName">Customer Contact Name</Label>
                <Input
                  id="customerContactName"
                  value={formData.customerContactName}
                  onChange={(e) => handleChange("customerContactName", e.target.value)}
                  placeholder="Name of customer representative"
                />
              </div>
              <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <p className="text-gray-500">Signature capture area</p>
                <p className="text-sm text-gray-400 mt-1">Customer can sign here or sign the PDF</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hours Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="travelHours">Travel Hours</Label>
                <Input
                  id="travelHours"
                  type="number"
                  value={formData.travelHours}
                  onChange={(e) => handleChange("travelHours", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="laborHours">Labor Hours</Label>
                <Input
                  id="laborHours"
                  type="number"
                  value={formData.laborHours}
                  onChange={(e) => handleChange("laborHours", e.target.value)}
                />
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Hours</span>
                  <span className="font-bold">
                    {(parseFloat(formData.travelHours) || 0) + (parseFloat(formData.laborHours) || 0)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Internal notes (not visible to customer)..."
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full" onClick={handleSaveDraft} disabled={status === "submitted"}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" className="w-full" onClick={handlePreviewPDF}>
                <Download className="h-4 w-4 mr-2" />
                Preview PDF
              </Button>
              <Button className="w-full" onClick={handleSubmit} disabled={status === "submitted"}>
                <Send className="h-4 w-4 mr-2" />
                {status === "submitted" ? "Submitted" : "Submit for Approval"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
