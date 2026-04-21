"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  CheckCircle,
  Circle,
  AlertTriangle,
  Clock,
  Save,
  Camera,
  MessageSquare,
} from "lucide-react";

type ChecklistItemStatus = "pending" | "pass" | "fail" | "na";

interface ChecklistItem {
  id: string;
  section: string;
  item: string;
  description?: string;
  status: ChecklistItemStatus;
  notes: string;
  requiresPhoto: boolean;
  hasPhoto: boolean;
}

const checklistData = {
  id: "cl-1",
  name: "CVD-3000 Annual PM Checklist",
  platform: "CVD-3000",
  version: "v2.1",
  jobNumber: "JOB-2024-0001",
  progress: 65,
};

const initialItems: ChecklistItem[] = [
  // Safety Section
  { id: "s1", section: "Safety Verification", item: "Verify LOTO procedures completed", status: "pass", notes: "", requiresPhoto: false, hasPhoto: false },
  { id: "s2", section: "Safety Verification", item: "Confirm all interlocks functional", status: "pass", notes: "", requiresPhoto: false, hasPhoto: false },
  { id: "s3", section: "Safety Verification", item: "Verify emergency stop operation", status: "pass", notes: "", requiresPhoto: false, hasPhoto: false },
  
  // Chamber 1
  { id: "c1-1", section: "Chamber 1", item: "Inspect chamber walls for deposits", status: "pass", notes: "Light deposits, cleaned", requiresPhoto: true, hasPhoto: true },
  { id: "c1-2", section: "Chamber 1", item: "Clean showerhead", status: "pass", notes: "", requiresPhoto: true, hasPhoto: true },
  { id: "c1-3", section: "Chamber 1", item: "Inspect and replace O-rings", status: "pass", notes: "O-rings in good condition", requiresPhoto: false, hasPhoto: false },
  { id: "c1-4", section: "Chamber 1", item: "Verify heater operation", status: "pass", notes: "", requiresPhoto: false, hasPhoto: false },
  
  // Chamber 2
  { id: "c2-1", section: "Chamber 2", item: "Inspect chamber walls for deposits", status: "pass", notes: "", requiresPhoto: true, hasPhoto: true },
  { id: "c2-2", section: "Chamber 2", item: "Clean showerhead", status: "pass", notes: "", requiresPhoto: true, hasPhoto: true },
  { id: "c2-3", section: "Chamber 2", item: "Inspect and replace O-rings", status: "pass", notes: "Worn O-rings replaced", requiresPhoto: false, hasPhoto: false },
  { id: "c2-4", section: "Chamber 2", item: "Verify heater operation", status: "pass", notes: "", requiresPhoto: false, hasPhoto: false },
  
  // Chamber 3
  { id: "c3-1", section: "Chamber 3", item: "Inspect chamber walls for deposits", status: "pending", notes: "", requiresPhoto: true, hasPhoto: false },
  { id: "c3-2", section: "Chamber 3", item: "Clean showerhead", status: "pending", notes: "", requiresPhoto: true, hasPhoto: false },
  { id: "c3-3", section: "Chamber 3", item: "Inspect and replace O-rings", status: "pending", notes: "", requiresPhoto: false, hasPhoto: false },
  { id: "c3-4", section: "Chamber 3", item: "Verify heater operation", status: "pending", notes: "", requiresPhoto: false, hasPhoto: false },
  
  // Chamber 4
  { id: "c4-1", section: "Chamber 4", item: "Inspect chamber walls for deposits", status: "pending", notes: "", requiresPhoto: true, hasPhoto: false },
  { id: "c4-2", section: "Chamber 4", item: "Clean showerhead", status: "pending", notes: "", requiresPhoto: true, hasPhoto: false },
  { id: "c4-3", section: "Chamber 4", item: "Inspect and replace O-rings", status: "pending", notes: "", requiresPhoto: false, hasPhoto: false },
  { id: "c4-4", section: "Chamber 4", item: "Verify heater operation", status: "pending", notes: "", requiresPhoto: false, hasPhoto: false },
  
  // RF System
  { id: "rf-1", section: "RF System", item: "Inspect RF generator filters", status: "pending", notes: "", requiresPhoto: false, hasPhoto: false },
  { id: "rf-2", section: "RF System", item: "Check RF cable connections", status: "pending", notes: "", requiresPhoto: false, hasPhoto: false },
  { id: "rf-3", section: "RF System", item: "Verify forward/reflected power readings", status: "pending", notes: "", requiresPhoto: false, hasPhoto: false },
  
  // Vacuum System
  { id: "v-1", section: "Vacuum System", item: "Check turbo pump operation", status: "pending", notes: "", requiresPhoto: false, hasPhoto: false },
  { id: "v-2", section: "Vacuum System", item: "Verify base pressure", status: "pending", notes: "", requiresPhoto: false, hasPhoto: false },
  { id: "v-3", section: "Vacuum System", item: "Inspect vacuum lines for leaks", status: "pending", notes: "", requiresPhoto: false, hasPhoto: false },
];

