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
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  FileText,
  Clock,
  Edit,
  Briefcase,
} from "lucide-react";

const technicianData = {
  id: "tech-1",
  name: "John Technician",
  email: "john.tech@waferworx.demo",
  phone: "555-0150",
  role: "Senior Field Service Engineer",
  status: "Active",
  region: "Southwest",
  homeBase: "Austin, TX",
  startDate: "Mar 15, 2020",
  yearsExperience: 8,
  avatar: "JT",
};

const certifications = [
  { id: "cert-1", name: "CVD-3000 Advanced", platform: "CVD-3000", level: "Expert", expiry: "Dec 2024", status: "Active" },
  { id: "cert-2", name: "ETCH-2000 Basic", platform: "ETCH-2000", level: "Basic", expiry: "Jun 2025", status: "Active" },
  { id: "cert-3", name: "PVD-1500 Advanced", platform: "PVD-1500", level: "Advanced", expiry: "Mar 2024", status: "Expiring" },
  { id: "cert-4", name: "Safety Certification", platform: "General", level: "Required", expiry: "Jan 2025", status: "Active" },
];

const recentJobs = [
  { id: "job-1", number: "JOB-2024-0001", title: "CVD-3000 Annual PM", customer: "Acme Semiconductor", status: "In Progress", date: "Apr 8, 2024" },
  { id: "job-2", number: "JOB-2024-0004", title: "Emergency Repair", customer: "Acme Semiconductor", status: "Completed", date: "Mar 15, 2024" },
  { id: "job-3", number: "JOB-2024-0003", title: "Installation", customer: "MegaChip Corp", status: "Completed", date: "Mar 1, 2024" },
];

const utilizationData = {
  currentWeek: { billable: 33, nonBillable: 4, total: 37 },
  monthToDate: { billable: 120, nonBillable: 16, total: 136 },
  yearToDate: { billable: 1450, nonBillable: 180, total: 1630 },
  utilizationRate: 89,
};

const statusColors: Record<string, "success" | "warning" | "destructive" | "default"> = {
  "Active": "success",
  "Expiring": "warning",
  "Expired": "destructive",
  "In Progress": "warning",
  "Completed": "success",
};

export default function TechnicianDetailPage() {
  const params = useParams();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/management/technicians">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
              {technicianData.avatar}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">{technicianData.name}</h2>
                <Badge variant="success">{technicianData.status}</Badge>
              </div>
              <p className="text-gray-500">{technicianData.role}</p>
            </div>
          </div>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{utilizationData.utilizationRate}%</div>
                <div className="text-sm text-gray-500">Utilization Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{technicianData.yearsExperience}</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{certifications.length}</div>
                <div className="text-sm text-gray-500">Certifications</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FileText className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{recentJobs.length}</div>
                <div className="text-sm text-gray-500">Recent Jobs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="jobs">Job History</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{technicianData.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium">{technicianData.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Home Base</div>
                    <div className="font-medium">{technicianData.homeBase}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Role</span>
                  <span className="font-medium">{technicianData.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Region</span>
                  <span className="font-medium">{technicianData.region}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Start Date</span>
                  <span className="font-medium">{technicianData.startDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Experience</span>
                  <span className="font-medium">{technicianData.yearsExperience} years</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Platform certifications and training</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Award className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-sm text-gray-500">{cert.platform} • {cert.level}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Expires</div>
                        <div className="text-sm font-medium">{cert.expiry}</div>
                      </div>
                      <Badge variant={statusColors[cert.status]}>{cert.status}</Badge>
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
              <CardDescription>Jobs assigned to this technician</CardDescription>
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
                          <div className="text-sm text-gray-500">{job.title} • {job.customer}</div>
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

        <TabsContent value="utilization">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Current Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Billable Hours</span>
                  <span className="font-bold text-green-600">{utilizationData.currentWeek.billable}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Non-Billable</span>
                  <span className="font-medium">{utilizationData.currentWeek.nonBillable}h</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-bold">{utilizationData.currentWeek.total}h</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Month to Date</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Billable Hours</span>
                  <span className="font-bold text-green-600">{utilizationData.monthToDate.billable}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Non-Billable</span>
                  <span className="font-medium">{utilizationData.monthToDate.nonBillable}h</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-bold">{utilizationData.monthToDate.total}h</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Year to Date</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Billable Hours</span>
                  <span className="font-bold text-green-600">{utilizationData.yearToDate.billable}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Non-Billable</span>
                  <span className="font-medium">{utilizationData.yearToDate.nonBillable}h</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-bold">{utilizationData.yearToDate.total}h</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
