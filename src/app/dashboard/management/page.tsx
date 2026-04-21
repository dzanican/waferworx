import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  FileCheck,
} from "lucide-react";

const stats = [
  { title: "Active Jobs", value: "24", change: "+3 this week", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-100" },
  { title: "Technicians", value: "8", change: "2 on-site", icon: Users, color: "text-green-600", bg: "bg-green-100" },
  { title: "Pending Approvals", value: "5", change: "3 CSRs, 2 Timesheets", icon: FileCheck, color: "text-yellow-600", bg: "bg-yellow-100" },
  { title: "Open Escalations", value: "2", change: "1 critical", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
];

const recentJobs = [
  { id: "JOB-2024-0001", customer: "Acme Semiconductor", tool: "CVD-3000X", technician: "John Technician", status: "In Progress", priority: "medium" },
  { id: "JOB-2024-0002", customer: "TechFab Inc", tool: "ETCH-2000", technician: "Sarah Engineer", status: "Open", priority: "high" },
  { id: "JOB-2024-0003", customer: "Silicon Valley Chips", tool: "CVD-3000X", technician: "Mike Smith", status: "On Hold", priority: "low" },
  { id: "JOB-2024-0004", customer: "Acme Semiconductor", tool: "PVD-1500", technician: "John Technician", status: "Completed", priority: "medium" },
];

const upcomingSchedule = [
  { date: "Mon, Apr 15", jobs: 3, technicians: ["John T.", "Sarah E."] },
  { date: "Tue, Apr 16", jobs: 2, technicians: ["Mike S."] },
  { date: "Wed, Apr 17", jobs: 4, technicians: ["John T.", "Sarah E.", "Mike S."] },
  { date: "Thu, Apr 18", jobs: 2, technicians: ["Sarah E."] },
  { date: "Fri, Apr 19", jobs: 1, technicians: ["John T."] },
];

const statusColors: Record<string, "default" | "success" | "warning" | "destructive" | "secondary"> = {
  "In Progress": "warning",
  "Open": "default",
  "On Hold": "destructive",
  "Completed": "success",
};

const priorityColors: Record<string, string> = {
  low: "text-gray-500",
  medium: "text-yellow-600",
  high: "text-red-600",
  critical: "text-red-700 font-bold",
};

export default function ManagementDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Management Dashboard</h2>
        <p className="text-gray-500">Overview of field service operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Jobs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Recent Jobs
            </CardTitle>
            <CardDescription>Latest job activity across all technicians</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{job.id}</span>
                      <Badge variant={statusColors[job.status]}>{job.status}</Badge>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {job.customer} • {job.tool}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-700">{job.technician}</div>
                    <div className={`text-xs capitalize ${priorityColors[job.priority]}`}>
                      {job.priority} priority
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              This Week
            </CardTitle>
            <CardDescription>Upcoming scheduled work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingSchedule.map((day) => (
                <div key={day.date} className="flex items-center justify-between p-2 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="font-medium text-sm text-gray-900">{day.date}</div>
                    <div className="text-xs text-gray-500">{day.technicians.join(", ")}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                      {day.jobs}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Briefcase className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium">Create Job</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Users className="h-6 w-6 text-green-600" />
              <span className="text-sm font-medium">Add Customer</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <FileCheck className="h-6 w-6 text-yellow-600" />
              <span className="text-sm font-medium">Review Approvals</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <span className="text-sm font-medium">View Metrics</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
