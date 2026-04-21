"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Calendar,
  Plus,
  Settings,
  Clock,
  Cpu,
  Building2,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  FileText,
} from "lucide-react";

const pmTemplates = [
  {
    id: "tpl-1",
    name: "CVD-3000 Annual PM",
    platform: "CVD-3000",
    frequency: "Annual",
    estimatedDays: 5,
    checklistId: "cl-annual",
    description: "Full annual preventive maintenance including all chambers, RF systems, and vacuum systems.",
  },
  {
    id: "tpl-2",
    name: "CVD-3000 Quarterly PM",
    platform: "CVD-3000",
    frequency: "Quarterly",
    estimatedDays: 2,
    checklistId: "cl-quarterly",
    description: "Quarterly maintenance focusing on chamber cleaning and basic system checks.",
  },
  {
    id: "tpl-3",
    name: "ETCH-2000 Semi-Annual PM",
    platform: "ETCH-2000",
    frequency: "Semi-Annual",
    estimatedDays: 3,
    checklistId: "cl-semiannual",
    description: "Semi-annual maintenance for etch systems.",
  },
  {
    id: "tpl-4",
    name: "PVD-1500 Quarterly PM",
    platform: "PVD-1500",
    frequency: "Quarterly",
    estimatedDays: 2,
    checklistId: "cl-pvd-quarterly",
    description: "Quarterly maintenance for PVD systems.",
  },
];

const scheduledPMs = [
  {
    id: "pm-1",
    tool: "CVD Tool 1",
    toolSerial: "CVD3K-2024-001",
    customer: "Acme Semiconductor",
    site: "Fab 1 - Austin",
    template: "CVD-3000 Annual PM",
    dueDate: "Jul 2024",
    dueWeek: "WW28",
    status: "scheduled",
    assignedTech: "John Technician",
    lastPM: "Jan 2024",
  },
  {
    id: "pm-2",
    tool: "CVD Tool 2",
    toolSerial: "CVD3K-2023-002",
    customer: "Acme Semiconductor",
    site: "Fab 1 - Austin",
    template: "CVD-3000 Quarterly PM",
    dueDate: "May 2024",
    dueWeek: "WW19",
    status: "due_soon",
    assignedTech: "Sarah Engineer",
    lastPM: "Feb 2024",
  },
  {
    id: "pm-3",
    tool: "Etch Tool 1",
    toolSerial: "ETCH-2023-001",
    customer: "TechFab Inc",
    site: "Main Fab",
    template: "ETCH-2000 Semi-Annual PM",
    dueDate: "May 2024",
    dueWeek: "WW20",
    status: "due_soon",
    assignedTech: null,
    lastPM: "Nov 2023",
  },
  {
    id: "pm-4",
    tool: "PVD Tool 1",
    toolSerial: "PVD-2022-001",
    customer: "Silicon Valley Chips",
    site: "Fab 2",
    template: "PVD-1500 Quarterly PM",
    dueDate: "Apr 2024",
    dueWeek: "WW17",
    status: "overdue",
    assignedTech: null,
    lastPM: "Jan 2024",
  },
];

const pmHistory = [
  {
    id: "pmh-1",
    tool: "CVD Tool 1",
    template: "CVD-3000 Annual PM",
    completedDate: "Jan 15, 2024",
    technician: "Mike Smith",
    jobNumber: "JOB-2024-0001",
    result: "completed",
  },
  {
    id: "pmh-2",
    tool: "CVD Tool 2",
    template: "CVD-3000 Quarterly PM",
    completedDate: "Feb 10, 2024",
    technician: "John Technician",
    jobNumber: "JOB-2024-0002",
    result: "completed",
  },
];

const statusColors: Record<string, "success" | "warning" | "destructive" | "default"> = {
  scheduled: "default",
  due_soon: "warning",
  overdue: "destructive",
  completed: "success",
};

const statusLabels: Record<string, string> = {
  scheduled: "Scheduled",
  due_soon: "Due Soon",
  overdue: "Overdue",
  completed: "Completed",
};

