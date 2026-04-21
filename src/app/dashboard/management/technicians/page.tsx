"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Award,
} from "lucide-react";

const technicians = [
  {
    id: "tech-1",
    name: "John Technician",
    email: "john@waferworx.demo",
    phone: "555-0101",
    location: "Austin, TX",
    status: "On-site",
    currentJob: "JOB-2024-0001",
    currentCustomer: "Acme Semiconductor",
    certifications: ["CVD-3000", "PVD-1500"],
    hireDate: "Jan 2020",
    jobsCompleted: 145,
    utilization: 82,
  },
  {
    id: "tech-2",
    name: "Sarah Engineer",
    email: "sarah@waferworx.demo",
    phone: "555-0102",
    location: "San Jose, CA",
    status: "Available",
    currentJob: null,
    currentCustomer: null,
    certifications: ["CVD-3000", "ETCH-2000"],
    hireDate: "Mar 2021",
    jobsCompleted: 98,
    utilization: 78,
  },
  {
    id: "tech-3",
    name: "Mike Smith",
    email: "mike@waferworx.demo",
    phone: "555-0103",
    location: "Phoenix, AZ",
    status: "Available",
    currentJob: null,
    currentCustomer: null,
    certifications: ["CVD-3000", "PVD-1500", "ETCH-2000"],
    hireDate: "Jun 2019",
    jobsCompleted: 210,
    utilization: 72,
  },
];

const statusColors: Record<string, "success" | "warning" | "default" | "secondary"> = {
  "On-site": "warning",
  "Available": "success",
  "PTO": "secondary",
  "Training": "default",
};

export default function TechniciansPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTechnicians = technicians.filter(
    (tech) =>
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Technicians</h2>
          <p className="text-gray-500">Manage field service engineers</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Technician
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{technicians.length}</div>
                <div className="text-sm text-gray-500">Total Technicians</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Briefcase className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {technicians.filter((t) => t.status === "On-site").length}
                </div>
                <div className="text-sm text-gray-500">On-site</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {technicians.filter((t) => t.status === "Available").length}
                </div>
                <div className="text-sm text-gray-500">Available</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.round(technicians.reduce((sum, t) => sum + t.utilization, 0) / technicians.length)}%
                </div>
                <div className="text-sm text-gray-500">Avg Utilization</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search technicians..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Technicians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTechnicians.map((tech) => (
          <Card key={tech.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {tech.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{tech.name}</div>
                    <Badge variant={statusColors[tech.status]}>{tech.status}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {tech.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {tech.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {tech.location}
                </div>
              </div>

              {tech.currentJob && (
                <div className="p-3 bg-yellow-50 rounded-lg mb-4">
                  <div className="text-xs text-yellow-600 mb-1">Current Assignment</div>
                  <div className="font-medium text-yellow-900">{tech.currentJob}</div>
                  <div className="text-sm text-yellow-700">{tech.currentCustomer}</div>
                </div>
              )}

              <div className="flex flex-wrap gap-1 mb-4">
                {tech.certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-sm border-t pt-4">
                <div>
                  <div className="font-bold">{tech.jobsCompleted}</div>
                  <div className="text-xs text-gray-500">Jobs</div>
                </div>
                <div>
                  <div className="font-bold">{tech.utilization}%</div>
                  <div className="text-xs text-gray-500">Utilization</div>
                </div>
                <div>
                  <div className="font-bold">{tech.hireDate}</div>
                  <div className="text-xs text-gray-500">Since</div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
