"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Search,
  Download,
  AlertTriangle,
  FileText,
  ExternalLink,
  Bell,
  CheckCircle,
  Clock,
} from "lucide-react";

const serviceManuals = [
  {
    id: "m-1",
    name: "CVD-3000 Service Manual",
    platform: "CVD-3000",
    version: "v3.2",
    lastUpdated: "Jan 2024",
    size: "45 MB",
  },
  {
    id: "m-2",
    name: "CVD-3000 PM Procedures",
    platform: "CVD-3000",
    version: "v2.1",
    lastUpdated: "Mar 2024",
    size: "12 MB",
  },
  {
    id: "m-3",
    name: "RF Generator Maintenance Guide",
    platform: "CVD-3000",
    version: "v1.5",
    lastUpdated: "Nov 2023",
    size: "8 MB",
  },
  {
    id: "m-4",
    name: "ETCH-2000 Service Manual",
    platform: "ETCH-2000",
    version: "v4.0",
    lastUpdated: "Feb 2024",
    size: "52 MB",
  },
  {
    id: "m-5",
    name: "PVD-1500 Service Manual",
    platform: "PVD-1500",
    version: "v2.8",
    lastUpdated: "Dec 2023",
    size: "38 MB",
  },
];

const serviceBulletins = [
  {
    id: "sb-1",
    number: "SB-2024-003",
    title: "CVD-3000 RF Generator Capacitor Replacement",
    platform: "CVD-3000",
    severity: "high",
    status: "active",
    publishedDate: "Mar 15, 2024",
    summary: "Certain RF generator models may experience premature capacitor failure. Immediate inspection recommended.",
    affectedSerials: "CVD3K-2022-* through CVD3K-2023-*",
    action: "Inspect and replace if necessary",
  },
  {
    id: "sb-2",
    number: "SB-2024-002",
    title: "CVD-3000 Software Update v3.2.1",
    platform: "CVD-3000",
    severity: "medium",
    status: "active",
    publishedDate: "Feb 28, 2024",
    summary: "Software update addresses particle monitoring calibration drift issue.",
    affectedSerials: "All CVD-3000 systems",
    action: "Update software during next PM",
  },
  {
    id: "sb-3",
    number: "SB-2024-001",
    title: "ETCH-2000 Chamber Seal Improvement",
    platform: "ETCH-2000",
    severity: "low",
    status: "active",
    publishedDate: "Jan 10, 2024",
    summary: "New chamber seal design improves vacuum integrity and reduces maintenance frequency.",
    affectedSerials: "All ETCH-2000 systems",
    action: "Replace seals during next PM",
  },
  {
    id: "sb-4",
    number: "SB-2023-015",
    title: "PVD-1500 Target Mounting Update",
    platform: "PVD-1500",
    severity: "medium",
    status: "superseded",
    publishedDate: "Oct 5, 2023",
    summary: "Updated target mounting procedure to prevent arcing.",
    affectedSerials: "PVD-2020-* through PVD-2022-*",
    action: "Follow updated procedure",
  },
];

const fieldChangeNotices = [
  {
    id: "fcn-1",
    number: "FCN-2024-001",
    title: "CVD-3000 Chamber Heater Upgrade",
    platform: "CVD-3000",
    type: "upgrade",
    status: "available",
    description: "New heater design provides 20% faster temperature ramp and improved uniformity.",
    partNumber: "HTR-CVD-003",
  },
  {
    id: "fcn-2",
    number: "FCN-2023-008",
    title: "ETCH-2000 Endpoint Detection Enhancement",
    platform: "ETCH-2000",
    type: "modification",
    status: "available",
    description: "Enhanced endpoint detection algorithm for improved process control.",
    partNumber: "SW-ETCH-EPD-2.0",
  },
];

const severityColors: Record<string, "default" | "warning" | "destructive"> = {
  low: "default",
  medium: "warning",
  high: "destructive",
};

const statusColors: Record<string, "success" | "secondary" | "default"> = {
  active: "success",
  superseded: "secondary",
  available: "default",
};

export default function ManualsPage() {
  const [activeTab, setActiveTab] = useState("bulletins");
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");

  const filteredManuals = serviceManuals.filter(
    (m) =>
      (platformFilter === "all" || m.platform === platformFilter) &&
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBulletins = serviceBulletins.filter(
    (b) =>
      (platformFilter === "all" || b.platform === platformFilter) &&
      (b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.number.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Manuals & Bulletins</h2>
        <p className="text-gray-500">Service documentation and technical bulletins</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
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
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="bulletins">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Service Bulletins
          </TabsTrigger>
          <TabsTrigger value="fcn">
            <Bell className="h-4 w-4 mr-2" />
            Field Changes
          </TabsTrigger>
          <TabsTrigger value="manuals">
            <BookOpen className="h-4 w-4 mr-2" />
            Manuals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bulletins">
          <div className="space-y-4">
            {filteredBulletins.map((bulletin) => (
              <Card key={bulletin.id} className={bulletin.severity === "high" ? "border-l-4 border-l-red-500" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{bulletin.number}</Badge>
                        <Badge variant={severityColors[bulletin.severity]}>{bulletin.severity}</Badge>
                        <Badge variant={statusColors[bulletin.status]}>{bulletin.status}</Badge>
                      </div>
                      <h3 className="font-medium text-lg">{bulletin.title}</h3>
                      <p className="text-sm text-gray-600">{bulletin.summary}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Platform: </span>
                          <span className="font-medium">{bulletin.platform}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Published: </span>
                          <span>{bulletin.publishedDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Affected: </span>
                          <span>{bulletin.affectedSerials}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Action: </span>
                          <span className="font-medium text-blue-600">{bulletin.action}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fcn">
          <div className="space-y-4">
            {fieldChangeNotices.map((fcn) => (
              <Card key={fcn.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{fcn.number}</Badge>
                        <Badge variant="secondary">{fcn.type}</Badge>
                        <Badge variant={statusColors[fcn.status]}>{fcn.status}</Badge>
                      </div>
                      <h3 className="font-medium text-lg">{fcn.title}</h3>
                      <p className="text-sm text-gray-600">{fcn.description}</p>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Platform: </span>
                          <span className="font-medium">{fcn.platform}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Part #: </span>
                          <span className="font-mono">{fcn.partNumber}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="manuals">
          <Card>
            <CardHeader>
              <CardTitle>Service Documentation</CardTitle>
              <CardDescription>Download service manuals and procedures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredManuals.map((manual) => (
                  <div key={manual.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="font-medium">{manual.name}</div>
                        <div className="text-sm text-gray-500">
                          {manual.platform} • {manual.version} • Updated {manual.lastUpdated}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{manual.size}</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
