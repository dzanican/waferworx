"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  AlertTriangle,
  Search,
  Wrench,
} from "lucide-react";

const subsystems = [
  { id: "sub-1", name: "Chamber", code: "CHM" },
  { id: "sub-2", name: "RF System", code: "RF" },
  { id: "sub-3", name: "Vacuum System", code: "VAC" },
  { id: "sub-4", name: "Gas Delivery", code: "GAS" },
  { id: "sub-5", name: "Temperature Control", code: "TEMP" },
  { id: "sub-6", name: "Load Lock", code: "LL" },
  { id: "sub-7", name: "Software/Controls", code: "SW" },
  { id: "sub-8", name: "Wafer Handling", code: "WH" },
];

const symptomCodes = [
  { id: "sym-1", code: "SYM-001", name: "Particle contamination", subsystem: "CHM" },
  { id: "sym-2", code: "SYM-002", name: "Process drift", subsystem: "CHM" },
  { id: "sym-3", code: "SYM-003", name: "Power fluctuation", subsystem: "RF" },
  { id: "sym-4", code: "SYM-004", name: "Arcing", subsystem: "RF" },
  { id: "sym-5", code: "SYM-005", name: "Vacuum leak", subsystem: "VAC" },
  { id: "sym-6", code: "SYM-006", name: "Pump failure", subsystem: "VAC" },
  { id: "sym-7", code: "SYM-007", name: "Temperature instability", subsystem: "TEMP" },
  { id: "sym-8", code: "SYM-008", name: "Gas flow error", subsystem: "GAS" },
  { id: "sym-9", code: "SYM-009", name: "Wafer transfer error", subsystem: "WH" },
  { id: "sym-10", code: "SYM-010", name: "Software error", subsystem: "SW" },
];

const causeCodes = [
  { id: "cau-1", code: "CAU-001", name: "Worn O-ring/seal" },
  { id: "cau-2", code: "CAU-002", name: "Component failure" },
  { id: "cau-3", code: "CAU-003", name: "Contamination" },
  { id: "cau-4", code: "CAU-004", name: "Calibration drift" },
  { id: "cau-5", code: "CAU-005", name: "Loose connection" },
  { id: "cau-6", code: "CAU-006", name: "Software bug" },
  { id: "cau-7", code: "CAU-007", name: "Operator error" },
  { id: "cau-8", code: "CAU-008", name: "End of life" },
  { id: "cau-9", code: "CAU-009", name: "Environmental" },
  { id: "cau-10", code: "CAU-010", name: "Unknown" },
];

const actionCodes = [
  { id: "act-1", code: "ACT-001", name: "Replaced component" },
  { id: "act-2", code: "ACT-002", name: "Cleaned" },
  { id: "act-3", code: "ACT-003", name: "Calibrated" },
  { id: "act-4", code: "ACT-004", name: "Adjusted" },
  { id: "act-5", code: "ACT-005", name: "Repaired" },
  { id: "act-6", code: "ACT-006", name: "Software update" },
  { id: "act-7", code: "ACT-007", name: "Retrained operator" },
  { id: "act-8", code: "ACT-008", name: "No action required" },
  { id: "act-9", code: "ACT-009", name: "Escalated" },
  { id: "act-10", code: "ACT-010", name: "Monitoring" },
];

interface FailureCodingEntry {
  id: string;
  subsystem: string;
  symptom: string;
  suspectedCause: string;
  confirmedCause: string;
  action: string;
  notes: string;
}

const existingEntries: FailureCodingEntry[] = [
  {
    id: "fc-1",
    subsystem: "sub-6",
    symptom: "sym-1",
    suspectedCause: "cau-1",
    confirmedCause: "cau-1",
    action: "act-1",
    notes: "Worn O-rings on chamber 2 load lock causing particle contamination. Replaced O-ring kit.",
  },
];

