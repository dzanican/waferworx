"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { useToast } from "@/components/ui/toast";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Cpu,
  Building2,
  User,
  Phone,
  Mail,
  FileText,
  MessageSquare,
  Paperclip,
  Package,
  AlertTriangle,
  Clock,
  Plus,
  Send,
  CheckCircle,
  Upload,
  BookOpen,
  ClipboardList,
} from "lucide-react";

// Demo job data
const jobData = {
  id: "job-1",
  jobNumber: "JOB-2024-0001",
  title: "CVD-3000 Annual PM",
  description: "Perform annual preventive maintenance on CVD Tool 1. Include chamber cleaning, RF generator inspection, and full system qualification.",
  customer: {
    name: "Acme Semiconductor",
    accountNumber: "ACME-001",
  },
  site: {
    name: "Fab 1 - Austin",
    address: "1234 Silicon Way, Austin, TX 78701",
    accessRestrictions: "Cleanroom access required. Badge at security.",
    safetyRequirements: "Safety glasses and ESD protection required.",
  },
  tool: {
    name: "CVD Tool 1",
    model: "CVD-3000X",
    serialNumber: "CVD3K-2024-001",
    softwareVersion: "v3.2.1",
    platform: "CVD-3000",
  },
  contact: {
    name: "Mike Engineer",
    role: "Process Engineer",
    email: "mike.engineer@acmesemi.demo",
    phone: "555-0200",
  },
  status: "In Progress",
  priority: "medium",
  entitlement: "Contract",
  visitPhase: "Initial Visit",
  plannedWeek: "WW15 2024",
  plannedStartDate: "Apr 8, 2024",
  plannedEndDate: "Apr 12, 2024",
  currentDay: 3,
  totalDays: 5,
};

interface DailyUpdate {
  id: string;
  date: string;
  machineState: string;
  workCompleted: string;
  openRisks: string;
  nextSteps: string;
  partsNeeded: string;
  hoursWorked: number;
  isPassDown: boolean;
}

const initialDailyUpdates: DailyUpdate[] = [
  {
    id: "update-3",
    date: "Apr 10, 2024",
    machineState: "Tool down for PM",
    workCompleted: "Completed chambers 1-2 PM. Found worn O-rings on chamber 2 load lock. Replaced O-rings and verified seal integrity.",
    openRisks: "Chamber 3 showing elevated particle counts - may need additional cleaning.",
    nextSteps: "Continue with chambers 3-4 PM tomorrow. Run particle qualification after chamber work.",
    partsNeeded: "May need additional O-ring kit for chamber 3",
    hoursWorked: 9,
    isPassDown: true,
  },
  {
    id: "update-2",
    date: "Apr 9, 2024",
    machineState: "Tool down for PM",
    workCompleted: "Started PM work. Initial tool inspection completed. All safeties verified. Began chamber 1 cleaning.",
    openRisks: "None identified",
    nextSteps: "Complete chamber 1-2 PM. Inspect RF generators.",
    partsNeeded: "None",
    hoursWorked: 8,
    isPassDown: false,
  },
  {
    id: "update-1",
    date: "Apr 8, 2024",
    machineState: "Tool operational",
    workCompleted: "Travel day. Arrived on-site. Met with customer contact Mike Engineer. Reviewed PM scope and schedule.",
    openRisks: "None",
    nextSteps: "Begin PM work tomorrow morning.",
    partsNeeded: "None",
    hoursWorked: 4,
    isPassDown: false,
  },
];

const checklists = [
  { id: "cl-1", name: "CVD-3000 Annual PM Checklist", status: "in_progress", progress: 65 },
  { id: "cl-2", name: "Safety Verification", status: "completed", progress: 100 },
];

const manuals = [
  { id: "m-1", name: "CVD-3000 Service Manual", version: "v3.2" },
  { id: "m-2", name: "CVD-3000 PM Procedures", version: "v2.1" },
  { id: "m-3", name: "RF Generator Maintenance Guide", version: "v1.5" },
];

