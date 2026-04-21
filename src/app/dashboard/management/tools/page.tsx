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
  Eye,
  Edit,
  Cpu,
  Building2,
  Shield,
  Calendar,
} from "lucide-react";

const tools = [
  {
    id: "tool-1",
    serialNumber: "CVD3K-2024-001",
    name: "CVD Tool 1",
    model: "CVD-3000X",
    platform: "CVD-3000",
    customer: "Acme Semiconductor",
    site: "Fab 1 - Austin",
    status: "Under Service",
    warrantyStatus: "Active",
    warrantyEnd: "Jan 15, 2025",
    contractStatus: "Full Service",
    installDate: "Jan 15, 2024",
  },
  {
    id: "tool-2",
    serialNumber: "CVD3K-2023-002",
    name: "CVD Tool 2",
    model: "CVD-3000X",
    platform: "CVD-3000",
    customer: "Acme Semiconductor",
    site: "Fab 1 - Austin",
    status: "Operational",
    warrantyStatus: "Active",
    warrantyEnd: "Mar 20, 2025",
    contractStatus: "Full Service",
    installDate: "Mar 20, 2023",
  },
  {
    id: "tool-3",
    serialNumber: "ETCH-2023-001",
    name: "Etch Tool 1",
    model: "ETCH-2000",
    platform: "ETCH-2000",
    customer: "TechFab Inc",
    site: "Main Fab",
    status: "Operational",
    warrantyStatus: "Expiring",
    warrantyEnd: "May 1, 2024",
    contractStatus: "Parts Only",
    installDate: "May 1, 2023",
  },
  {
    id: "tool-4",
    serialNumber: "PVD-2022-001",
    name: "PVD Tool 1",
    model: "PVD-1500",
    platform: "PVD-1500",
    customer: "Silicon Valley Chips",
    site: "Fab 2",
    status: "Operational",
    warrantyStatus: "Expired",
    warrantyEnd: "Jun 15, 2023",
    contractStatus: "Full Service",
    installDate: "Jun 15, 2022",
  },
  {
    id: "tool-5",
    serialNumber: "CVD3K-2024-003",
    name: "New CVD Tool",
    model: "CVD-3000X",
    platform: "CVD-3000",
    customer: "MegaChip Corp",
    site: "New Fab",
    status: "Installation",
    warrantyStatus: "Pending",
    warrantyEnd: "TBD",
    contractStatus: "None",
    installDate: "Pending",
  },
];

const statusColors: Record<string, "success" | "warning" | "destructive" | "default" | "secondary"> = {
  "Operational": "success",
  "Under Service": "warning",
  "Down": "destructive",
  "Installation": "default",
  "Decommissioned": "secondary",
};

const warrantyColors: Record<string, "success" | "warning" | "destructive" | "secondary"> = {
  "Active": "success",
  "Expiring": "warning",
  "Expired": "destructive",
  "Pending": "secondary",
};

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.customer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || tool.status === statusFilter;
    const matchesPlatform = platformFilter === "all" || tool.platform === platformFilter;

    return matchesSearch && matchesStatus && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tools</h2>
          <p className="text-gray-500">Manage equipment install base</p>
        </div>
        <Link href="/dashboard/management/tools/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Tool
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
                placeholder="Search by serial, name, or customer..."
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
                <option value="Operational">Operational</option>
                <option value="Under Service">Under Service</option>
                <option value="Down">Down</option>
                <option value="Installation">Installation</option>
              </Select>
              <Select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
              >
                <option value="all">All Platforms</option>
                <option value="CVD-3000">CVD-3000</option>
                <option value="ETCH-2000">ETCH-2000</option>
                <option value="PVD-1500">PVD-1500</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tools Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tools ({filteredTools.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool</TableHead>
                <TableHead>Customer / Site</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Warranty</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Cpu className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{tool.name}</div>
                        <div className="text-sm text-gray-500">{tool.model} • {tool.serialNumber}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">{tool.customer}</div>
                        <div className="text-xs text-gray-500">{tool.site}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[tool.status]}>{tool.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <div>
                        <Badge variant={warrantyColors[tool.warrantyStatus]} className="mb-1">
                          {tool.warrantyStatus}
                        </Badge>
                        <div className="text-xs text-gray-500">{tool.warrantyEnd}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{tool.contractStatus}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/dashboard/management/tools/${tool.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/management/tools/${tool.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
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
