"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import {
  FileText,
  Download,
  Calendar,
  Clock,
  BarChart3,
  Users,
  Building2,
  Cpu,
  DollarSign,
  FileSpreadsheet,
  Mail,
  Plus,
  Play,
  Settings,
} from "lucide-react";

const reportTemplates = [
  {
    id: "rpt-1",
    name: "Weekly Service Summary",
    description: "Overview of all service activities for the week",
    category: "Operations",
    frequency: "Weekly",
    lastRun: "Apr 12, 2024",
    icon: BarChart3,
  },
  {
    id: "rpt-2",
    name: "Technician Utilization",
    description: "Detailed utilization breakdown by technician",
    category: "Resources",
    frequency: "Weekly",
    lastRun: "Apr 12, 2024",
    icon: Users,
  },
  {
    id: "rpt-3",
    name: "Customer Service History",
    description: "Complete service history for a customer",
    category: "Customer",
    frequency: "On-demand",
    lastRun: "Apr 10, 2024",
    icon: Building2,
  },
  {
    id: "rpt-4",
    name: "Tool Service History",
    description: "Complete service history for a specific tool",
    category: "Equipment",
    frequency: "On-demand",
    lastRun: "Apr 8, 2024",
    icon: Cpu,
  },
  {
    id: "rpt-5",
    name: "Billing Summary",
    description: "Billable hours and revenue by customer",
    category: "Finance",
    frequency: "Monthly",
    lastRun: "Apr 1, 2024",
    icon: DollarSign,
  },
  {
    id: "rpt-6",
    name: "PM Compliance",
    description: "PM schedule adherence and completion rates",
    category: "Operations",
    frequency: "Monthly",
    lastRun: "Apr 1, 2024",
    icon: Calendar,
  },
];

const scheduledReports = [
  {
    id: "sch-1",
    report: "Weekly Service Summary",
    schedule: "Every Monday 8:00 AM",
    recipients: ["manager@waferworx.demo", "admin@waferworx.demo"],
    format: "PDF",
    status: "active",
  },
  {
    id: "sch-2",
    report: "Technician Utilization",
    schedule: "Every Friday 5:00 PM",
    recipients: ["manager@waferworx.demo"],
    format: "Excel",
    status: "active",
  },
  {
    id: "sch-3",
    report: "Billing Summary",
    schedule: "1st of month 9:00 AM",
    recipients: ["finance@waferworx.demo", "manager@waferworx.demo"],
    format: "PDF",
    status: "active",
  },
];

const recentExports = [
  { id: "exp-1", name: "Weekly_Summary_WW15_2024.pdf", date: "Apr 12, 2024", size: "245 KB" },
  { id: "exp-2", name: "Utilization_WW15_2024.xlsx", date: "Apr 12, 2024", size: "128 KB" },
  { id: "exp-3", name: "Customer_AcmeSemi_History.pdf", date: "Apr 10, 2024", size: "1.2 MB" },
  { id: "exp-4", name: "Billing_March_2024.pdf", date: "Apr 1, 2024", size: "456 KB" },
];

const dataExports = [
  { id: "de-1", name: "Jobs", description: "Export all job records", fields: 25 },
  { id: "de-2", name: "Customers", description: "Export customer data", fields: 15 },
  { id: "de-3", name: "Tools", description: "Export tool inventory", fields: 20 },
  { id: "de-4", name: "Parts Used", description: "Export parts consumption", fields: 12 },
  { id: "de-5", name: "Timesheets", description: "Export utilization data", fields: 18 },
  { id: "de-6", name: "Failure Codes", description: "Export failure analysis", fields: 10 },
];

