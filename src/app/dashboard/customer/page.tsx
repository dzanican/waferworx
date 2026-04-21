import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  Briefcase,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fleetSummary = {
  totalTools: 5,
  operational: 4,
  underService: 1,
  warrantyExpiring: 1,
};

const tools = [
  { id: "CVD3K-2024-001", name: "CVD Tool 1", model: "CVD-3000X", status: "Under Service", warranty: "Active", contract: "Full Service" },
  { id: "CVD3K-2023-002", name: "CVD Tool 2", model: "CVD-3000X", status: "Operational", warranty: "Active", contract: "Full Service" },
  { id: "ETCH-2023-001", name: "Etch Tool 1", model: "ETCH-2000", status: "Operational", warranty: "Expiring Soon", contract: "Parts Only" },
  { id: "PVD-2022-001", name: "PVD Tool 1", model: "PVD-1500", status: "Operational", warranty: "Expired", contract: "Full Service" },
];

const activeVisits = [
  {
    jobId: "JOB-2024-0001",
    tool: "CVD Tool 1",
    type: "Annual PM",
    technician: "John Technician",
    startDate: "Apr 8",
    expectedEnd: "Apr 12",
    status: "In Progress",
  },
];

const recentReports = [
  { id: "CSR-2024-0012", date: "Mar 28", tool: "CVD Tool 2", type: "Quarterly PM", status: "Completed" },
  { id: "CSR-2024-0008", date: "Mar 15", tool: "Etch Tool 1", type: "Repair", status: "Completed" },
  { id: "CSR-2024-0005", date: "Feb 20", tool: "PVD Tool 1", type: "Upgrade", status: "Completed" },
];

const statusColors: Record<string, "success" | "warning" | "destructive" | "default"> = {
  "Operational": "success",
  "Under Service": "warning",
  "Down": "destructive",
};

const warrantyColors: Record<string, "success" | "warning" | "destructive" | "secondary"> = {
  "Active": "success",
  "Expiring Soon": "warning",
  "Expired": "secondary",
};

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Customer Portal</h2>
        <p className="text-gray-500">Acme Semiconductor - Service Overview</p>
      </div>

      {/* Fleet Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Cpu className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{fleetSummary.totalTools}</div>
                <div className="text-sm text-gray-500">Total Tools</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{fleetSummary.operational}</div>
                <div className="text-sm text-gray-500">Operational</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{fleetSummary.underService}</div>
                <div className="text-sm text-gray-500">Under Service</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{fleetSummary.warrantyExpiring}</div>
                <div className="text-sm text-gray-500">Warranty Expiring</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Service Visit */}
      {activeVisits.length > 0 && (
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-yellow-600" />
              Active Service Visit
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeVisits.map((visit) => (
              <div key={visit.jobId} className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">{visit.tool} - {visit.type}</div>
                  <div className="text-sm text-gray-500">
                    Technician: {visit.technician}
                  </div>
                  <div className="text-sm text-gray-500">
                    {visit.startDate} - {visit.expectedEnd}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="warning">{visit.status}</Badge>
                  <div className="mt-2">
                    <Button size="sm" variant="outline">
                      View Updates
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tool Fleet */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              Your Tool Fleet
            </CardTitle>
            <CardDescription>Equipment under service coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tools.map((tool) => (
                <div key={tool.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{tool.name}</div>
                    <div className="text-sm text-gray-500">{tool.model} • {tool.id}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusColors[tool.status] || "default"}>{tool.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Service Reports
            </CardTitle>
            <CardDescription>Completed service documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{report.id}</div>
                    <div className="text-sm text-gray-500">{report.tool} • {report.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{report.date}</div>
                    <Button size="sm" variant="ghost" className="mt-1 h-7 text-xs">
                      Download PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coverage Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Coverage Summary
          </CardTitle>
          <CardDescription>Warranty and service contract status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Tool</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Model</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Warranty</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Contract</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{tool.name}</div>
                      <div className="text-xs text-gray-500">{tool.id}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{tool.model}</td>
                    <td className="py-3 px-4">
                      <Badge variant={warrantyColors[tool.warranty]}>{tool.warranty}</Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{tool.contract}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
