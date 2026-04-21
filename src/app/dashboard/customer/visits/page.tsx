"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  User,
  Cpu,
  MapPin,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const activeVisits = [
  {
    id: "visit-1",
    jobNumber: "JOB-2024-0001",
    title: "CVD-3000 Annual PM",
    tool: "CVD Tool 1",
    toolModel: "CVD-3000X",
    site: "Fab 1 - Austin",
    technician: "John Technician",
    startDate: "Apr 8, 2024",
    expectedEnd: "Apr 12, 2024",
    currentDay: 3,
    totalDays: 5,
    status: "In Progress",
    entitlement: "Contract",
    lastUpdate: "Completed chambers 1-2 PM. Found worn O-rings on chamber 2 load lock.",
    lastUpdateTime: "Apr 10, 2024 4:30 PM",
  },
];

const upcomingVisits = [
  {
    id: "visit-2",
    jobNumber: "JOB-2024-0010",
    title: "CVD Tool 2 Quarterly PM",
    tool: "CVD Tool 2",
    toolModel: "CVD-3000X",
    site: "Fab 1 - Austin",
    technician: "Sarah Engineer",
    scheduledDate: "May 6-8, 2024",
    status: "Scheduled",
    entitlement: "Contract",
  },
  {
    id: "visit-3",
    jobNumber: "JOB-2024-0012",
    title: "Etch Tool 1 PM",
    tool: "Etch Tool 1",
    toolModel: "ETCH-2000",
    site: "Fab 1 - Austin",
    technician: "TBD",
    scheduledDate: "May 15-16, 2024",
    status: "Pending Assignment",
    entitlement: "Contract",
  },
];

const completedVisits = [
  {
    id: "visit-4",
    jobNumber: "JOB-2024-0004",
    title: "RF Generator Replacement",
    tool: "CVD Tool 1",
    toolModel: "CVD-3000X",
    site: "Fab 1 - Austin",
    technician: "Sarah Engineer",
    visitDates: "Mar 13-15, 2024",
    completedDate: "Mar 15, 2024",
    status: "Completed",
    entitlement: "Warranty",
    totalHours: 24,
    hasCSR: true,
  },
  {
    id: "visit-5",
    jobNumber: "JOB-2024-0002",
    title: "Quarterly PM",
    tool: "CVD Tool 2",
    toolModel: "CVD-3000X",
    site: "Fab 1 - Austin",
    technician: "John Technician",
    visitDates: "Feb 8-10, 2024",
    completedDate: "Feb 10, 2024",
    status: "Completed",
    entitlement: "Contract",
    totalHours: 16,
    hasCSR: true,
  },
];

const statusColors: Record<string, "success" | "warning" | "default" | "secondary"> = {
  "In Progress": "warning",
  "Scheduled": "default",
  "Pending Assignment": "secondary",
  "Completed": "success",
};

export default function CustomerVisitsPage() {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Service Visits</h2>
        <p className="text-gray-500">Track active and scheduled service visits</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">
            <Clock className="h-4 w-4 mr-2" />
            Active ({activeVisits.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            <Calendar className="h-4 w-4 mr-2" />
            Upcoming ({upcomingVisits.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            <CheckCircle className="h-4 w-4 mr-2" />
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeVisits.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Active Visits</h3>
                <p className="text-gray-500">All tools are operational</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeVisits.map((visit) => (
                <Card key={visit.id} className="border-l-4 border-l-yellow-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-lg">{visit.jobNumber}</span>
                          <Badge variant="warning">{visit.status}</Badge>
                          <Badge variant="outline">{visit.entitlement}</Badge>
                        </div>
                        <h3 className="text-gray-900">{visit.title}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Day {visit.currentDay} of {visit.totalDays}</div>
                        <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${(visit.currentDay / visit.totalDays) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-gray-500">Tool</div>
                          <div className="font-medium">{visit.tool}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-gray-500">Site</div>
                          <div className="font-medium">{visit.site}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-gray-500">Technician</div>
                          <div className="font-medium">{visit.technician}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="text-gray-500">Expected End</div>
                          <div className="font-medium">{visit.expectedEnd}</div>
                        </div>
                      </div>
                    </div>

                    {visit.lastUpdate && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-blue-900">Latest Update</span>
                          <span className="text-xs text-blue-600">{visit.lastUpdateTime}</span>
                        </div>
                        <p className="text-sm text-blue-800">{visit.lastUpdate}</p>
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View All Updates
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="space-y-4">
            {upcomingVisits.map((visit) => (
              <Card key={visit.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{visit.jobNumber}</span>
                        <Badge variant={statusColors[visit.status]}>{visit.status}</Badge>
                      </div>
                      <div className="text-gray-900">{visit.title}</div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Cpu className="h-4 w-4" />
                          {visit.tool}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {visit.technician}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {visit.scheduledDate}
                      </div>
                      <Badge variant="outline" className="mt-1">{visit.entitlement}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Service Visits</CardTitle>
              <CardDescription>Recent service history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedVisits.map((visit) => (
                  <div key={visit.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{visit.jobNumber}</span>
                      </div>
                      <div className="text-gray-900">{visit.title}</div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{visit.tool}</span>
                        <span>•</span>
                        <span>{visit.technician}</span>
                        <span>•</span>
                        <span>{visit.totalHours}h</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{visit.visitDates}</div>
                      <Badge variant="outline" className="mt-1">{visit.entitlement}</Badge>
                      {visit.hasCSR && (
                        <Button variant="link" size="sm" className="mt-1 h-auto p-0">
                          View Report <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      )}
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
