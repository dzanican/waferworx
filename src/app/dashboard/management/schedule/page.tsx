"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  MapPin,
  AlertCircle,
} from "lucide-react";

// Demo schedule data
const technicians = [
  { id: "tech-1", name: "John Technician", initials: "JT" },
  { id: "tech-2", name: "Sarah Engineer", initials: "SE" },
  { id: "tech-3", name: "Mike Smith", initials: "MS" },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const currentWeekDates = ["Apr 8", "Apr 9", "Apr 10", "Apr 11", "Apr 12"];

type ScheduleEntry = {
  id: string;
  jobNumber: string;
  customer: string;
  tool: string;
  type: "onsite" | "travel" | "remote";
  status: "confirmed" | "tentative";
};

const scheduleData: Record<string, Record<string, ScheduleEntry[]>> = {
  "tech-1": {
    "Mon": [{ id: "s1", jobNumber: "JOB-2024-0001", customer: "Acme Semi", tool: "CVD-3000X", type: "travel", status: "confirmed" }],
    "Tue": [{ id: "s2", jobNumber: "JOB-2024-0001", customer: "Acme Semi", tool: "CVD-3000X", type: "onsite", status: "confirmed" }],
    "Wed": [{ id: "s3", jobNumber: "JOB-2024-0001", customer: "Acme Semi", tool: "CVD-3000X", type: "onsite", status: "confirmed" }],
    "Thu": [{ id: "s4", jobNumber: "JOB-2024-0001", customer: "Acme Semi", tool: "CVD-3000X", type: "onsite", status: "confirmed" }],
    "Fri": [{ id: "s5", jobNumber: "JOB-2024-0001", customer: "Acme Semi", tool: "CVD-3000X", type: "onsite", status: "confirmed" }],
  },
  "tech-2": {
    "Mon": [],
    "Tue": [],
    "Wed": [{ id: "s6", jobNumber: "JOB-2024-0002", customer: "TechFab", tool: "ETCH-2000", type: "remote", status: "tentative" }],
    "Thu": [],
    "Fri": [],
  },
  "tech-3": {
    "Mon": [{ id: "s7", jobNumber: "JOB-2024-0003", customer: "SV Chips", tool: "PVD-1500", type: "onsite", status: "confirmed" }],
    "Tue": [{ id: "s8", jobNumber: "JOB-2024-0003", customer: "SV Chips", tool: "PVD-1500", type: "onsite", status: "confirmed" }],
    "Wed": [],
    "Thu": [],
    "Fri": [],
  },
};

const unassignedJobs = [
  { id: "uj1", jobNumber: "JOB-2024-0005", customer: "MegaChip Corp", tool: "CVD-3000X", priority: "critical", plannedWeek: "WW18" },
  { id: "uj2", jobNumber: "JOB-2024-0006", customer: "Acme Semi", tool: "PVD-1500", priority: "medium", plannedWeek: "WW17" },
];

const typeColors: Record<string, string> = {
  onsite: "bg-blue-100 border-blue-300 text-blue-800",
  travel: "bg-yellow-100 border-yellow-300 text-yellow-800",
  remote: "bg-green-100 border-green-300 text-green-800",
};

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState("WW15 2024");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dispatch Board</h2>
          <p className="text-gray-500">Manage technician schedules and assignments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{currentWeek}</span>
          </div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Schedule Grid */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-left font-medium text-gray-500 w-40">Technician</th>
                      {weekDays.map((day, i) => (
                        <th key={day} className="p-3 text-center font-medium text-gray-500 min-w-[140px]">
                          <div>{day}</div>
                          <div className="text-xs font-normal">{currentWeekDates[i]}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {technicians.map((tech) => (
                      <tr key={tech.id} className="border-b">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                              {tech.initials}
                            </div>
                            <span className="font-medium text-sm">{tech.name}</span>
                          </div>
                        </td>
                        {weekDays.map((day) => {
                          const entries = scheduleData[tech.id]?.[day] || [];
                          return (
                            <td key={day} className="p-2 align-top">
                              {entries.length === 0 ? (
                                <div className="h-16 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                                  Available
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  {entries.map((entry) => (
                                    <div
                                      key={entry.id}
                                      className={`p-2 rounded-lg border text-xs cursor-pointer hover:shadow-md transition-shadow ${typeColors[entry.type]}`}
                                    >
                                      <div className="font-medium">{entry.jobNumber}</div>
                                      <div className="truncate">{entry.customer}</div>
                                      <div className="flex items-center gap-1 mt-1">
                                        {entry.type === "travel" && <MapPin className="h-3 w-3" />}
                                        <span className="capitalize">{entry.type}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
              <span>On-site</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300"></div>
              <span>Travel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
              <span>Remote</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-dashed border-gray-300"></div>
              <span>Available</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Unassigned Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                Unassigned Jobs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {unassignedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-3 bg-orange-50 border border-orange-200 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{job.jobNumber}</span>
                      <Badge variant={job.priority === "critical" ? "destructive" : "secondary"} className="text-xs">
                        {job.priority}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600">{job.customer}</div>
                    <div className="text-xs text-gray-500">{job.tool} • {job.plannedWeek}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Drag jobs to assign to a technician
              </p>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Week Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Jobs</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Technicians Assigned</span>
                <span className="font-medium">2 / 3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Travel Days</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">On-site Days</span>
                <span className="font-medium">7</span>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select defaultValue="all">
                <option value="all">All Technicians</option>
                {technicians.map((tech) => (
                  <option key={tech.id} value={tech.id}>{tech.name}</option>
                ))}
              </Select>
              <Select defaultValue="all">
                <option value="all">All Job Types</option>
                <option value="onsite">On-site</option>
                <option value="travel">Travel</option>
                <option value="remote">Remote</option>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
