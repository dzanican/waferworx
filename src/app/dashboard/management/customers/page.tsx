"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Building2,
  MapPin,
  Cpu,
  FileText,
} from "lucide-react";

const customers = [
  {
    id: "cust-1",
    name: "Acme Semiconductor",
    accountNumber: "ACME-001",
    industry: "Semiconductor Manufacturing",
    sites: 2,
    tools: 4,
    activeJobs: 1,
    contractStatus: "Active",
  },
  {
    id: "cust-2",
    name: "TechFab Inc",
    accountNumber: "TECH-002",
    industry: "Semiconductor Manufacturing",
    sites: 1,
    tools: 2,
    activeJobs: 1,
    contractStatus: "Active",
  },
  {
    id: "cust-3",
    name: "Silicon Valley Chips",
    accountNumber: "SVC-003",
    industry: "Semiconductor Manufacturing",
    sites: 1,
    tools: 3,
    activeJobs: 0,
    contractStatus: "Expiring",
  },
  {
    id: "cust-4",
    name: "MegaChip Corp",
    accountNumber: "MEGA-004",
    industry: "Semiconductor Manufacturing",
    sites: 1,
    tools: 1,
    activeJobs: 1,
    contractStatus: "None",
  },
];

const contractColors: Record<string, "success" | "warning" | "secondary"> = {
  "Active": "success",
  "Expiring": "warning",
  "None": "secondary",
};

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
          <p className="text-gray-500">Manage customer accounts and sites</p>
        </div>
        <Link href="/dashboard/management/customers/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </Link>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Sites</TableHead>
                <TableHead>Tools</TableHead>
                <TableHead>Active Jobs</TableHead>
                <TableHead>Contract</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.accountNumber}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{customer.sites}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Cpu className="h-4 w-4 text-gray-400" />
                      <span>{customer.tools}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>{customer.activeJobs}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={contractColors[customer.contractStatus]}>
                      {customer.contractStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/dashboard/management/customers/${customer.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/dashboard/management/customers/${customer.id}/edit`}>
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
