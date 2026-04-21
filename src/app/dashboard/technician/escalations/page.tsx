"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/toast";
import {
  AlertTriangle,
  Plus,
  Phone,
  Video,
  MessageSquare,
  Clock,
  CheckCircle,
  User,
  Calendar,
  FileText,
} from "lucide-react";

interface Escalation {
  id: string;
  jobNumber: string;
  customer: string;
  tool: string;
  issue: string;
  severity: string;
  status: string;
  owner?: string;
  createdAt: string;
  lastUpdate?: string;
  resolution?: string;
  closedAt?: string;
}

interface SupportLog {
  id: string;
  escalationId: string;
  date: string;
  type: string;
  duration: string;
  engineer: string;
  summary: string;
  recommendations: string;
}

const initialEscalations: Escalation[] = [
  {
    id: "esc-1",
    jobNumber: "JOB-2024-0001",
    customer: "Acme Semiconductor",
    tool: "CVD-3000X",
    issue: "Chamber 3 elevated particle counts after cleaning",
    severity: "medium",
    status: "open",
    owner: "Engineering Support",
    createdAt: "Apr 10, 2024",
    lastUpdate: "Apr 10, 2024 2:30 PM",
  },
];

const initialSupportLogs: SupportLog[] = [
  {
    id: "rs-1",
    escalationId: "esc-1",
    date: "Apr 10, 2024 2:30 PM",
    type: "phone",
    duration: "25 min",
    engineer: "Dr. Sarah Chen",
    summary: "Discussed particle count issue. Recommended additional chamber seasoning cycles. Will follow up tomorrow.",
    recommendations: "Run 3 additional seasoning cycles before qualification wafers.",
  },
  {
    id: "rs-2",
    escalationId: "esc-1",
    date: "Apr 10, 2024 11:00 AM",
    type: "video",
    duration: "45 min",
    engineer: "Mike Johnson",
    summary: "Remote session to review chamber cleaning procedure. Identified potential contamination source near load lock.",
    recommendations: "Clean load lock area thoroughly. Check O-ring seating.",
  },
];

const initialClosedEscalations: Escalation[] = [
  {
    id: "esc-2",
    jobNumber: "JOB-2024-0004",
    customer: "Acme Semiconductor",
    tool: "CVD-3000X",
    issue: "RF generator intermittent power fluctuations",
    severity: "high",
    status: "resolved",
    resolution: "Replaced RF generator. Root cause: capacitor failure.",
    createdAt: "Mar 10, 2024",
    closedAt: "Mar 15, 2024",
  },
];

const severityColors: Record<string, "default" | "warning" | "destructive"> = {
  low: "default",
  medium: "warning",
  high: "destructive",
};

const typeIcons: Record<string, React.ReactNode> = {
  phone: <Phone className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  chat: <MessageSquare className="h-4 w-4" />,
};

