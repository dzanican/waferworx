"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Cpu,
  Shield,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Wrench,
  Download,
  History,
  Settings,
} from "lucide-react";

// Demo tool data
const toolData = {
  id: "tool-1",
  serialNumber: "CVD3K-2024-001",
  name: "CVD Tool 1",
  model: "CVD-3000X",
  platform: "CVD-3000",
  status: "Under Service",
  softwareVersion: "v3.2.1",
  installDate: "Jan 15, 2024",
  chamberDetails: "4-chamber configuration",
  installedOptions: "Auto-clean, Remote monitoring",
  warranty: {
    status: "Active",
    type: "Standard",
    startDate: "Jan 15, 2024",
    endDate: "Jan 15, 2025",
    coveredSystems: "All systems",
    exclusions: "Consumables, customer damage",
  },
  contract: {
    type: "Full Service",
    number: "SC-2024-001",
    startDate: "Jan 15, 2024",
    endDate: "Jan 15, 2026",
    responseSLA: "24 hours",
    includesParts: true,
    includesLabor: true,
    includesTravel: true,
  },
};

const serviceTimeline = [
  {
    id: "event-1",
    date: "Apr 8-12, 2024",
    type: "PM",
    title: "Annual Preventive Maintenance",
    status: "In Progress",
    technician: "John Technician",
    jobNumber: "JOB-2024-0001",
    summary: "Annual PM in progress. Chambers 1-2 completed.",
    hasCSR: false,
  },
  {
    id: "event-2",
    date: "Mar 15, 2024",
    type: "Repair",
    title: "RF Generator Replacement",
    status: "Completed",
    technician: "Sarah Engineer",
    jobNumber: "JOB-2024-0004",
    summary: "Replaced RF generator due to intermittent power fluctuations. Tool qualified and released to production.",
    hasCSR: true,
  },
  {
    id: "event-3",
    date: "Feb 10, 2024",
    type: "PM",
    title: "Quarterly PM",
    status: "Completed",
    technician: "John Technician",
    jobNumber: "JOB-2024-0002",
    summary: "Quarterly PM completed. All chambers cleaned and qualified. No issues found.",
    hasCSR: true,
  },
  {
    id: "event-4",
    date: "Jan 15, 2024",
    type: "Installation",
    title: "Tool Installation",
    status: "Completed",
    technician: "Mike Smith",
    jobNumber: "JOB-2024-0001",
    summary: "New tool installation completed. All systems verified and qualified.",
    hasCSR: true,
  },
];

const passDowns = [
  {
    id: "pd-1",
    date: "Apr 10, 2024",
    author: "John Technician",
    machineState: "Tool down for PM",
    summary: "Completed chambers 1-2 PM. Found worn O-rings on chamber 2 load lock - replaced. Chamber 3 showing elevated particle counts.",
    nextSteps: "Continue with chambers 3-4 PM. Run particle qualification.",
  },
  {
    id: "pd-2",
    date: "Mar 15, 2024",
    author: "Sarah Engineer",
    machineState: "Tool operational",
    summary: "RF generator replacement complete. Tool qualified and released to production.",
    nextSteps: "Monitor for any power fluctuations over next 48 hours.",
  },
];

const reports = [
  { id: "csr-1", number: "CSR-2024-0012", date: "Mar 15, 2024", type: "Repair", title: "RF Generator Replacement" },
  { id: "csr-2", number: "CSR-2024-0008", date: "Feb 10, 2024", type: "PM", title: "Quarterly PM" },
  { id: "csr-3", number: "CSR-2024-0001", date: "Jan 15, 2024", type: "Installation", title: "Tool Installation" },
];

const typeColors: Record<string, string> = {
  "PM": "bg-blue-100 text-blue-800",
  "Repair": "bg-orange-100 text-orange-800",
  "Installation": "bg-green-100 text-green-800",
  "Upgrade": "bg-purple-100 text-purple-800",
};

const statusColors: Record<string, "success" | "warning" | "default"> = {
  "Completed": "success",
  "In Progress": "warning",
};

