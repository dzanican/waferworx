"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Cpu,
  Search,
  Shield,
  Calendar,
  FileText,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const tools = [
  {
    id: "tool-1",
    serialNumber: "CVD3K-2024-001",
    name: "CVD Tool 1",
    model: "CVD-3000X",
    status: "Under Service",
    warrantyStatus: "Active",
    warrantyEnd: "Jan 15, 2025",
    contractType: "Full Service",
    lastService: "Apr 8, 2024",
    nextPM: "Jul 2024",
    openJobs: 1,
  },
  {
    id: "tool-2",
    serialNumber: "CVD3K-2023-002",
    name: "CVD Tool 2",
    model: "CVD-3000X",
    status: "Operational",
    warrantyStatus: "Active",
    warrantyEnd: "Mar 20, 2025",
    contractType: "Full Service",
    lastService: "Mar 15, 2024",
    nextPM: "Jun 2024",
    openJobs: 0,
  },
  {
    id: "tool-3",
    serialNumber: "ETCH-2023-001",
    name: "Etch Tool 1",
    model: "ETCH-2000",
    status: "Operational",
    warrantyStatus: "Expiring",
    warrantyEnd: "May 1, 2024",
    contractType: "Parts Only",
    lastService: "Feb 28, 2024",
    nextPM: "May 2024",
    openJobs: 0,
  },
  {
    id: "tool-4",
    serialNumber: "PVD-2022-001",
    name: "PVD Tool 1",
    model: "PVD-1500",
    status: "Operational",
    warrantyStatus: "Expired",
    warrantyEnd: "Jun 15, 2023",
    contractType: "Full Service",
    lastService: "Jan 10, 2024",
    nextPM: "Apr 2024",
    openJobs: 0,
  },
];

const statusColors: Record<string, "success" | "warning" | "destructive" | "default"> = {
  "Operational": "success",
  "Under Service": "warning",
  "Down": "destructive",
};

const warrantyColors: Record<string, "success" | "warning" | "destructive" | "secondary"> = {
  "Active": "success",
  "Expiring": "warning",
  "Expired": "secondary",
};

export default function CustomerToolsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Tools</h2>
        <p className="text-gray-500">View your equipment fleet and service history</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search tools..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTools.map((tool) => (
          <Card key={tool.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{tool.name}</div>
                    <div className="text-sm text-gray-500">{tool.model} • {tool.serialNumber}</div>
                  </div>
                </div>
                <Badge variant={statusColors[tool.status]}>{tool.status}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-gray-500 mb-1">
                    <Shield className="h-4 w-4" />
                    Warranty
                  </div>
                  <Badge variant={warrantyColors[tool.warrantyStatus]} className="mb-1">
                    {tool.warrantyStatus}
                  </Badge>
                  <div className="text-xs text-gray-500">Until {tool.warrantyEnd}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gray-500 mb-1">
                    <FileText className="h-4 w-4" />
                    Contract
                  </div>
                  <div className="font-medium">{tool.contractType}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-gray-500">Last Service</div>
                  <div className="font-medium">{tool.lastService}</div>
                </div>
                <div>
                  <div className="text-gray-500">Next PM Due</div>
                  <div className="font-medium">{tool.nextPM}</div>
                </div>
              </div>

              {tool.openJobs > 0 && (
                <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg mb-4 text-sm">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-yellow-800">{tool.openJobs} active service visit</span>
                </div>
              )}

              <Link href={`/dashboard/customer/tools/${tool.id}`}>
                <Button variant="outline" className="w-full">
                  View Details & History
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
