"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import {
  Clock,
  Calendar,
  Save,
  Send,
  Download,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const categories = [
  { id: "travel", name: "Travel", code: "TRAVEL", billable: true },
  { id: "install", name: "Install", code: "INSTALL", billable: true },
  { id: "warranty", name: "Warranty", code: "WARRANTY", billable: false },
  { id: "paid_service", name: "Paid Service", code: "PAID_SVC", billable: true },
  { id: "training", name: "Training", code: "TRAINING", billable: true },
  { id: "internal", name: "Internal", code: "INTERNAL", billable: false },
];

const currentSheet = {
  id: "sheet-1",
  jobNumber: "JOB-2024-0001",
  jobTitle: "CVD-3000 Annual PM",
  customer: "Acme Semiconductor",
  weekYear: 2024,
  weekNumber: 15,
  weekStart: "Apr 8, 2024",
  weekEnd: "Apr 12, 2024",
  status: "draft",
};

type HoursGrid = Record<string, Record<string, number>>;

const initialHours: HoursGrid = {
  travel: { Monday: 4, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 },
  paid_service: { Monday: 0, Tuesday: 8, Wednesday: 9, Thursday: 0, Friday: 0 },
  warranty: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 },
  install: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 },
  training: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 },
  internal: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0 },
};

export default function TimesheetsPage() {
  const { addToast } = useToast();
  const [hours, setHours] = useState<HoursGrid>(initialHours);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("draft");

  const handleSaveDraft = () => {
    addToast("Timesheet saved as draft", "success");
  };

  const handleSubmit = () => {
    const total = getGrandTotal();
    if (total === 0) {
      addToast("Please enter hours before submitting", "error");
      return;
    }
    setStatus("submitted");
    addToast("Timesheet submitted for approval", "success");
  };

  const handleExportPDF = () => {
    addToast("Generating PDF export...", "info");
    setTimeout(() => {
      addToast("PDF downloaded successfully", "success");
    }, 1500);
  };

  const updateHours = (category: string, day: string, value: number) => {
    setHours((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [day]: value,
      },
    }));
  };

  const getCategoryTotal = (category: string) => {
    return Object.values(hours[category] || {}).reduce((sum, h) => sum + h, 0);
  };

  const getDayTotal = (day: string) => {
    return Object.keys(hours).reduce((sum, cat) => sum + (hours[cat][day] || 0), 0);
  };

  const getGrandTotal = () => {
    return Object.keys(hours).reduce((sum, cat) => sum + getCategoryTotal(cat), 0);
  };

  const getBillableTotal = () => {
    return categories
      .filter((c) => c.billable)
      .reduce((sum, c) => sum + getCategoryTotal(c.id), 0);
  };

  const getNonBillableTotal = () => {
    return categories
      .filter((c) => !c.billable)
      .reduce((sum, c) => sum + getCategoryTotal(c.id), 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Utilization Sheet</h2>
          <p className="text-gray-500">Log your hours by category for the work week</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="font-medium">WW{currentSheet.weekNumber} {currentSheet.weekYear}</span>
          </div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Job Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{currentSheet.jobNumber} - {currentSheet.jobTitle}</div>
              <div className="text-sm text-gray-500">{currentSheet.customer}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">{currentSheet.weekStart} - {currentSheet.weekEnd}</div>
              <Badge variant={status === "submitted" ? "success" : "secondary"} className="mt-1">{status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hours Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Hours by Category</CardTitle>
          <CardDescription>Enter hours worked each day by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-gray-500 w-40">Category</th>
                  {weekDays.map((day) => (
                    <th key={day} className="text-center py-3 px-2 font-medium text-gray-500 w-24">
                      {day.slice(0, 3)}
                    </th>
                  ))}
                  <th className="text-center py-3 px-2 font-medium text-gray-500 w-24">Total</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b">
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{category.name}</span>
                        {!category.billable && (
                          <span className="text-xs text-gray-400">(non-bill)</span>
                        )}
                      </div>
                    </td>
                    {weekDays.map((day) => (
                      <td key={day} className="py-2 px-2">
                        <Input
                          type="number"
                          min="0"
                          max="24"
                          step="0.5"
                          value={hours[category.id]?.[day] || 0}
                          onChange={(e) =>
                            updateHours(category.id, day, parseFloat(e.target.value) || 0)
                          }
                          className="w-16 text-center mx-auto"
                        />
                      </td>
                    ))}
                    <td className="py-2 px-2 text-center font-medium">
                      {getCategoryTotal(category.id)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-medium">
                  <td className="py-3 px-2">Daily Total</td>
                  {weekDays.map((day) => (
                    <td key={day} className="py-3 px-2 text-center">
                      {getDayTotal(day)}
                    </td>
                  ))}
                  <td className="py-3 px-2 text-center text-blue-600">
                    {getGrandTotal()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{getGrandTotal()}</div>
                <div className="text-sm text-gray-500">Total Hours</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{getBillableTotal()}</div>
                <div className="text-sm text-gray-500">Billable Hours</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{getNonBillableTotal()}</div>
                <div className="text-sm text-gray-500">Non-Billable Hours</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Add any notes about this week's work..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleExportPDF}>
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft} disabled={status === "submitted"}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleSubmit} disabled={status === "submitted"}>
            <Send className="h-4 w-4 mr-2" />
            {status === "submitted" ? "Submitted" : "Submit for Approval"}
          </Button>
        </div>
      </div>
    </div>
  );
}