export default function CustomerToolDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("timeline");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/customer/tools">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-lg bg-purple-100 flex items-center justify-center">
              <Cpu className="h-7 w-7 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{toolData.name}</h2>
              <p className="text-gray-500">{toolData.model} • {toolData.serialNumber}</p>
            </div>
          </div>
        </div>
        <Badge variant="warning" className="text-sm">{toolData.status}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="timeline">
                <History className="h-4 w-4 mr-2" />
                Service Timeline
              </TabsTrigger>
              <TabsTrigger value="passdowns">
                <FileText className="h-4 w-4 mr-2" />
                Pass-Downs
              </TabsTrigger>
              <TabsTrigger value="reports">
                <Download className="h-4 w-4 mr-2" />
                Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Service History</CardTitle>
                  <CardDescription>Complete service timeline for this tool</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                    <div className="space-y-6">
                      {serviceTimeline.map((event, index) => (
                        <div key={event.id} className="relative pl-10">
                          <div className={`absolute left-2 w-5 h-5 rounded-full flex items-center justify-center ${
                            event.status === "Completed" ? "bg-green-100" : "bg-yellow-100"
                          }`}>
                            {event.status === "Completed" ? (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            ) : (
                              <Clock className="h-3 w-3 text-yellow-600" />
                            )}
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColors[event.type]}`}>
                                  {event.type}
                                </span>
                                <Badge variant={statusColors[event.status]}>{event.status}</Badge>
                              </div>
                              <span className="text-sm text-gray-500">{event.date}</span>
                            </div>
                            <div className="font-medium text-gray-900 mb-1">{event.title}</div>
                            <div className="text-sm text-gray-500 mb-2">{event.jobNumber} • {event.technician}</div>
                            <p className="text-sm text-gray-700">{event.summary}</p>
                            {event.hasCSR && (
                              <Button variant="link" className="p-0 h-auto text-sm mt-2">
                                View Service Report →
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="passdowns">
              <Card>
                <CardHeader>
                  <CardTitle>Pass-Down Notes</CardTitle>
                  <CardDescription>Technician handoff notes and status updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {passDowns.map((passDown) => (
                      <div key={passDown.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{passDown.date}</span>
                          </div>
                          <span className="text-sm text-gray-500">By {passDown.author}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Machine State:</span>{" "}
                            <span className="text-gray-600">{passDown.machineState}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Summary:</span>{" "}
                            <span className="text-gray-600">{passDown.summary}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Next Steps:</span>{" "}
                            <span className="text-gray-600">{passDown.nextSteps}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Service Reports</CardTitle>
                  <CardDescription>Download completed service documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {reports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <div className="font-medium">{report.number}</div>
                            <div className="text-sm text-gray-500">{report.title} • {report.date}</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
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
          {/* Tool Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Settings className="h-4 w-4" />
                Tool Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-gray-500">Platform</div>
                <div className="font-medium">{toolData.platform}</div>
              </div>
              <div>
                <div className="text-gray-500">Software Version</div>
                <div className="font-medium">{toolData.softwareVersion}</div>
              </div>
              <div>
                <div className="text-gray-500">Install Date</div>
                <div className="font-medium">{toolData.installDate}</div>
              </div>
              <div>
                <div className="text-gray-500">Configuration</div>
                <div className="font-medium">{toolData.chamberDetails}</div>
              </div>
              <div>
                <div className="text-gray-500">Options</div>
                <div className="font-medium">{toolData.installedOptions}</div>
              </div>
            </CardContent>
          </Card>

          {/* Warranty */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4" />
                Warranty
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Status</span>
                <Badge variant="success">{toolData.warranty.status}</Badge>
              </div>
              <div>
                <div className="text-gray-500">Type</div>
                <div className="font-medium">{toolData.warranty.type}</div>
              </div>
              <div>
                <div className="text-gray-500">Coverage Period</div>
                <div className="font-medium">{toolData.warranty.startDate} - {toolData.warranty.endDate}</div>
              </div>
              <div>
                <div className="text-gray-500">Covered Systems</div>
                <div className="font-medium">{toolData.warranty.coveredSystems}</div>
              </div>
              <div>
                <div className="text-gray-500">Exclusions</div>
                <div className="font-medium text-gray-600">{toolData.warranty.exclusions}</div>
              </div>
            </CardContent>
          </Card>

          {/* Service Contract */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Service Contract
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-gray-500">Contract Type</div>
                <div className="font-medium">{toolData.contract.type}</div>
              </div>
              <div>
                <div className="text-gray-500">Contract #</div>
                <div className="font-medium">{toolData.contract.number}</div>
              </div>
              <div>
                <div className="text-gray-500">Coverage Period</div>
                <div className="font-medium">{toolData.contract.startDate} - {toolData.contract.endDate}</div>
              </div>
              <div>
                <div className="text-gray-500">Response SLA</div>
                <div className="font-medium">{toolData.contract.responseSLA}</div>
              </div>
              <div className="pt-2 border-t space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Parts included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Labor included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Travel included</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
