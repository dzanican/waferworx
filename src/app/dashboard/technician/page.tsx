import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Clock,
  MapPin,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const currentJob = {
  id: "JOB-2024-0001",
  title: "CVD-3000 Annual PM",
  customer: "Acme Semiconductor",
  site: "Fab 1 - Austin",
  tool: "CVD-3000X (CVD3K-2024-001)",
  status: "In Progress",
  day: 3,
  totalDays: 5,
  entitlement: "Contract",
};

const todaysTasks = [
  { id: 1, task: "Complete chamber 3 PM checklist", status: "completed" },
  { id: 2, task: "Replace RF generator filters", status: "completed" },
  { id: 3, task: "Run qualification wafers", status: "in_progress" },
  { id: 4, task: "Document particle counts", status: "pending" },
  { id: 5, task: "Submit daily update", status: "pending" },
];

const upcomingJobs = [
  { id: "JOB-2024-0005", title: "ETCH-2000 Troubleshooting", customer: "TechFab Inc", date: "Apr 22-24", priority: "high" },
  { id: "JOB-2024-0008", title: "CVD-3000 Install Support", customer: "Silicon Valley Chips", date: "Apr 29 - May 3", priority: "medium" },
];

const recentUpdates = [
  { date: "Apr 10", summary: "Completed chambers 1-2 PM. Found worn O-rings on chamber 2 load lock." },
  { date: "Apr 9", summary: "Started PM work. Initial tool inspection completed. All safeties verified." },
  { date: "Apr 8", summary: "Travel day. Arrived on-site. Met with customer contact Mike Engineer." },
];

export default function TechnicianDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Technician Dashboard</h2>
        <p className="text-gray-500">Your current assignments and tasks</p>
      </div>

      {/* Current Job Card */}
      <Card className="border-l-4 border-l-blue-600">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                Current Assignment
              </CardTitle>
              <CardDescription>Day {currentJob.day} of {currentJob.totalDays}</CardDescription>
            </div>
            <Badge variant="warning">{currentJob.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Job</div>
                <div className="font-medium">{currentJob.id} - {currentJob.title}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Customer</div>
                <div className="font-medium">{currentJob.customer}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Site</div>
                <div className="font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {currentJob.site}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Tool</div>
                <div className="font-medium">{currentJob.tool}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Entitlement</div>
                <div className="font-medium">{currentJob.entitlement}</div>
              </div>
              <div className="pt-2">
                <Button className="w-full">
                  Open Job Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Today&apos;s Tasks
            </CardTitle>
            <CardDescription>Your checklist for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                    task.status === "completed" ? "bg-green-100" :
                    task.status === "in_progress" ? "bg-yellow-100" : "bg-gray-200"
                  }`}>
                    {task.status === "completed" && <CheckCircle className="h-3 w-3 text-green-600" />}
                    {task.status === "in_progress" && <Clock className="h-3 w-3 text-yellow-600" />}
                  </div>
                  <span className={`flex-1 ${task.status === "completed" ? "text-gray-500 line-through" : "text-gray-900"}`}>
                    {task.task}
                  </span>
                  <Badge variant={
                    task.status === "completed" ? "success" :
                    task.status === "in_progress" ? "warning" : "secondary"
                  }>
                    {task.status.replace("_", " ")}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Updates
            </CardTitle>
            <CardDescription>Your daily summaries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUpdates.map((update, i) => (
                <div key={i} className="border-l-2 border-gray-200 pl-3">
                  <div className="text-xs font-medium text-gray-500">{update.date}</div>
                  <div className="text-sm text-gray-700 mt-1">{update.summary}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Jobs
          </CardTitle>
          <CardDescription>Your scheduled assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{job.id}</div>
                  <div className="text-sm text-gray-700">{job.title}</div>
                  <div className="text-sm text-gray-500">{job.customer}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700">{job.date}</div>
                  <Badge variant={job.priority === "high" ? "destructive" : "secondary"} className="mt-1">
                    {job.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
          <FileText className="h-5 w-5" />
          <span>Add Daily Update</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
          <Clock className="h-5 w-5" />
          <span>Log Time</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
          <AlertTriangle className="h-5 w-5" />
          <span>Create Escalation</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
          <CheckCircle className="h-5 w-5" />
          <span>Complete CSR</span>
        </Button>
      </div>
    </div>
  );
}
