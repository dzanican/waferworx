"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { ArrowLeft, Save } from "lucide-react";

export default function NewToolPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    serialNumber: "",
    name: "",
    model: "",
    platform: "",
    customerId: "",
    siteId: "",
    installDate: "",
    softwareVersion: "",
    chamberConfig: "",
    installedOptions: "",
    warrantyEndDate: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.serialNumber || !formData.name || !formData.platform) {
      addToast("Please fill in required fields", "error");
      return;
    }
    
    addToast("Tool created successfully", "success");
    router.push("/dashboard/management/tools");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/management/tools">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Add New Tool</h2>
          <p className="text-gray-500">Register a new tool in the system</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tool Information</CardTitle>
          <CardDescription>Basic tool identification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number *</Label>
              <Input
                id="serialNumber"
                value={formData.serialNumber}
                onChange={(e) => handleChange("serialNumber", e.target.value)}
                placeholder="e.g., CVD3K-2024-001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Tool Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., CVD Tool 1"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform *</Label>
              <Select
                id="platform"
                value={formData.platform}
                onChange={(e) => handleChange("platform", e.target.value)}
              >
                <option value="">Select platform...</option>
                <option value="CVD-3000">CVD-3000</option>
                <option value="ETCH-2000">ETCH-2000</option>
                <option value="PVD-1500">PVD-1500</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleChange("model", e.target.value)}
                placeholder="e.g., CVD-3000X"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
          <CardDescription>Where is this tool installed?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerId">Customer *</Label>
            <Select
              id="customerId"
              value={formData.customerId}
              onChange={(e) => handleChange("customerId", e.target.value)}
            >
              <option value="">Select customer...</option>
              <option value="cust-1">Acme Semiconductor</option>
              <option value="cust-2">TechFab Inc</option>
              <option value="cust-3">Silicon Valley Chips</option>
              <option value="cust-4">MegaChip Corp</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteId">Site</Label>
            <Select
              id="siteId"
              value={formData.siteId}
              onChange={(e) => handleChange("siteId", e.target.value)}
            >
              <option value="">Select site...</option>
              <option value="site-1">Fab 1 - Austin</option>
              <option value="site-2">Fab 2 - Dallas</option>
              <option value="site-3">Main Fab</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>Tool specifications and options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="installDate">Install Date</Label>
              <Input
                id="installDate"
                type="date"
                value={formData.installDate}
                onChange={(e) => handleChange("installDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="softwareVersion">Software Version</Label>
              <Input
                id="softwareVersion"
                value={formData.softwareVersion}
                onChange={(e) => handleChange("softwareVersion", e.target.value)}
                placeholder="e.g., v3.2.1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="chamberConfig">Chamber Configuration</Label>
            <Input
              id="chamberConfig"
              value={formData.chamberConfig}
              onChange={(e) => handleChange("chamberConfig", e.target.value)}
              placeholder="e.g., 4 chambers"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="installedOptions">Installed Options</Label>
            <Textarea
              id="installedOptions"
              value={formData.installedOptions}
              onChange={(e) => handleChange("installedOptions", e.target.value)}
              placeholder="List installed options..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Warranty</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="warrantyEndDate">Warranty End Date</Label>
            <Input
              id="warrantyEndDate"
              type="date"
              value={formData.warrantyEndDate}
              onChange={(e) => handleChange("warrantyEndDate", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Additional notes about this tool..."
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Link href="/dashboard/management/tools">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Add Tool
        </Button>
      </div>
    </div>
  );
}
