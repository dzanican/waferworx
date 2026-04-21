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

export default function NewCustomerPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    industry: "",
    address: "",
    city: "",
    state: "",
    country: "USA",
    postalCode: "",
    phone: "",
    email: "",
    website: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.accountNumber) {
      addToast("Please fill in required fields", "error");
      return;
    }
    
    addToast("Customer created successfully", "success");
    router.push("/dashboard/management/customers");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/management/customers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">New Customer</h2>
          <p className="text-gray-500">Add a new customer to the system</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>Basic customer details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., Acme Semiconductor"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={(e) => handleChange("accountNumber", e.target.value)}
                placeholder="e.g., ACME-001"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Select
              id="industry"
              value={formData.industry}
              onChange={(e) => handleChange("industry", e.target.value)}
            >
              <option value="">Select industry...</option>
              <option value="Semiconductor Manufacturing">Semiconductor Manufacturing</option>
              <option value="Research & Development">Research & Development</option>
              <option value="Contract Manufacturing">Contract Manufacturing</option>
              <option value="Other">Other</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
          <CardDescription>Primary business address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="1234 Silicon Way"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Austin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="TX"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                id="country"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
              >
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
                <option value="Other">Other</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
                placeholder="78701"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Primary contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="555-0100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="support@company.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="www.company.com"
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
            placeholder="Additional notes about this customer..."
            rows={4}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Link href="/dashboard/management/customers">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Create Customer
        </Button>
      </div>
    </div>
  );
}
