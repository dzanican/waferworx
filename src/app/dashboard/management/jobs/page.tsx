"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  User,
  Building2,
} from "lucide-react";

// Demo data
const jobs = [
  {
    id: "job-1",
    jobNumber: "JOB-2024-0001",
    title: "CVD-3000 Annual PM",
    customer: "Acme Semiconductor",
    site: "Fab 1 - Austin",
    tool: "CVD-3000X",
    technician: "John Technician",
    status: "In Progress",
    priority: "medium",
    entitlement: "Contract",
    plannedWeek: "WW15 2024",
    plannedStart: "Apr 8",
    plannedEnd: "Apr 12",
  },
  {
    id: "job-2",
    jobNumber: "JOB-2024-0002",
    title: "ETCH-2000 Troubleshooting",
    customer: "TechFab Inc",
    site: "Main Fab",
    tool: "ETCH-2000",
    technician: "Sarah Engineer",
    status: "Open",
    priority: "high",
    entitlement: "Billable",
    plannedWeek: "WW17 2024",
    plannedStart: "Apr 22",
    plannedEnd: "Apr 24",
  },
  {
    id: "job-3",
    jobNumber: "JOB-2024-0003",
    title: "PVD-1500 Upgrade",
    customer: "Silicon Valley Chips",
    site: "Fab 2",
    tool: "PVD-1500",
    technician: "Mike Smith",
    status: "On Hold",
    priority: "low",
    entitlement: "Warranty",
    plannedWeek: "WW16 2024",
    plannedStart: "Apr 15",
    plannedEnd: "Apr 17",
  },
  {
    id: "job-4",
    jobNumber: "JOB-2024-0004",
    title: "CVD-3000 Chamber Repair",
    customer: "Acme Semiconductor",
    site: "Fab 1 - Austin",
    tool: "CVD-3000X",
    technician: "John Technician",
    status: "Completed",
    priority: "medium",
    entitlement: "Contract",
    plannedWeek: "WW14 2024",
    plannedStart: "Apr 1",
    plannedEnd: "Apr 3",
  },
  {
    id: "job-5",
    jobNumber: "JOB-2024-0005",
    title: "New Tool Installation",
    customer: "MegaChip Corp",
    site: "New Fab",
    tool: "CVD-3000X",
    technician: "Unassigned",
    status: "Open",
    priority: "critical",
    entitlement: "Billable",
    plannedWeek: "WW18 2024",
    plannedStart: "Apr 29",
    plannedEnd: "May 10",
  },
];

const statusColors: Record<string, "default" | "success" | "warning" | "destructive" | "secondary"> = {
  "Open": "default",
  "In Progress": "warning",
  "On Hold": "destructive",
  "Completed": "success",
  "Closed": "secondary",
};

const priorityColors: Record<string, string> = {
  low: "text-gray-500",
  medium: "text-yellow-600",
  high: "text-orange-600",
  critical: "text-red-600 font-semibold",
};

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.technician.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || job.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Jobs</h2>
          <p className="text-gray-500">Manage service jobs and assignments</p>
        </div>
        <Link href="/dashboard/management/jobs/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Job
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs, customers, technicians..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
                <option value="Closed">Closed</option>
              </Select>
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Jobs ({filteredJobs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Customer / Tool</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{job.jobNumber}</div>
                      <div className="text-sm text-gray-500">{job.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">{job.customer}</div>
                        <div className="text-xs text-gray-500">{job.tool} • {job.site}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className={job.technician === "Unassigned" ? "text-gray-400 italic" : ""}>
                        {job.technician}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm">{job.plannedWeek}</div>
                        <div className="text-xs text-gray-500">{job.plannedStart} - {job.plannedEnd}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[job.status]}>{job.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm capitalize ${priorityColors[job.priority]}`}>
                      {job.priority}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/dashboard/management/jobs/${job.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/management/jobs/${job.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
