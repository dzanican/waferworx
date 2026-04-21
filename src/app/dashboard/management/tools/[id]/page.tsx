"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import {
  ArrowLeft,
  Cpu,
  Building2,
  MapPin,
  Calendar,
  Shield,
  FileText,
  Edit,
  Settings,
  Clock,
  Wrench,
} from "lucide-react";

const toolData = {
  id: "tool-1",
  serialNumber: "CVD3K-2024-001",
  name: "CVD Tool 1",
  model: "CVD-3000X",
  platform: "CVD-3000",
  customer: "Acme Semiconductor",
  customerId: "cust-1",
  site: "Fab 1 - Austin",
  siteAddress: "1234 Silicon Way, Austin, TX 78701",
  status: "Under Service",
  installDate: "Jan 15, 2024",
  softwareVersion: "v3.2.1",
  chamberConfig: "4 chambers",
  installedOptions: "Advanced Process Control, Remote Diagnostics",
  warranty: {
    status: "Active",
    type: "Full Coverage",
    startDate: "Jan 15, 2024",
    endDate: "Jan 15, 2025",
  },
  contract: {
    type: "Full Service",
    startDate: "Jan 15, 2024",
    endDate: "Jan 15, 2026",
    value: "$120,000/year",
  },
};

const serviceHistory = [
  { id: "job-1", number: "JOB-2024-0001", title: "Annual PM", status: "In Progress", date: "Apr 8, 2024", tech: "John Technician" },
  { id: "job-2", number: "JOB-2024-0004", title: "Emergency Repair", status: "Completed", date: "Mar 15, 2024", tech: "Mike Smith" },
  { id: "job-3", number: "JOB-2024-0002", title: "Quarterly PM", status: "Completed", date: "Feb 10, 2024", tech: "John Technician" },
];

const pmSchedule = [
  { id: "pm-1", name: "Annual PM", lastCompleted: "Jan 15, 2024", nextDue: "Jan 15, 2025", status: "On Track" },
  { id: "pm-2", name: "Quarterly PM", lastCompleted: "Apr 10, 2024", nextDue: "Jul 10, 2024", status: "On Track" },
];

const partsHistory = [
  { id: "part-1", partNumber: "ORG-CVD-001", name: "Chamber O-Ring Kit", date: "Apr 10, 2024", job: "JOB-2024-0001" },
  { id: "part-2", partNumber: "VAL-ISO-003", name: "Isolation Valve", date: "Mar 15, 2024", job: "JOB-2024-0004" },
  { id: "part-3", partNumber: "FLT-RF-002", name: "RF Generator Filter", date: "Feb 10, 2024", job: "JOB-2024-0002" },
];

const statusColors: Record<string, "success" | "warning" | "destructive" | "default"> = {
  "Operational": "success",
  "Under Service": "warning",
  "Down": "destructive",
  "Active": "success",
  "In Progress": "warning",
  "Completed": "success",
  "On Track": "success",
  "Due Soon": "warning",
  "Overdue": "destructive",
};

export default function ToolDetailPage() {
  const params = useParams();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/management/tools">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{toolData.name}</h2>
              <Badge variant={statusColors[toolData.status]}>{toolData.status}</Badge>
            </div>
            <p className="text-gray-500">{toolData.model} • {toolData.serialNumber}</p>
          </div>
        </div>
        <Link href={`/dashboard/management/tools/${params.id}/edit`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Tool
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Customer</div>
                <div className="font-medium">{toolData.customer}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Warranty</div>
                <div className="font-medium">{toolData.warranty.status}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Contract</div>
                <div className="font-medium">{toolData.contract.type}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Installed</div>
                <div className="font-medium">{toolData.installDate}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="service">Service History</TabsTrigger>
          <TabsTrigger value="pm">PM Schedule</TabsTrigger>
          <TabsTrigger value="parts">Parts History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tool Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Platform</div>
                    <div className="font-medium">{toolData.platform}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Model</div>
                    <div className="font-medium">{toolData.model}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Software Version</div>
                    <div className="font-medium">{toolData.softwareVersion}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Configuration</div>
                    <div className="font-medium">{toolData.chamberConfig}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Installed Options</div>
                  <div className="font-medium">{toolData.installedOptions}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">{toolData.customer}</div>
                    <div className="text-sm text-gray-500">{toolData.site}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div className="text-sm text-gray-500">{toolData.siteAddress}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Warranty</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <Badge variant="success">{toolData.warranty.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Type</span>
                  <span className="font-medium">{toolData.warranty.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Coverage Period</span>
                  <span className="font-medium">{toolData.warranty.startDate} - {toolData.warranty.endDate}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Contract</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Type</span>
                  <Badge variant="default">{toolData.contract.type}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Contract Period</span>
                  <span className="font-medium">{toolData.contract.startDate} - {toolData.contract.endDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Annual Value</span>
                  <span className="font-medium">{toolData.contract.value}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="service">
          <Card>
            <CardHeader>
              <CardTitle>Service History</CardTitle>
              <CardDescription>All service jobs for this tool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {serviceHistory.map((job) => (
                  <Link key={job.id} href={`/dashboard/management/jobs/${job.id}`}>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Wrench className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{job.number}</div>
                          <div className="text-sm text-gray-500">{job.title} • {job.tech}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">{job.date}</span>
                        <Badge variant={statusColors[job.status]}>{job.status}</Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pm">
          <Card>
            <CardHeader>
              <CardTitle>PM Schedule</CardTitle>
              <CardDescription>Preventive maintenance schedule for this tool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pmSchedule.map((pm) => (
                  <div key={pm.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">{pm.name}</div>
                        <div className="text-sm text-gray-500">Last: {pm.lastCompleted}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm font-medium">Next Due</div>
                        <div className="text-sm text-gray-500">{pm.nextDue}</div>
                      </div>
                      <Badge variant={statusColors[pm.status]}>{pm.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parts">
          <Card>
            <CardHeader>
              <CardTitle>Parts History</CardTitle>
              <CardDescription>Parts replaced on this tool</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {partsHistory.map((part) => (
                  <div key={part.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Settings className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">{part.name}</div>
                        <div className="text-sm text-gray-500">{part.partNumber}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{part.date}</div>
                      <div className="text-sm text-gray-500">{part.job}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
