"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  Briefcase,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Repeat,
  Target,
} from "lucide-react";

const kpis = [
  {
    title: "Utilization Rate",
    value: "78%",
    change: "+5%",
    trend: "up",
    description: "vs last month",
    icon: Clock,
    color: "blue",
  },
  {
    title: "First-Time Fix Rate",
    value: "85%",
    change: "+2%",
    trend: "up",
    description: "vs last month",
    icon: Target,
    color: "green",
  },
  {
    title: "Avg Days to Close",
    value: "4.2",
    change: "-0.5",
    trend: "up",
    description: "vs last month",
    icon: Briefcase,
    color: "purple",
  },
  {
    title: "Repeat Visit Rate",
    value: "12%",
    change: "-3%",
    trend: "up",
    description: "vs last month",
    icon: Repeat,
    color: "orange",
  },
];

const technicianUtilization = [
  { name: "John Technician", billable: 85, nonBillable: 10, travel: 5, total: 168 },
  { name: "Sarah Engineer", billable: 78, nonBillable: 15, travel: 7, total: 160 },
  { name: "Mike Smith", billable: 72, nonBillable: 18, travel: 10, total: 152 },
];

const jobsByStatus = [
  { status: "Open", count: 8, color: "bg-blue-500" },
  { status: "In Progress", count: 5, color: "bg-yellow-500" },
  { status: "On Hold", count: 2, color: "bg-red-500" },
  { status: "Completed", count: 12, color: "bg-green-500" },
];

const serviceTypeSplit = [
  { type: "Warranty", hours: 120, percentage: 25 },
  { type: "Contract", hours: 240, percentage: 50 },
  { type: "Billable T&M", hours: 96, percentage: 20 },
  { type: "Internal", hours: 24, percentage: 5 },
];

const repeatVisitsByCustomer = [
  { customer: "Acme Semiconductor", visits: 3, tools: ["CVD-3000X", "PVD-1500"] },
  { customer: "TechFab Inc", visits: 2, tools: ["ETCH-2000"] },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
};

export default function MetricsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Metrics Dashboard</h2>
          <p className="text-gray-500">Key performance indicators and analytics</p>
        </div>
        <Select defaultValue="month">
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {kpi.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-gray-400">{kpi.description}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${colorMap[kpi.color]}`}>
                  <kpi.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Technician Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Technician Utilization
            </CardTitle>
            <CardDescription>Hours breakdown by technician this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {technicianUtilization.map((tech) => (
                <div key={tech.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{tech.name}</span>
                    <span className="text-gray-500">{tech.total}h total</span>
                  </div>
                  <div className="flex h-4 rounded-full overflow-hidden bg-gray-100">
                    <div
                      className="bg-green-500"
                      style={{ width: `${tech.billable}%` }}
                      title={`Billable: ${tech.billable}%`}
                    />
                    <div
                      className="bg-gray-400"
                      style={{ width: `${tech.nonBillable}%` }}
                      title={`Non-billable: ${tech.nonBillable}%`}
                    />
                    <div
                      className="bg-yellow-400"
                      style={{ width: `${tech.travel}%` }}
                      title={`Travel: ${tech.travel}%`}
                    />
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Billable {tech.billable}%
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                      Non-bill {tech.nonBillable}%
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      Travel {tech.travel}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Jobs by Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Jobs by Status
            </CardTitle>
            <CardDescription>Current job distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobsByStatus.map((item) => (
                <div key={item.status} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.status}</span>
                      <span className="text-sm text-gray-500">{item.count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${(item.count / 27) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t flex justify-between text-sm">
                <span className="text-gray-500">Total Jobs</span>
                <span className="font-bold">27</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Type Split */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Service Type Split
            </CardTitle>
            <CardDescription>Hours by entitlement type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {serviceTypeSplit.map((item) => (
                <div key={item.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{item.type}</div>
                    <div className="text-sm text-gray-500">{item.hours} hours</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Repeat Visits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Repeat Visits
            </CardTitle>
            <CardDescription>Customers with multiple visits this month</CardDescription>
          </CardHeader>
          <CardContent>
            {repeatVisitsByCustomer.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                No repeat visits this period
              </div>
            ) : (
              <div className="space-y-3">
                {repeatVisitsByCustomer.map((item) => (
                  <div key={item.customer} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{item.customer}</span>
                      <Badge variant="warning">{item.visits} visits</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Tools: {item.tools.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">27</div>
              <div className="text-sm text-gray-500">Total Jobs</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">480</div>
              <div className="text-sm text-gray-500">Total Hours</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">384</div>
              <div className="text-sm text-gray-500">Billable Hours</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-500">Customers Served</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">18</div>
              <div className="text-sm text-gray-500">Tools Serviced</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">23</div>
              <div className="text-sm text-gray-500">CSRs Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
