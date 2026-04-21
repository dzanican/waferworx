"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const myJobs = {
  current: {
    id: "job-1",
    jobNumber: "JOB-2024-0001",
    title: "CVD-3000 Annual PM",
    customer: "Acme Semiconductor",
    site: "Fab 1 - Austin",
    tool: "CVD-3000X (CVD3K-2024-001)",
    status: "In Progress",
    day: 3,
    totalDays: 5,
    entitlement: "Contract",
    plannedDates: "Apr 8 - Apr 12",
  },
  upcoming: [
    {
      id: "job-2",
      jobNumber: "JOB-2024-0005",
      title: "ETCH-2000 Troubleshooting",
      customer: "TechFab Inc",
      site: "Main Fab",
      tool: "ETCH-2000",
      status: "Open",
      priority: "high",
      plannedDates: "Apr 22 - Apr 24",
      plannedWeek: "WW17",
    },
    {
      id: "job-3",
      jobNumber: "JOB-2024-0008",
      title: "CVD-3000 Install Support",
      customer: "MegaChip Corp",
      site: "New Fab",
      tool: "CVD-3000X",
      status: "Open",
      priority: "medium",
      plannedDates: "Apr 29 - May 3",
      plannedWeek: "WW18",
    },
  ],
  completed: [
    {
      id: "job-4",
      jobNumber: "JOB-2024-0004",
      title: "CVD-3000 Chamber Repair",
      customer: "Acme Semiconductor",
      site: "Fab 1 - Austin",
      tool: "CVD-3000X",
      completedDate: "Apr 3, 2024",
      totalHours: 24,
    },
    {
      id: "job-5",
      jobNumber: "JOB-2024-0003",
      title: "PVD-1500 Quarterly PM",
      customer: "Silicon Valley Chips",
      site: "Fab 2",
      tool: "PVD-1500",
      completedDate: "Mar 22, 2024",
      totalHours: 16,
    },
  ],
};

const statusColors: Record<string, "default" | "success" | "warning" | "destructive"> = {
  "Open": "default",
  "In Progress": "warning",
  "On Hold": "destructive",
  "Completed": "success",
};

export default function TechnicianJobsPage() {
  const [activeTab, setActiveTab] = useState("current");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Jobs</h2>
        <p className="text-gray-500">View and manage your assigned jobs</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({myJobs.upcoming.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          {myJobs.current ? (
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{myJobs.current.jobNumber}</CardTitle>
                    <p className="text-gray-500">{myJobs.current.title}</p>
                  </div>
                  <Badge variant="warning">{myJobs.current.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-500">Customer</div>
                    <div className="font-medium">{myJobs.current.customer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Site</div>
                    <div className="font-medium flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {myJobs.current.site}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Tool</div>
                    <div className="font-medium">{myJobs.current.tool}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Schedule</div>
                    <div className="font-medium flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {myJobs.current.plannedDates}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <div className="text-sm text-blue-600">Progress</div>
                    <div className="font-medium text-blue-900">
                      Day {myJobs.current.day} of {myJobs.current.totalDays}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/technician/jobs/${myJobs.current.id}`}>
                      <Button>
                        Open Job
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No Current Assignment</h3>
                <p className="text-gray-500">You don&apos;t have any active jobs at the moment.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="space-y-4">
            {myJobs.upcoming.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{job.jobNumber}</span>
                        <Badge variant={job.priority === "high" ? "destructive" : "secondary"}>
                          {job.priority}
                        </Badge>
                      </div>
                      <div className="text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {job.customer} • {job.site} • {job.tool}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {job.plannedWeek}
                      </div>
                      <div className="text-sm text-gray-500">{job.plannedDates}</div>
                      <Link href={`/dashboard/technician/jobs/${job.id}`}>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="space-y-4">
            {myJobs.completed.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{job.jobNumber}</span>
                        <Badge variant="success">Completed</Badge>
                      </div>
                      <div className="text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {job.customer} • {job.site} • {job.tool}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{job.completedDate}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {job.totalHours}h total
                      </div>
                      <Link href={`/dashboard/technician/jobs/${job.id}`}>
                        <Button variant="ghost" size="sm" className="mt-2">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