export default function PMSchedulePage() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  const overduePMs = scheduledPMs.filter((pm) => pm.status === "overdue");
  const dueSoonPMs = scheduledPMs.filter((pm) => pm.status === "due_soon");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">PM Schedule</h2>
          <p className="text-gray-500">Manage preventive maintenance schedules</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowTemplateDialog(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Templates
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Schedule PM
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {(overduePMs.length > 0 || dueSoonPMs.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {overduePMs.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="font-medium text-red-900">Overdue PMs</div>
                    <div className="text-sm text-red-700">{overduePMs.length} PM(s) past due date</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {dueSoonPMs.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <div>
                    <div className="font-medium text-yellow-900">Due Soon</div>
                    <div className="text-sm text-yellow-700">{dueSoonPMs.length} PM(s) due within 30 days</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="history">
            <CheckCircle className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming PMs</CardTitle>
              <CardDescription>All scheduled preventive maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledPMs.map((pm) => (
                  <div
                    key={pm.id}
                    className={`border rounded-lg p-4 ${
                      pm.status === "overdue" ? "border-red-200 bg-red-50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{pm.tool}</span>
                          <Badge variant={statusColors[pm.status]}>{statusLabels[pm.status]}</Badge>
                        </div>
                        <div className="text-sm text-gray-600">{pm.template}</div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {pm.customer}
                          </span>
                          <span>•</span>
                          <span>{pm.site}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Last PM: {pm.lastPM}
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="font-medium">{pm.dueWeek}</div>
                        <div className="text-sm text-gray-500">{pm.dueDate}</div>
                        {pm.assignedTech ? (
                          <Badge variant="outline">{pm.assignedTech}</Badge>
                        ) : (
                          <Badge variant="secondary">Unassigned</Badge>
                        )}
                        <div className="pt-2">
                          <Button size="sm">Create Job</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>PM Calendar</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium px-4">Q2 2024</span>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {["April", "May", "June"].map((month) => (
                  <div key={month} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{month} 2024</h4>
                    <div className="space-y-2">
                      {scheduledPMs
                        .filter((pm) => pm.dueDate.includes(month.slice(0, 3)))
                        .map((pm) => (
                          <div
                            key={pm.id}
                            className={`p-2 rounded text-sm ${
                              pm.status === "overdue"
                                ? "bg-red-100 text-red-800"
                                : pm.status === "due_soon"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            <div className="font-medium">{pm.tool}</div>
                            <div className="text-xs">{pm.template}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>PM History</CardTitle>
              <CardDescription>Completed preventive maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pmHistory.map((pm) => (
                  <div key={pm.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-medium">{pm.tool}</div>
                        <div className="text-sm text-gray-500">{pm.template}</div>
                        <div className="text-sm text-gray-500">{pm.technician} • {pm.jobNumber}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{pm.completedDate}</div>
                      <Button variant="link" size="sm" className="h-auto p-0">
                        View Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Schedule PM Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-lg" onClose={() => setShowCreateDialog(false)}>
          <DialogHeader>
            <DialogTitle>Schedule PM</DialogTitle>
            <DialogDescription>Create a new preventive maintenance schedule</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tool">Tool</Label>
              <Select id="tool">
                <option value="">Select tool...</option>
                <option value="tool-1">CVD Tool 1 (CVD3K-2024-001)</option>
                <option value="tool-2">CVD Tool 2 (CVD3K-2023-002)</option>
                <option value="tool-3">Etch Tool 1 (ETCH-2023-001)</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="template">PM Template</Label>
              <Select id="template">
                <option value="">Select template...</option>
                {pmTemplates.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.name} ({tpl.frequency})
                  </option>
                ))}
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueYear">Year</Label>
                <Select id="dueYear" defaultValue="2024">
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueWeek">Work Week</Label>
                <Input id="dueWeek" type="number" min="1" max="52" placeholder="WW#" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="technician">Assign Technician</Label>
              <Select id="technician">
                <option value="">Unassigned</option>
                <option value="tech-1">John Technician</option>
                <option value="tech-2">Sarah Engineer</option>
                <option value="tech-3">Mike Smith</option>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="recurring" className="rounded" />
              <Label htmlFor="recurring" className="font-normal">
                Auto-schedule next occurrence
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowCreateDialog(false)}>Schedule PM</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Templates Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="max-w-2xl" onClose={() => setShowTemplateDialog(false)}>
          <DialogHeader>
            <DialogTitle>PM Templates</DialogTitle>
            <DialogDescription>Manage preventive maintenance templates</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-3">
              {pmTemplates.map((tpl) => (
                <div key={tpl.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{tpl.name}</span>
                        <Badge variant="outline">{tpl.frequency}</Badge>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{tpl.platform}</div>
                      <div className="text-sm text-gray-600 mt-2">{tpl.description}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Est. {tpl.estimatedDays} days
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>Close</Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