export default function FailureCodingPage() {
  const params = useParams();
  const [entries, setEntries] = useState<FailureCodingEntry[]>(existingEntries);
  const [newEntry, setNewEntry] = useState<Partial<FailureCodingEntry>>({
    subsystem: "",
    symptom: "",
    suspectedCause: "",
    confirmedCause: "",
    action: "",
    notes: "",
  });

  const addEntry = () => {
    if (newEntry.subsystem && newEntry.symptom && newEntry.action) {
      setEntries([
        ...entries,
        {
          id: `fc-${Date.now()}`,
          subsystem: newEntry.subsystem,
          symptom: newEntry.symptom,
          suspectedCause: newEntry.suspectedCause || "",
          confirmedCause: newEntry.confirmedCause || "",
          action: newEntry.action,
          notes: newEntry.notes || "",
        },
      ]);
      setNewEntry({
        subsystem: "",
        symptom: "",
        suspectedCause: "",
        confirmedCause: "",
        action: "",
        notes: "",
      });
    }
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const getSubsystemName = (id: string) => subsystems.find((s) => s.id === id)?.name || "";
  const getSymptomName = (id: string) => symptomCodes.find((s) => s.id === id)?.name || "";
  const getCauseName = (id: string) => causeCodes.find((c) => c.id === id)?.name || "";
  const getActionName = (id: string) => actionCodes.find((a) => a.id === id)?.name || "";

  const filteredSymptoms = newEntry.subsystem
    ? symptomCodes.filter(
        (s) => s.subsystem === subsystems.find((sub) => sub.id === newEntry.subsystem)?.code
      )
    : symptomCodes;

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
            <h2 className="text-2xl font-bold text-gray-900">Failure Coding</h2>
            <p className="text-gray-500">JOB-2024-0001 - CVD-3000 Annual PM</p>
          </div>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Why is failure coding important?</p>
              <p className="mt-1">
                Structured failure coding enables analytics on recurring issues, helps identify
                patterns across tools and customers, and improves first-time fix rates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing Entries */}
      {entries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recorded Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{getSubsystemName(entry.subsystem)}</Badge>
                        <span className="font-medium">{getSymptomName(entry.symptom)}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Suspected Cause: </span>
                          <span>{getCauseName(entry.suspectedCause) || "—"}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Confirmed Cause: </span>
                          <span>{getCauseName(entry.confirmedCause) || "—"}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Action: </span>
                          <span className="font-medium text-green-700">{getActionName(entry.action)}</span>
                        </div>
                      </div>
                      {entry.notes && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{entry.notes}</p>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeEntry(entry.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Entry */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Failure Coding Entry
          </CardTitle>
          <CardDescription>Record symptom, cause, and corrective action</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subsystem">Subsystem *</Label>
              <Select
                id="subsystem"
                value={newEntry.subsystem}
                onChange={(e) => setNewEntry({ ...newEntry, subsystem: e.target.value, symptom: "" })}
              >
                <option value="">Select subsystem...</option>
                {subsystems.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    [{sub.code}] {sub.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="symptom">Symptom *</Label>
              <Select
                id="symptom"
                value={newEntry.symptom}
                onChange={(e) => setNewEntry({ ...newEntry, symptom: e.target.value })}
              >
                <option value="">Select symptom...</option>
                {filteredSymptoms.map((sym) => (
                  <option key={sym.id} value={sym.id}>
                    [{sym.code}] {sym.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="suspectedCause">Suspected Cause</Label>
              <Select
                id="suspectedCause"
                value={newEntry.suspectedCause}
                onChange={(e) => setNewEntry({ ...newEntry, suspectedCause: e.target.value })}
              >
                <option value="">Select cause...</option>
                {causeCodes.map((cause) => (
                  <option key={cause.id} value={cause.id}>
                    [{cause.code}] {cause.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmedCause">Confirmed Cause</Label>
              <Select
                id="confirmedCause"
                value={newEntry.confirmedCause}
                onChange={(e) => setNewEntry({ ...newEntry, confirmedCause: e.target.value })}
              >
                <option value="">Select cause...</option>
                {causeCodes.map((cause) => (
                  <option key={cause.id} value={cause.id}>
                    [{cause.code}] {cause.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="action">Corrective Action *</Label>
            <Select
              id="action"
              value={newEntry.action}
              onChange={(e) => setNewEntry({ ...newEntry, action: e.target.value })}
            >
              <option value="">Select action...</option>
              {actionCodes.map((action) => (
                <option key={action.id} value={action.id}>
                  [{action.code}] {action.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={newEntry.notes}
              onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
              placeholder="Additional details about the issue and resolution..."
              rows={3}
            />
          </div>

          <Button onClick={addEntry} disabled={!newEntry.subsystem || !newEntry.symptom || !newEntry.action}>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
