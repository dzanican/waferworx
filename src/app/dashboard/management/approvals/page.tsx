"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  FileCheck,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  User,
  Calendar,
  Building2,
} from "lucide-react";

interface Timesheet {
  id: string;
  technician: string;
  jobNumber: string;
  customer: string;
  week: string;
  totalHours: number;
  billableHours: number;
  submittedAt: string;
}

interface CSR {
  id: string;
  number: string;
  technician: string;
  jobNumber: string;
  customer: string;
  tool: string;
  visitDates: string;
  submittedAt: string;
}

interface ProcessedItem {
  id: string;
  type: string;
  number: string;
  technician: string;
  status: string;
  processedAt: string;
}

const initialTimesheets: Timesheet[] = [
  {
    id: "ts-1",
    technician: "John Technician",
    jobNumber: "JOB-2024-0001",
    customer: "Acme Semiconductor",
    week: "WW15 2024",
    totalHours: 37,
    billableHours: 33,
    submittedAt: "Apr 12, 2024",
  },
  {
    id: "ts-2",
    technician: "Sarah Engineer",
    jobNumber: "JOB-2024-0002",
    customer: "TechFab Inc",
    week: "WW15 2024",
    totalHours: 24,
    billableHours: 24,
    submittedAt: "Apr 12, 2024",
  },
];

const initialCSRs: CSR[] = [
  {
    id: "csr-1",
    number: "CSR-2024-0015",
    technician: "John Technician",
    jobNumber: "JOB-2024-0001",
    customer: "Acme Semiconductor",
    tool: "CVD-3000X",
    visitDates: "Apr 8-12, 2024",
    submittedAt: "Apr 12, 2024",
  },
];

const initialProcessed: ProcessedItem[] = [
  {
    id: "proc-1",
    type: "CSR",
    number: "CSR-2024-0012",
    technician: "John Technician",
    status: "approved",
    processedAt: "Apr 5, 2024",
  },
  {
    id: "proc-2",
    type: "Timesheet",
    number: "WW14 2024",
    technician: "Mike Smith",
    status: "approved",
    processedAt: "Apr 5, 2024",
  },
  {
    id: "proc-3",
    type: "CSR",
    number: "CSR-2024-0010",
    technician: "Sarah Engineer",
    status: "rejected",
    processedAt: "Apr 3, 2024",
  },
];

export default function ApprovalsPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("timesheets");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [pendingTimesheets, setPendingTimesheets] = useState<Timesheet[]>(initialTimesheets);
  const [pendingCSRs, setPendingCSRs] = useState<CSR[]>(initialCSRs);
  const [recentlyProcessed, setRecentlyProcessed] = useState<ProcessedItem[]>(initialProcessed);

  const handleApproveTimesheet = (sheet: Timesheet) => {
    setPendingTimesheets((prev) => prev.filter((t) => t.id !== sheet.id));
    setRecentlyProcessed((prev) => [
      {
        id: `proc-${Date.now()}`,
        type: "Timesheet",
        number: sheet.week,
        technician: sheet.technician,
        status: "approved",
        processedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      },
      ...prev,
    ]);
    addToast(`Timesheet for ${sheet.technician} approved`, "success");
  };

  const handleApproveCSR = (csr: CSR) => {
    setPendingCSRs((prev) => prev.filter((c) => c.id !== csr.id));
    setRecentlyProcessed((prev) => [
      {
        id: `proc-${Date.now()}`,
        type: "CSR",
        number: csr.number,
        technician: csr.technician,
        status: "approved",
        processedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      },
      ...prev,
    ]);
    addToast(`${csr.number} approved`, "success");
  };

  const handleReject = () => {
    if (!selectedItem) return;
    
    const timesheet = pendingTimesheets.find((t) => t.id === selectedItem);
    const csr = pendingCSRs.find((c) => c.id === selectedItem);
    
    if (timesheet) {
      setPendingTimesheets((prev) => prev.filter((t) => t.id !== selectedItem));
      setRecentlyProcessed((prev) => [
        {
          id: `proc-${Date.now()}`,
          type: "Timesheet",
          number: timesheet.week,
          technician: timesheet.technician,
          status: "rejected",
          processedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        },
        ...prev,
      ]);
      addToast(`Timesheet rejected`, "warning");
    } else if (csr) {
      setPendingCSRs((prev) => prev.filter((c) => c.id !== selectedItem));
      setRecentlyProcessed((prev) => [
        {
          id: `proc-${Date.now()}`,
          type: "CSR",
          number: csr.number,
          technician: csr.technician,
          status: "rejected",
          processedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        },
        ...prev,
      ]);
      addToast(`${csr.number} rejected`, "warning");
    }
    
    setShowRejectDialog(false);
    setRejectReason("");
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Approvals</h2>
        <p className="text-gray-500">Review and approve timesheets and service reports</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{pendingTimesheets.length}</div>
                <div className="text-sm text-gray-500">Pending Timesheets</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{pendingCSRs.length}</div>
                <div className="text-sm text-gray-500">Pending CSRs</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{recentlyProcessed.length}</div>
                <div className="text-sm text-gray-500">Processed This Week</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="timesheets">
            <Clock className="h-4 w-4 mr-2" />
            Timesheets ({pendingTimesheets.length})
          </TabsTrigger>
          <TabsTrigger value="csrs">
            <FileText className="h-4 w-4 mr-2" />
            Service Reports ({pendingCSRs.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            <FileCheck className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timesheets">
          <Card>
            <CardHeader>
              <CardTitle>Pending Utilization Sheets</CardTitle>
              <CardDescription>Review and approve technician time entries</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingTimesheets.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No pending timesheets
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingTimesheets.map((sheet) => (
                    <div key={sheet.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{sheet.technician}</span>
                            <Badge variant="secondary">{sheet.week}</Badge>
                          </div>
                          <div className="text-sm text-gray-500">
                            {sheet.jobNumber} • {sheet.customer}
                          </div>
                          <div className="flex gap-4 text-sm">
                            <span>Total: <strong>{sheet.totalHours}h</strong></span>
                            <span>Billable: <strong>{sheet.billableHours}h</strong></span>
                          </div>
                          <div className="text-xs text-gray-400">
                            Submitted {sheet.submittedAt}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => {
                              setSelectedItem(sheet.id);
                              setShowRejectDialog(true);
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm" onClick={() => handleApproveTimesheet(sheet)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="csrs">
          <Card>
            <CardHeader>
              <CardTitle>Pending Customer Service Reports</CardTitle>
              <CardDescription>Review and approve service documentation</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingCSRs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No pending service reports
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingCSRs.map((csr) => (
                    <div key={csr.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{csr.number}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {csr.technician}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {csr.customer}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {csr.jobNumber} • {csr.tool} • {csr.visitDates}
                          </div>
                          <div className="text-xs text-gray-400">
                            Submitted {csr.submittedAt}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => {
                              setSelectedItem(csr.id);
                              setShowRejectDialog(true);
                            }}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm" onClick={() => handleApproveCSR(csr)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recently Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentlyProcessed.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {item.status === "approved" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <div className="font-medium">{item.type}: {item.number}</div>
                        <div className="text-sm text-gray-500">{item.technician}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={item.status === "approved" ? "success" : "destructive"}>
                        {item.status}
                      </Badge>
                      <div className="text-xs text-gray-400 mt-1">{item.processedAt}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent onClose={() => setShowRejectDialog(false)}>
          <DialogHeader>
            <DialogTitle>Reject Submission</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejection. This will be sent to the technician.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