export default function TechnicianJobDetailPage() {
  const params = useParams();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("updates");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [dailyUpdates, setDailyUpdates] = useState<DailyUpdate[]>(initialDailyUpdates);
  const [newUpdate, setNewUpdate] = useState({
    machineState: "",
    workCompleted: "",
    openRisks: "",
    nextSteps: "",
    partsNeeded: "",
    hoursWorked: "",
    isPassDown: false,
  });

  const handleSubmitUpdate = () => {
    if (!newUpdate.machineState || !newUpdate.workCompleted || !newUpdate.hoursWorked) {
      addToast("Please fill in required fields", "error");
      return;
    }
    
    const update: DailyUpdate = {
      id: `update-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      machineState: newUpdate.machineState,
      workCompleted: newUpdate.workCompleted,
      openRisks: newUpdate.openRisks || "None",
      nextSteps: newUpdate.nextSteps,
      partsNeeded: newUpdate.partsNeeded || "None",
      hoursWorked: parseFloat(newUpdate.hoursWorked) || 0,
      isPassDown: newUpdate.isPassDown,
    };
    
    setDailyUpdates((prev) => [update, ...prev]);
    addToast("Daily update added successfully", "success");
    setShowUpdateDialog(false);
    setNewUpdate({
      machineState: "",
      workCompleted: "",
      openRisks: "",
      nextSteps: "",
      partsNeeded: "",
      hoursWorked: "",
      isPassDown: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/technician/jobs">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{jobData.jobNumber}</h2>
              <Badge variant="warning">{jobData.status}</Badge>
              <Badge variant="outline">{jobData.visitPhase}</Badge>
            </div>
            <p className="text-gray-500">{jobData.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowUpdateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Daily Update
          </Button>
          <Link href={`/dashboard/technician/jobs/${params.id}/timesheet`}>
            <Button variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Log Time
            </Button>
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Day {jobData.currentDay} of {jobData.totalDays}</span>
            <span className="text-sm text-gray-500">{jobData.plannedStartDate} - {jobData.plannedEndDate}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(jobData.currentDay / jobData.totalDays) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{jobData.description}</p>
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div>
                  <div className="text-gray-500">Priority</div>
                  <div className="font-medium capitalize">{jobData.priority}</div>
                </div>
                <div>
                  <div className="text-gray-500">Entitlement</div>
                  <div className="font-medium">{jobData.entitlement}</div>
                </div>
                <div>
                  <div className="text-gray-500">Work Week</div>
                  <div className="font-medium">{jobData.plannedWeek}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="updates">
                <FileText className="h-4 w-4 mr-2" />
                Daily Updates
              </TabsTrigger>
              <TabsTrigger value="checklists">
                <ClipboardList className="h-4 w-4 mr-2" />
                Checklists
              </TabsTrigger>
              <TabsTrigger value="attachments">
                <Paperclip className="h-4 w-4 mr-2" />
                Files
              </TabsTrigger>
              <TabsTrigger value="parts">
                <Package className="h-4 w-4 mr-2" />
                Parts
              </TabsTrigger>
              <TabsTrigger value="manuals">
                <BookOpen className="h-4 w-4 mr-2" />
                Manuals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="updates">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {dailyUpdates.map((update) => (
                      <div key={update.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{update.date}</span>
                            {update.isPassDown && (
                              <Badge variant="secondary">Pass-Down</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            {update.hoursWorked}h
                          </div>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div>
                            <div className="font-medium text-gray-700">Machine State</div>
                            <div className="text-gray-600">{update.machineState}</div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-700">Work Completed</div>
                            <div className="text-gray-600">{update.workCompleted}</div>
                          </div>
                          {update.openRisks && update.openRisks !== "None" && update.openRisks !== "None identified" && (
                            <div className="p-2 bg-yellow-50 rounded">
                              <div className="font-medium text-yellow-800 flex items-center gap-1">
                                <AlertTriangle className="h-4 w-4" />
                                Open Risks
                              </div>
                              <div className="text-yellow-700">{update.openRisks}</div>
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-700">Next Steps</div>
                            <div className="text-gray-600">{update.nextSteps}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="checklists">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {checklists.map((checklist) => (
                      <div key={checklist.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {checklist.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <ClipboardList className="h-5 w-5 text-blue-500" />
                          )}
                          <div>
                            <div className="font-medium">{checklist.name}</div>
                            <div className="text-sm text-gray-500">{checklist.progress}% complete</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {checklist.status === "completed" ? "View" : "Continue"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attachments">
              <Card>
                <CardContent className="p-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Drag and drop files here, or click to browse</p>
                    <p className="text-sm text-gray-500 mt-1">Photos, PDFs, documents up to 10MB</p>
                    <Button variant="outline" className="mt-4">
                      <Paperclip className="h-4 w-4 mr-2" />
                      Upload Files
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="parts">
              <Card>
                <CardContent className="p-4">
                  <Button variant="outline" className="mb-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Part Used
                  </Button>
                  <div className="text-center py-8 text-gray-500">
                    No parts recorded yet
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manuals">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {manuals.map((manual) => (
                      <div key={manual.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-5 w-5 text-blue-500" />
                          <div>
                            <div className="font-medium">{manual.name}</div>
                            <div className="text-sm text-gray-500">{manual.version}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Open</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => setShowUpdateDialog(true)}>
                <FileText className="h-4 w-4 mr-2" />
                Add Daily Update
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Create Escalation
              </Button>
              <Link href={`/dashboard/technician/jobs/${params.id}/csr`} className="block">
                <Button variant="outline" className="w-full justify-start">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Complete CSR
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Customer Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" />
                Customer Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="font-medium">{jobData.contact.name}</div>
              <div className="text-gray-500">{jobData.contact.role}</div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                {jobData.contact.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                {jobData.contact.phone}
              </div>
            </CardContent>
          </Card>

          {/* Site Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4" />
                Site
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="font-medium">{jobData.site.name}</div>
              <div className="text-gray-500">{jobData.site.address}</div>
              {jobData.site.accessRestrictions && (
                <div className="mt-2 p-2 bg-yellow-50 rounded text-xs">
                  <div className="font-medium text-yellow-800">Access:</div>
                  <div className="text-yellow-700">{jobData.site.accessRestrictions}</div>
                </div>
              )}
              {jobData.site.safetyRequirements && (
                <div className="p-2 bg-red-50 rounded text-xs">
                  <div className="font-medium text-red-800">Safety:</div>
                  <div className="text-red-700">{jobData.site.safetyRequirements}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tool Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Cpu className="h-4 w-4" />
                Tool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="font-medium">{jobData.tool.name}</div>
              <div className="text-gray-500">{jobData.tool.model}</div>
              <div className="text-gray-500">S/N: {jobData.tool.serialNumber}</div>
              <div className="text-gray-500">SW: {jobData.tool.softwareVersion}</div>
              <Link href={`/dashboard/technician/tools/${jobData.tool.serialNumber}`}>
                <Button variant="link" className="p-0 h-auto text-sm">
                  View Tool History →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Daily Update Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent className="max-w-2xl" onClose={() => setShowUpdateDialog(false)}>
          <DialogHeader>
            <DialogTitle>Add Daily Update</DialogTitle>
            <DialogDescription>
              Record your progress for today. This will be visible to management.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="machineState">Machine State</Label>
                <Select
                  id="machineState"
                  value={newUpdate.machineState}
                  onChange={(e) => setNewUpdate({ ...newUpdate, machineState: e.target.value })}
                >
                  <option value="">Select state...</option>
                  <option value="Tool operational">Tool operational</option>
                  <option value="Tool down for PM">Tool down for PM</option>
                  <option value="Tool down - repair">Tool down - repair</option>
                  <option value="Tool in qualification">Tool in qualification</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hoursWorked">Hours Worked</Label>
                <Input
                  id="hoursWorked"
                  type="number"
                  min="0"
                  max="24"
                  value={newUpdate.hoursWorked}
                  onChange={(e) => setNewUpdate({ ...newUpdate, hoursWorked: e.target.value })}
                  placeholder="8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="workCompleted">Work Completed *</Label>
              <Textarea
                id="workCompleted"
                value={newUpdate.workCompleted}
                onChange={(e) => setNewUpdate({ ...newUpdate, workCompleted: e.target.value })}
                placeholder="Describe the work completed today..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="openRisks">Open Risks / Issues</Label>
              <Textarea
                id="openRisks"
                value={newUpdate.openRisks}
                onChange={(e) => setNewUpdate({ ...newUpdate, openRisks: e.target.value })}
                placeholder="Any risks or issues identified..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextSteps">Next Steps *</Label>
              <Textarea
                id="nextSteps"
                value={newUpdate.nextSteps}
                onChange={(e) => setNewUpdate({ ...newUpdate, nextSteps: e.target.value })}
                placeholder="What needs to be done next..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partsNeeded">Parts / Tools Needed</Label>
              <Input
                id="partsNeeded"
                value={newUpdate.partsNeeded}
                onChange={(e) => setNewUpdate({ ...newUpdate, partsNeeded: e.target.value })}
                placeholder="Any parts or tools needed..."
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPassDown"
                checked={newUpdate.isPassDown}
                onChange={(e) => setNewUpdate({ ...newUpdate, isPassDown: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="isPassDown" className="font-normal">
                Mark as Pass-Down (visible to customer)
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitUpdate}>
              <Send className="h-4 w-4 mr-2" />
              Submit Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
