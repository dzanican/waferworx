"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Edit,
  Calendar,
  User,
  Building2,
  Cpu,
  MapPin,
  Clock,
  FileText,
  MessageSquare,
  Paperclip,
  AlertTriangle,
  CheckCircle,
  Package,
  Send,
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
  },
  technician: {
    name: "John Technician",
    email: "john@waferworx.demo",
    phone: "555-0101",
  },
  status: "In Progress",
  priority: "medium",
  entitlement: "Contract",
  visitPhase: "Initial Visit",
  plannedWeek: "WW15 2024",
  plannedStartDate: "2024-04-08",
  plannedEndDate: "2024-04-12",
  actualStartDate: "2024-04-08",
  actualEndDate: null,
  travelDays: 1,
  isReturnVisit: false,
  notes: "Customer requested morning start times. Contact Mike Engineer on arrival.",
};

const dailyUpdates = [
  {
    id: "update-3",
    date: "Apr 10, 2024",
    author: "John Technician",
    machineState: "Tool down for PM",
    workCompleted: "Completed chambers 1-2 PM. Found worn O-rings on chamber 2 load lock. Replaced O-rings and verified seal integrity.",
    nextSteps: "Continue with chambers 3-4 PM tomorrow. Run particle qualification after chamber work.",
    hoursWorked: 9,
    isPassDown: true,
  },
  {
    id: "update-2",
    date: "Apr 9, 2024",
    author: "John Technician",
    machineState: "Tool down for PM",
    workCompleted: "Started PM work. Initial tool inspection completed. All safeties verified. Began chamber 1 cleaning.",
    nextSteps: "Complete chamber 1-2 PM. Inspect RF generators.",
    hoursWorked: 8,
    isPassDown: false,
  },
  {
    id: "update-1",
    date: "Apr 8, 2024",
    author: "John Technician",
    machineState: "Tool operational",
    workCompleted: "Travel day. Arrived on-site. Met with customer contact Mike Engineer. Reviewed PM scope and schedule.",
    nextSteps: "Begin PM work tomorrow morning.",
    hoursWorked: 4,
    isPassDown: false,
  },
];

const comments = [
  { id: "c1", author: "Admin Manager", date: "Apr 7", content: "Customer confirmed schedule. Please arrive by 8am local time.", isInternal: true },
  { id: "c2", author: "John Technician", date: "Apr 8", content: "On-site and ready to begin. Customer contact is very helpful.", isInternal: true },
  { id: "c3", author: "Admin Manager", date: "Apr 10", content: "Good progress. Let me know if you need any parts expedited.", isInternal: true },
];

const attachments = [
  { id: "a1", name: "PM_Checklist_CVD3000.pdf", type: "pdf", size: "245 KB", uploadedBy: "John Technician", date: "Apr 8" },
  { id: "a2", name: "Chamber2_Oring_Photo.jpg", type: "image", size: "1.2 MB", uploadedBy: "John Technician", date: "Apr 10" },
  { id: "a3", name: "Initial_Particle_Count.xlsx", type: "excel", size: "45 KB", uploadedBy: "John Technician", date: "Apr 9" },
];

const parts = [
  { id: "p1", partNumber: "ORG-CVD-001", name: "Chamber O-Ring Kit", quantity: 2, status: "Used", serialRemoved: "N/A", serialInstalled: "N/A" },
  { id: "p2", partNumber: "FLT-RF-002", name: "RF Generator Filter", quantity: 1, status: "Pending", serialRemoved: null, serialInstalled: null },
];

const statusColors: Record<string, "default" | "success" | "warning" | "destructive"> = {
  "In Progress": "warning",
  "Open": "default",
  "On Hold": "destructive",
  "Completed": "success",
};

export default function JobDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("updates");
  const [newComment, setNewComment] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/management/jobs">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{jobData.jobNumber}</h2>
              <Badge variant={statusColors[jobData.status]}>{jobData.status}</Badge>
              <Badge variant="outline">{jobData.visitPhase}</Badge>
            </div>
            <p className="text-gray-500">{jobData.title}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/management/jobs/${params.id}/edit`}>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Job
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{jobData.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Priority</div>
                  <div className="font-medium capitalize">{jobData.priority}</div>
                </div>
                <div>
                  <div className="text-gray-500">Entitlement</div>
                  <div className="font-medium">{jobData.entitlement}</div>
                </div>
                <div>
                  <div className="text-gray-500">Travel Days</div>
                  <div className="font-medium">{jobData.travelDays}</div>
                </div>
                <div>
                  <div className="text-gray-500">Return Visit</div>
                  <div className="font-medium">{jobData.isReturnVisit ? "Yes" : "No"}</div>
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
              <TabsTrigger value="comments">
                <MessageSquare className="h-4 w-4 mr-2" />
                Comments
              </TabsTrigger>
              <TabsTrigger value="attachments">
                <Paperclip className="h-4 w-4 mr-2" />
                Attachments
              </TabsTrigger>
              <TabsTrigger value="parts">
                <Package className="h-4 w-4 mr-2" />
                Parts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="updates">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {dailyUpdates.map((update) => (
                      <div key={update.id} className="border-l-2 border-blue-200 pl-4 py-2">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{update.date}</span>
                            {update.isPassDown && (
                              <Badge variant="secondary" className="text-xs">Pass-Down</Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{update.hoursWorked}h worked</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-1">By {update.author}</div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Machine State:</span>{" "}
                            {update.machineState}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Work Completed:</span>{" "}
                            {update.workCompleted}
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Next Steps:</span>{" "}
                            {update.nextSteps}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comments">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4 mb-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={2}
                      className="flex-1"
                    />
                    <Button size="icon" className="self-end">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attachments">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {attachments.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Paperclip className="h-4 w-4 text-gray-400" />
                          <div>
                            <div className="font-medium text-sm">{file.name}</div>
                            <div className="text-xs text-gray-500">{file.size} • {file.uploadedBy} • {file.date}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Paperclip className="h-4 w-4 mr-2" />
                    Upload Attachment
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="parts">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {parts.map((part) => (
                      <div key={part.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{part.name}</div>
                          <div className="text-xs text-gray-500">{part.partNumber} • Qty: {part.quantity}</div>
                        </div>
                        <Badge variant={part.status === "Used" ? "success" : "warning"}>
                          {part.status}
                        </Badge>
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
          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-gray-500">Planned Week</div>
                <div className="font-medium">{jobData.plannedWeek}</div>
              </div>
              <div>
                <div className="text-gray-500">Planned Dates</div>
                <div className="font-medium">{jobData.plannedStartDate} to {jobData.plannedEndDate}</div>
              </div>
              <div>
                <div className="text-gray-500">Actual Start</div>
                <div className="font-medium">{jobData.actualStartDate || "Not started"}</div>
              </div>
            </CardContent>
          </Card>

          {/* Technician */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" />
                Technician
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="font-medium">{jobData.technician.name}</div>
              <div className="text-gray-500">{jobData.technician.email}</div>
              <div className="text-gray-500">{jobData.technician.phone}</div>
            </CardContent>
          </Card>

          {/* Customer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-4 w-4" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="font-medium">{jobData.customer.name}</div>
              <div className="text-gray-500">{jobData.customer.accountNumber}</div>
            </CardContent>
          </Card>

          {/* Site */}
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
            </CardContent>
          </Card>

          {/* Tool */}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