const statusIcons: Record<ChecklistItemStatus, React.ReactNode> = {
  pending: <Circle className="h-5 w-5 text-gray-300" />,
  pass: <CheckCircle className="h-5 w-5 text-green-500" />,
  fail: <AlertTriangle className="h-5 w-5 text-red-500" />,
  na: <Circle className="h-5 w-5 text-gray-400" />,
};

export default function ChecklistPage() {
  const params = useParams();
  const [items, setItems] = useState<ChecklistItem[]>(initialItems);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const sections = [...new Set(items.map((i) => i.section))];

  const updateItemStatus = (id: string, status: ChecklistItemStatus) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const updateItemNotes = (id: string, notes: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  };

  const getProgress = () => {
    const completed = items.filter((i) => i.status !== "pending").length;
    return Math.round((completed / items.length) * 100);
  };

  const getSectionProgress = (section: string) => {
    const sectionItems = items.filter((i) => i.section === section);
    const completed = sectionItems.filter((i) => i.status !== "pending").length;
    return { completed, total: sectionItems.length };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/technician/jobs/${params.id}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{checklistData.name}</h2>
            <p className="text-gray-500">{checklistData.jobNumber} • {checklistData.platform}</p>
          </div>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Progress
        </Button>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Overall Progress</span>
            <span className="text-sm text-gray-500">{getProgress()}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
          <div className="flex gap-4 mt-3 text-sm">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              {items.filter((i) => i.status === "pass").length} Pass
            </span>
            <span className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              {items.filter((i) => i.status === "fail").length} Fail
            </span>
            <span className="flex items-center gap-1">
              <Circle className="h-4 w-4 text-gray-300" />
              {items.filter((i) => i.status === "pending").length} Pending
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Checklist Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const sectionProgress = getSectionProgress(section);
          const sectionItems = items.filter((i) => i.section === section);
          const isComplete = sectionProgress.completed === sectionProgress.total;

          return (
            <Card key={section}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {isComplete ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                    {section}
                  </CardTitle>
                  <Badge variant={isComplete ? "success" : "secondary"}>
                    {sectionProgress.completed} / {sectionProgress.total}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sectionItems.map((item) => (
                    <div
                      key={item.id}
                      className={`border rounded-lg transition-all ${
                        expandedItem === item.id ? "border-blue-300 bg-blue-50" : ""
                      }`}
                    >
                      <div
                        className="flex items-center gap-3 p-3 cursor-pointer"
                        onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                      >
                        {statusIcons[item.status]}
                        <span className="flex-1">{item.item}</span>
                        {item.requiresPhoto && (
                          <Camera className={`h-4 w-4 ${item.hasPhoto ? "text-green-500" : "text-gray-400"}`} />
                        )}
                        {item.notes && <MessageSquare className="h-4 w-4 text-blue-500" />}
                        <div className="flex gap-1">
                          <Button
                            variant={item.status === "pass" ? "default" : "outline"}
                            size="sm"
                            className="h-7 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateItemStatus(item.id, "pass");
                            }}
                          >
                            Pass
                          </Button>
                          <Button
                            variant={item.status === "fail" ? "destructive" : "outline"}
                            size="sm"
                            className="h-7 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateItemStatus(item.id, "fail");
                            }}
                          >
                            Fail
                          </Button>
                          <Button
                            variant={item.status === "na" ? "secondary" : "outline"}
                            size="sm"
                            className="h-7 px-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateItemStatus(item.id, "na");
                            }}
                          >
                            N/A
                          </Button>
                        </div>
                      </div>
                      {expandedItem === item.id && (
                        <div className="px-3 pb-3 pt-0 space-y-3 border-t">
                          <div className="pt-3">
                            <label className="text-sm font-medium text-gray-700">Notes</label>
                            <Textarea
                              value={item.notes}
                              onChange={(e) => updateItemNotes(item.id, e.target.value)}
                              placeholder="Add notes..."
                              rows={2}
                              className="mt-1"
                            />
                          </div>
                          {item.requiresPhoto && (
                            <div>
                              <label className="text-sm font-medium text-gray-700">Photo</label>
                              <Button variant="outline" size="sm" className="mt-1 w-full">
                                <Camera className="h-4 w-4 mr-2" />
                                {item.hasPhoto ? "View/Replace Photo" : "Add Photo"}
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
