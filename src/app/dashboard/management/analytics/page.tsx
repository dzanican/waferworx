"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Cpu,
  Building2,
  AlertTriangle,
  Target,
  Clock,
  Repeat,
  Wrench,
  Users,
} from "lucide-react";

// Trend data
const monthlyTrends = [
  { month: "Jan", jobs: 12, hours: 420, utilization: 72, ftfr: 82 },
  { month: "Feb", jobs: 15, hours: 480, utilization: 75, ftfr: 85 },
  { month: "Mar", jobs: 18, hours: 520, utilization: 78, ftfr: 88 },
  { month: "Apr", jobs: 14, hours: 450, utilization: 76, ftfr: 85 },
];

const failureAnalysis = [
  { subsystem: "Chamber", incidents: 12, percentage: 35, trend: "down" },
  { subsystem: "RF System", incidents: 8, percentage: 24, trend: "up" },
  { subsystem: "Vacuum", incidents: 6, percentage: 18, trend: "stable" },
  { subsystem: "Gas Delivery", incidents: 4, percentage: 12, trend: "down" },
  { subsystem: "Temperature", incidents: 4, percentage: 11, trend: "stable" },
];

const topSymptoms = [
  { code: "SYM-001", name: "Particle contamination", count: 8, platform: "CVD-3000" },
  { code: "SYM-003", name: "Power fluctuation", count: 5, platform: "CVD-3000" },
  { code: "SYM-005", name: "Vacuum leak", count: 4, platform: "ETCH-2000" },
  { code: "SYM-007", name: "Temperature instability", count: 3, platform: "PVD-1500" },
];

const customerMetrics = [
  { customer: "Acme Semiconductor", visits: 8, hours: 180, satisfaction: 4.5, repeatRate: 10 },
  { customer: "TechFab Inc", visits: 5, hours: 95, satisfaction: 4.8, repeatRate: 5 },
  { customer: "Silicon Valley Chips", visits: 4, hours: 72, satisfaction: 4.2, repeatRate: 15 },
  { customer: "MegaChip Corp", visits: 3, hours: 48, satisfaction: 4.6, repeatRate: 0 },
];

const technicianMetrics = [
  { name: "John Technician", jobs: 12, hours: 380, utilization: 82, ftfr: 92, avgDays: 3.5 },
  { name: "Sarah Engineer", jobs: 10, hours: 320, utilization: 78, ftfr: 88, avgDays: 4.0 },
  { name: "Mike Smith", jobs: 8, hours: 280, utilization: 72, ftfr: 85, avgDays: 4.5 },
];

