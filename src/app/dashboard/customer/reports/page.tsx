"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  FileText,
  Download,
  Search,
  Calendar,
  Eye,
  Filter,
} from "lucide-react";

const reports = [
  {
    id: "csr-1",
    number: "CSR-2024-0015",
    date: "Apr 12, 2024",
    tool: "CVD Tool 1",
    toolModel: "CVD-3000X",
    type: "PM",
    title: "Annual Preventive Maintenance",
    technician: "John Technician",
    status: "pending_signature",
    hours: 37,
  },
  {
    id: "csr-2",
    number: "CSR-2024-0012",
    date: "Mar 15, 2024",
    tool: "CVD Tool 1",
    toolModel: "CVD-3000X",
    type: "Repair",
    title: "RF Generator Replacement",
    technician: "Sarah Engineer",
    status: "signed",
    hours: 24,
  },
  {
    id: "csr-3",
    number: "CSR-2024-0008",
    date: "Feb 10, 2024",
    tool: "CVD Tool 2",
    toolModel: "CVD-3000X",
    type: "PM",
    title: "Quarterly PM",
    technician: "John Technician",
    status: "signed",
    hours: 16,
  },
  {
    id: "csr-4",
    number: "CSR-2024-0005",
    date: "Jan 20, 2024",
    tool: "Etch Tool 1",
    toolModel: "ETCH-2000",
    type: "Repair",
    title: "Vacuum System Repair",
    technician: "Mike Smith",
    status: "signed",
    hours: 12,
  },
  {
    id: "csr-5",
    number: "CSR-2024-0001",
    date: "Jan 15, 2024",
    tool: "CVD Tool 1",
    toolModel: "CVD-3000X",
    type: "Installation",
    title: "Tool Installation",
    technician: "Mike Smith",
    status: "signed",
    hours: 40,
  },
];

const statusColors: Record<string, "success" | "warning" | "default"> = {
  signed: "success",
  pending_signature: "warning",
  draft: "default",
};

const statusLabels: Record<string, string> = {
  signed: "Signed",
  pending_signature: "Awaiting Signature",
  draft: "Draft",
};

const typeColors: Record<string, string> = {
  PM: "bg-blue-100 text-blue-800",
  Repair: "bg-orange-100 text-orange-800",
  Installation: "bg-green-100 text-green-800",
  Upgrade: "bg-purple-100 text-purple-800",
};

export default function CustomerReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [toolFilter, setToolFilter] = useState("all");

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.tool.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || report.type === typeFilter;
    const matchesTool = toolFilter === "all" || report.tool === toolFilter;

    return matchesSearch && matchesType && matchesTool;
  });

  const tools = [...new Set(reports.map((r) => r.tool))];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Service Reports</h2>
        <p className="text-gray-500">View and download Customer Service Reports</p>
      </div>

      {/* Pending Signature Alert */}
      {reports.some((r) => r.status === "pending_signature") && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-yellow-600" />
                <div>
                  <div className="font-medium text-yellow-900">Reports Awaiting Your Signature</div>
                  <div className="text-sm text-yellow-700">
                    {reports.filter((r) => r.status === "pending_signature").length} report(s) need your acknowledgment
                  </div>
                </div>
              </div>
              <Button variant="outline" className="border-yellow-300 text-yellow-800 hover:bg-yellow-100">
                Review & Sign
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="all">All Types</option>
                <option value="PM">PM</option>
                <option value="Repair">Repair</option>
                <option value="Installation">Installation</option>
                <option value="Upgrade">Upgrade</option>
              </Select>
              <Select value={toolFilter} onChange={(e) => setToolFilter(e.target.value)}>
                <option value="all">All Tools</option>
                {tools.map((tool) => (
                  <option key={tool} value={tool}>{tool}</option>
                ))}
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>All Reports ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{report.number}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColors[report.type]}`}>
                        {report.type}
                      </span>
                      <Badge variant={statusColors[report.status]}>
                        {statusLabels[report.status]}
                      </Badge>
                    </div>
                    <div className="text-gray-900">{report.title}</div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{report.tool} ({report.toolModel})</span>
                      <span>•</span>
                      <span>{report.technician}</span>
                      <span>•</span>
                      <span>{report.hours}h</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {report.date}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{reports.length}</div>
            <div className="text-sm text-gray-500">Total Reports</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {reports.filter((r) => r.type === "PM").length}
            </div>
            <div className="text-sm text-gray-500">PM Reports</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {reports.filter((r) => r.type === "Repair").length}
            </div>
            <div className="text-sm text-gray-500">Repair Reports</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {reports.reduce((sum, r) => sum + r.hours, 0)}
            </div>
            <div className="text-sm text-gray-500">Total Service Hours</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
