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
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Edit,
  Cpu,
  FileText,
  Users,
  Calendar,
  DollarSign,
} from "lucide-react";

const customerData = {
  id: "cust-1",
  name: "Acme Semiconductor",
  accountNumber: "ACME-001",
  industry: "Semiconductor Manufacturing",
  status: "Active",
  address: "1234 Silicon Way",
  city: "Austin",
  state: "TX",
  country: "USA",
  postalCode: "78701",
  phone: "555-0100",
  email: "support@acmesemi.demo",
  website: "www.acmesemi.demo",
  notes: "Key strategic account. Annual PM contracts for all tools.",
  contractValue: "$450,000",
  toolCount: 5,
  openJobs: 2,
};

const sites = [
  { id: "site-1", name: "Fab 1 - Austin", address: "1234 Silicon Way, Austin, TX", tools: 3, status: "Active" },
  { id: "site-2", name: "Fab 2 - Dallas", address: "5678 Tech Blvd, Dallas, TX", tools: 2, status: "Active" },
];

const contacts = [
  { id: "contact-1", name: "Mike Engineer", role: "Process Engineer", email: "mike.engineer@acmesemi.demo", phone: "555-0200", primary: true },
  { id: "contact-2", name: "Sarah Manager", role: "Fab Manager", email: "sarah.manager@acmesemi.demo", phone: "555-0201", primary: false },
  { id: "contact-3", name: "John Procurement", role: "Procurement Lead", email: "john.proc@acmesemi.demo", phone: "555-0202", primary: false },
];

const tools = [
  { id: "tool-1", name: "CVD Tool 1", serial: "CVD3K-2024-001", site: "Fab 1 - Austin", status: "Under Service", contract: "Full Service" },
  { id: "tool-2", name: "CVD Tool 2", serial: "CVD3K-2023-002", site: "Fab 1 - Austin", status: "Operational", contract: "Full Service" },
  { id: "tool-3", name: "CVD Tool 3", serial: "CVD3K-2023-003", site: "Fab 1 - Austin", status: "Operational", contract: "Full Service" },
  { id: "tool-4", name: "Etch Tool 1", serial: "ETCH-2023-001", site: "Fab 2 - Dallas", status: "Operational", contract: "Parts Only" },
  { id: "tool-5", name: "PVD Tool 1", serial: "PVD-2022-001", site: "Fab 2 - Dallas", status: "Operational", contract: "Full Service" },
];

const recentJobs = [
  { id: "job-1", number: "JOB-2024-0001", title: "CVD-3000 Annual PM", status: "In Progress", date: "Apr 8, 2024" },
  { id: "job-2", number: "JOB-2024-0004", title: "Emergency Repair", status: "Completed", date: "Mar 15, 2024" },
  { id: "job-3", number: "JOB-2024-0002", title: "Quarterly PM", status: "Completed", date: "Feb 10, 2024" },
];

const statusColors: Record<string, "success" | "warning" | "destructive" | "default"> = {
  "Operational": "success",
  "Under Service": "warning",
  "Down": "destructive",
  "Active": "success",
  "In Progress": "warning",
  "Completed": "success",
};

export default function CustomerDetailPage() {
  const params = useParams();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/management/customers">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{customerData.name}</h2>
              <Badge variant="success">{customerData.status}</Badge>
            </div>
            <p className="text-gray-500">{customerData.accountNumber} • {customerData.industry}</p>
          </div>
        </div>
        <Link href={`/dashboard/management/customers/${params.id}/edit`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Customer
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Cpu className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{customerData.toolCount}</div>
                <div className="text-sm text-gray-500">Tools</div>
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
                <div className="text-2xl font-bold">{customerData.openJobs}</div>
                <div className="text-sm text-gray-500">Open Jobs</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{customerData.contractValue}</div>
                <div className="text-sm text-gray-500">Contract Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MapPin className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{sites.length}</div>
                <div className="text-sm text-gray-500">Sites</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sites">Sites ({sites.length})</TabsTrigger>
          <TabsTrigger value="tools">Tools ({tools.length})</TabsTrigger>
          <TabsTrigger value="contacts">Contacts ({contacts.length})</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-sm text-gray-500">
                      {customerData.address}<br />
                      {customerData.city}, {customerData.state} {customerData.postalCode}<br />
                      {customerData.country}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-gray-500">{customerData.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-gray-500">{customerData.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium">Website</div>
                    <div className="text-sm text-gray-500">{customerData.website}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{customerData.notes}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sites">
          <Card>
            <CardHeader>
              <CardTitle>Sites</CardTitle>
              <CardDescription>Customer facility locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sites.map((site) => (
                  <div key={site.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{site.name}</div>
                        <div className="text-sm text-gray-500">{site.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500">{site.tools} tools</div>
                      <Badge variant={statusColors[site.status]}>{site.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <Card>
            <CardHeader>
              <CardTitle>Tools</CardTitle>
              <CardDescription>Equipment at this customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tools.map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Cpu className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-sm text-gray-500">{tool.serial} • {tool.site}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{tool.contract}</Badge>
                      <Badge variant={statusColors[tool.status]}>{tool.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
              <CardDescription>Key personnel at this customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{contact.name}</span>
                          {contact.primary && <Badge variant="default">Primary</Badge>}
                        </div>
                        <div className="text-sm text-gray-500">{contact.role}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <div>{contact.email}</div>
                      <div>{contact.phone}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Recent Jobs</CardTitle>
              <CardDescription>Service history for this customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentJobs.map((job) => (
                  <Link key={job.id} href={`/dashboard/management/jobs/${job.id}`}>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{job.number}</div>
                          <div className="text-sm text-gray-500">{job.title}</div>
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
      </Tabs>
    </div>
  );
}