const platformReliability = [
  { platform: "CVD-3000", mtbf: 2400, mttr: 18, availability: 99.2, incidents: 15 },
  { platform: "ETCH-2000", mtbf: 2800, mttr: 12, availability: 99.5, incidents: 8 },
  { platform: "PVD-1500", mtbf: 3200, mttr: 8, availability: 99.7, incidents: 5 },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("quarter");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-500">Advanced reporting and trend analysis</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="failures">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Failure Analysis
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Building2 className="h-4 w-4 mr-2" />
            Customer Insights
          </TabsTrigger>
          <TabsTrigger value="technicians">
            <Users className="h-4 w-4 mr-2" />
            Technician Performance
          </TabsTrigger>
          <TabsTrigger value="reliability">
            <Cpu className="h-4 w-4 mr-2" />
            Platform Reliability
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Trend Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>Jobs, hours, and key metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyTrends.map((month) => (
                    <div key={month.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{month.month} 2024</span>
                        <span className="text-gray-500">{month.jobs} jobs • {month.hours}h</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Utilization</div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-blue-500 rounded-full"
                              style={{ width: `${month.utilization}%` }}
                            />
                          </div>
                          <div className="text-xs text-right mt-1">{month.utilization}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">FTFR</div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-green-500 rounded-full"
                              style={{ width: `${month.ftfr}%` }}
                            />
                          </div>
                          <div className="text-xs text-right mt-1">{month.ftfr}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">First-Time Fix Rate</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-900">85%</div>
                    <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                      <TrendingUp className="h-4 w-4" />
                      +3% vs last quarter
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-900">Avg Resolution Time</span>
                    </div>
                    <div className="text-3xl font-bold text-green-900">4.2 days</div>
                    <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                      <TrendingDown className="h-4 w-4" />
                      -0.5 days vs last quarter
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-900">Utilization Rate</span>
                    </div>
                    <div className="text-3xl font-bold text-purple-900">78%</div>
                    <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                      <TrendingUp className="h-4 w-4" />
                      +5% vs last quarter
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Repeat className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium text-orange-900">Repeat Visit Rate</span>
                    </div>
                    <div className="text-3xl font-bold text-orange-900">12%</div>
                    <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                      <TrendingDown className="h-4 w-4" />
                      -3% vs last quarter
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="failures">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Failure by Subsystem</CardTitle>
                <CardDescription>Distribution of issues by system component</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {failureAnalysis.map((item) => (
                    <div key={item.subsystem} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.subsystem}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{item.incidents} incidents</span>
                          {item.trend === "up" && <TrendingUp className="h-4 w-4 text-red-500" />}
                          {item.trend === "down" && <TrendingDown className="h-4 w-4 text-green-500" />}
                        </div>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full">
                        <div
                          className="h-3 bg-red-500 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-right text-gray-500">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Symptoms</CardTitle>
                <CardDescription>Most frequently reported issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topSymptoms.map((symptom, index) => (
                    <div key={symptom.code} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{symptom.name}</div>
                          <div className="text-xs text-gray-500">{symptom.code} • {symptom.platform}</div>
                        </div>
                      </div>
                      <Badge variant="destructive">{symptom.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Performance</CardTitle>
              <CardDescription>Service metrics by customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Customer</th>
                      <th className="text-center py-3 px-4 font-medium">Visits</th>
                      <th className="text-center py-3 px-4 font-medium">Hours</th>
                      <th className="text-center py-3 px-4 font-medium">Satisfaction</th>
                      <th className="text-center py-3 px-4 font-medium">Repeat Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerMetrics.map((customer) => (
                      <tr key={customer.customer} className="border-b">
                        <td className="py-3 px-4 font-medium">{customer.customer}</td>
                        <td className="py-3 px-4 text-center">{customer.visits}</td>
                        <td className="py-3 px-4 text-center">{customer.hours}h</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span>{customer.satisfaction}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={customer.repeatRate > 10 ? "destructive" : "success"}>
                            {customer.repeatRate}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technicians">
          <Card>
            <CardHeader>
              <CardTitle>Technician Performance</CardTitle>
              <CardDescription>Individual performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {technicianMetrics.map((tech) => (
                  <div key={tech.name} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-medium text-blue-600">
                          {tech.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium">{tech.name}</div>
                          <div className="text-sm text-gray-500">{tech.jobs} jobs • {tech.hours}h</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Utilization</div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: `${tech.utilization}%` }}
                          />
                        </div>
                        <div className="text-sm font-medium mt-1">{tech.utilization}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">First-Time Fix</div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{ width: `${tech.ftfr}%` }}
                          />
                        </div>
                        <div className="text-sm font-medium mt-1">{tech.ftfr}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Avg Days to Close</div>
                        <div className="text-2xl font-bold">{tech.avgDays}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reliability">
          <Card>
            <CardHeader>
              <CardTitle>Platform Reliability</CardTitle>
              <CardDescription>Equipment reliability metrics by platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Platform</th>
                      <th className="text-center py-3 px-4 font-medium">MTBF (hrs)</th>
                      <th className="text-center py-3 px-4 font-medium">MTTR (hrs)</th>
                      <th className="text-center py-3 px-4 font-medium">Availability</th>
                      <th className="text-center py-3 px-4 font-medium">Incidents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {platformReliability.map((platform) => (
                      <tr key={platform.platform} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">{platform.platform}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">{platform.mtbf.toLocaleString()}</td>
                        <td className="py-3 px-4 text-center">{platform.mttr}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant="success">{platform.availability}%</Badge>
                        </td>
                        <td className="py-3 px-4 text-center">{platform.incidents}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