export default function EscalationsPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("active");
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showLogDialog, setShowLogDialog] = useState(false);
  const [activeEscalations, setActiveEscalations] = useState<Escalation[]>(initialEscalations);
  const [closedEscalations, setClosedEscalations] = useState<Escalation[]>(initialClosedEscalations);
  const [remoteSupportLogs, setRemoteSupportLogs] = useState<SupportLog[]>(initialSupportLogs);
  const [newEscalation, setNewEscalation] = useState({
    job: "job-1",
    severity: "medium",
    issue: "",
    attempted: "",
  });
  const [newSession, setNewSession] = useState({
    type: "phone",
    duration: "",
    engineer: "",
    summary: "",
    recommendations: "",
  });

  const handleCreateEscalation = () => {
    if (!newEscalation.issue) {
      addToast("Please describe the issue", "error");
      return;
    }
    
    const escalation: Escalation = {
      id: `esc-${Date.now()}`,
      jobNumber: "JOB-2024-0001",
      customer: "Acme Semiconductor",
      tool: "CVD-3000X",
      issue: newEscalation.issue,
      severity: newEscalation.severity,
      status: "open",
      owner: "Engineering Support",
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      lastUpdate: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
    };
    
    setActiveEscalations((prev) => [escalation, ...prev]);
    addToast("Escalation created successfully", "success");
    setShowNewDialog(false);
    setNewEscalation({ job: "job-1", severity: "medium", issue: "", attempted: "" });
  };

  const handleLogSession = () => {
    if (!newSession.summary) {
      addToast("Please provide a session summary", "error");
      return;
    }
    
    const session: SupportLog = {
      id: `rs-${Date.now()}`,
      escalationId: activeEscalations[0]?.id || "esc-1",
      date: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
      type: newSession.type,
      duration: newSession.duration || "N/A",
      engineer: newSession.engineer || "Unknown",
      summary: newSession.summary,
      recommendations: newSession.recommendations,
    };
    
    setRemoteSupportLogs((prev) => [session, ...prev]);
    addToast("Support session logged", "success");
    setShowLogDialog(false);
    setNewSession({ type: "phone", duration: "", engineer: "", summary: "", recommendations: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Escalations</h2>
          <p className="text-gray-500">Manage escalations and remote support sessions</p>
        </div>
        <Button onClick={() => setShowNewDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Escalation
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Active ({activeEscalations.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            <CheckCircle className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeEscalations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Active Escalations</h3>
                <p className="text-gray-500">All issues are resolved</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {activeEscalations.map((esc) => (
                <Card key={esc.id} className="border-l-4 border-l-yellow-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          {esc.issue}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {esc.jobNumber} • {esc.customer} • {esc.tool}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={severityColors[esc.severity]}>{esc.severity}</Badge>
                        <Badge variant="warning">{esc.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <div className="text-gray-500">Owner</div>
                        <div className="font-medium">{esc.owner}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Created</div>
                        <div className="font-medium">{esc.createdAt}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Last Update</div>
                        <div className="font-medium">{esc.lastUpdate}</div>
                      </div>
                    </div>

                    {/* Remote Support Logs */}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Remote Support Sessions</h4>
                        <Button variant="outline" size="sm" onClick={() => setShowLogDialog(true)}>
                          <Plus className="h-4 w-4 mr-1" />
                          Log Session
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {remoteSupportLogs
                          .filter((log) => log.escalationId === esc.id)
                          .map((log) => (
                            <div key={log.id} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {typeIcons[log.type]}
                                  <span className="font-medium text-sm">{log.engineer}</span>
                                  <Badge variant="secondary" className="text-xs">
                                    {log.duration}
                                  </Badge>
                                </div>
                                <span className="text-xs text-gray-500">{log.date}</span>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{log.summary}</p>
                              {log.recommendations && (
                                <div className="text-sm bg-blue-50 p-2 rounded">
                                  <span className="font-medium text-blue-800">Recommendation: </span>
                                  <span className="text-blue-700">{log.recommendations}</span>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Add Update
                      </Button>
                      <Button variant="outline" className="text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Resolve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Escalations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {closedEscalations.map((esc) => (
                  <div key={esc.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{esc.issue}</div>
                      <div className="text-sm text-gray-500">
                        {esc.jobNumber} • {esc.customer} • {esc.tool}
                      </div>
                      <div className="text-sm text-green-600 mt-1">
                        Resolution: {esc.resolution}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="success">Resolved</Badge>
                      <div className="text-xs text-gray-500 mt-1">{esc.closedAt}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Escalation Dialog */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="max-w-lg" onClose={() => setShowNewDialog(false)}>
          <DialogHeader>
            <DialogTitle>Create Escalation</DialogTitle>
            <DialogDescription>Request engineering support for a technical issue</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="job">Job</Label>
              <Select
                id="job"
                value={newEscalation.job}
                onChange={(e) => setNewEscalation({ ...newEscalation, job: e.target.value })}
              >
                <option value="job-1">JOB-2024-0001 - CVD-3000 Annual PM</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select
                id="severity"
                value={newEscalation.severity}
                onChange={(e) => setNewEscalation({ ...newEscalation, severity: e.target.value })}
              >
                <option value="low">Low - Question or guidance needed</option>
                <option value="medium">Medium - Issue blocking progress</option>
                <option value="high">High - Critical issue, tool down</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="issue">Issue Description *</Label>
              <Textarea
                id="issue"
                placeholder="Describe the technical issue..."
                rows={3}
                value={newEscalation.issue}
                onChange={(e) => setNewEscalation({ ...newEscalation, issue: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attempted">What have you tried?</Label>
              <Textarea
                id="attempted"
                placeholder="Describe troubleshooting steps taken..."
                rows={2}
                value={newEscalation.attempted}
                onChange={(e) => setNewEscalation({ ...newEscalation, attempted: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateEscalation}>Create Escalation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Log Remote Session Dialog */}
      <Dialog open={showLogDialog} onOpenChange={setShowLogDialog}>
        <DialogContent className="max-w-lg" onClose={() => setShowLogDialog(false)}>
          <DialogHeader>
            <DialogTitle>Log Remote Support Session</DialogTitle>
            <DialogDescription>Record details of a remote support session</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sessionType">Session Type</Label>
                <Select
                  id="sessionType"
                  value={newSession.type}
                  onChange={(e) => setNewSession({ ...newSession, type: e.target.value })}
                >
                  <option value="phone">Phone Call</option>
                  <option value="video">Video Call</option>
                  <option value="chat">Chat/Email</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 30 min"
                  value={newSession.duration}
                  onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="engineer">Engineer Name</Label>
              <Input
                id="engineer"
                placeholder="Name of support engineer"
                value={newSession.engineer}
                onChange={(e) => setNewSession({ ...newSession, engineer: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Session Summary *</Label>
              <Textarea
                id="summary"
                placeholder="What was discussed..."
                rows={3}
                value={newSession.summary}
                onChange={(e) => setNewSession({ ...newSession, summary: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recommendations">Recommendations</Label>
              <Textarea
                id="recommendations"
                placeholder="Any recommendations from engineering..."
                rows={2}
                value={newSession.recommendations}
                onChange={(e) => setNewSession({ ...newSession, recommendations: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogDialog(false)}>Cancel</Button>
            <Button onClick={handleLogSession}>Log Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