export default function ReportsPage() {
  const { addToast } = useToast();
  const [showRunDialog, setShowRunDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<typeof reportTemplates[0] | null>(null);
  const [selectedExport, setSelectedExport] = useState<typeof dataExports[0] | null>(null);

  const handleGenerateReport = () => {
    addToast(`Generating ${selectedReport?.name}...`, "info");
    setShowRunDialog(false);
    setTimeout(() => {
      addToast(`${selectedReport?.name} generated successfully`, "success");
    }, 2000);
  };

  const handleExportData = () => {
    addToast(`Exporting ${selectedExport?.name} data...`, "info");
    setShowExportDialog(false);
    setTimeout(() => {
      addToast(`${selectedExport?.name} export complete`, "success");
    }, 1500);
  };

  const handleDownloadRecent = (name: string) => {
    addToast(`Downloading ${name}...`, "info");
    setTimeout(() => {
      addToast("Download complete", "success");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Exports</h2>
          <p className="text-gray-500">Generate reports and export data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Templates */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Pre-built reports ready to run</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTemplates.map((report) => (
                  <div
                    key={report.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedReport(report);
                      setShowRunDialog(true);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <report.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{report.description}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{report.category}</Badge>
                          <span className="text-xs text-gray-400">{report.frequency}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Exports */}
          <Card>
            <CardHeader>
              <CardTitle>Data Exports</CardTitle>
              <CardDescription>Export raw data to CSV or Excel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dataExports.map((exp) => (
                  <div
                    key={exp.id}
                    className="border rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedExport(exp);
                      setShowExportDialog(true);
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FileSpreadsheet className="h-4 w-4 text-green-600" />
                      <span className="font-medium">{exp.name}</span>
                    </div>
                    <div className="text-xs text-gray-500">{exp.fields} fields</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Scheduled Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>Scheduled Reports</span>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduledReports.map((sch) => (
                  <div key={sch.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{sch.report}</span>
                      <Badge variant="success" className="text-xs">Active</Badge>
                    </div>
                    <div className="text-xs text-gray-500">{sch.schedule}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <Mail className="h-3 w-3" />
                      {sch.recipients.length} recipients • {sch.format}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Exports */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Exports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentExports.map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium truncate max-w-[150px]">{exp.name}</div>
                        <div className="text-xs text-gray-500">{exp.date} • {exp.size}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadRecent(exp.name)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Run Report Dialog */}
      <Dialog open={showRunDialog} onOpenChange={setShowRunDialog}>
        <DialogContent onClose={() => setShowRunDialog(false)}>
          <DialogHeader>
            <DialogTitle>Run Report: {selectedReport?.name}</DialogTitle>
            <DialogDescription>{selectedReport?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" defaultValue="2024-04-01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" defaultValue="2024-04-12" />
              </div>
            </div>
            {selectedReport?.category === "Customer" && (
              <div className="space-y-2">
                <Label htmlFor="customer">Customer</Label>
                <Select id="customer">
                  <option value="all">All Customers</option>
                  <option value="acme">Acme Semiconductor</option>
                  <option value="techfab">TechFab Inc</option>
                  <option value="svc">Silicon Valley Chips</option>
                </Select>
              </div>
            )}
            {selectedReport?.category === "Equipment" && (
              <div className="space-y-2">
                <Label htmlFor="tool">Tool</Label>
                <Select id="tool">
                  <option value="">Select tool...</option>
                  <option value="tool-1">CVD Tool 1 (CVD3K-2024-001)</option>
                  <option value="tool-2">CVD Tool 2 (CVD3K-2023-002)</option>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="format">Output Format</Label>
              <Select id="format" defaultValue="pdf">
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRunDialog(false)}>Cancel</Button>
            <Button onClick={handleGenerateReport}>
              <Play className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Data Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent onClose={() => setShowExportDialog(false)}>
          <DialogHeader>
            <DialogTitle>Export: {selectedExport?.name}</DialogTitle>
            <DialogDescription>{selectedExport?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expStartDate">Start Date</Label>
                <Input id="expStartDate" type="date" defaultValue="2024-01-01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expEndDate">End Date</Label>
                <Input id="expEndDate" type="date" defaultValue="2024-04-12" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="expFormat">Format</Label>
              <Select id="expFormat" defaultValue="csv">
                <option value="csv">CSV</option>
                <option value="xlsx">Excel (XLSX)</option>
              </Select>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium mb-2">Included Fields ({selectedExport?.fields})</div>
              <div className="text-xs text-gray-500">
                All standard fields will be included. Custom field selection available in advanced options.
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>Cancel</Button>
            <Button onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
