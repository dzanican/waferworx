"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Check,
  CheckCheck,
  AlertTriangle,
  Calendar,
  FileText,
  Clock,
  User,
  Settings,
  Trash2,
  MessageSquare,
  Cpu,
  DollarSign,
} from "lucide-react";

interface Notification {
  id: string;
  type: "alert" | "info" | "success" | "warning";
  category: "job" | "approval" | "pm" | "escalation" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

const notifications: Notification[] = [
  {
    id: "n1",
    type: "warning",
    category: "pm",
    title: "PM Overdue",
    message: "PVD Tool 1 quarterly PM is 5 days overdue. Please schedule immediately.",
    timestamp: "10 minutes ago",
    read: false,
    actionUrl: "/dashboard/management/pm-schedule",
    actionLabel: "View Schedule",
  },
  {
    id: "n2",
    type: "info",
    category: "approval",
    title: "Timesheet Submitted",
    message: "John Technician submitted utilization sheet for WW15 2024.",
    timestamp: "1 hour ago",
    read: false,
    actionUrl: "/dashboard/management/approvals",
    actionLabel: "Review",
  },
  {
    id: "n3",
    type: "alert",
    category: "escalation",
    title: "New Escalation",
    message: "Escalation created for JOB-2024-0001: Chamber 3 particle issue.",
    timestamp: "2 hours ago",
    read: false,
    actionUrl: "/dashboard/management/jobs/job-1",
    actionLabel: "View Job",
  },
  {
    id: "n4",
    type: "success",
    category: "job",
    title: "Job Completed",
    message: "JOB-2024-0004 has been marked as completed by Sarah Engineer.",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: "n5",
    type: "info",
    category: "approval",
    title: "CSR Submitted",
    message: "CSR-2024-0015 submitted for approval.",
    timestamp: "Yesterday",
    read: true,
    actionUrl: "/dashboard/management/approvals",
    actionLabel: "Review",
  },
  {
    id: "n6",
    type: "warning",
    category: "pm",
    title: "PM Due Soon",
    message: "CVD Tool 2 quarterly PM due in 2 weeks (WW19).",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "n7",
    type: "info",
    category: "system",
    title: "Service Bulletin Published",
    message: "New service bulletin SB-2024-003 for CVD-3000 platform.",
    timestamp: "3 days ago",
    read: true,
    actionUrl: "/dashboard/technician/manuals",
    actionLabel: "View Bulletin",
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  job: <FileText className="h-5 w-5" />,
  approval: <Clock className="h-5 w-5" />,
  pm: <Calendar className="h-5 w-5" />,
  escalation: <AlertTriangle className="h-5 w-5" />,
  system: <Bell className="h-5 w-5" />,
};

const typeColors: Record<string, string> = {
  alert: "bg-red-100 text-red-600",
  warning: "bg-yellow-100 text-yellow-600",
  info: "bg-blue-100 text-blue-600",
  success: "bg-green-100 text-green-600",
};

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [notificationList, setNotificationList] = useState(notifications);

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notificationList.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.read;
    return n.category === activeTab;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-500">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="job">Jobs</TabsTrigger>
          <TabsTrigger value="approval">Approvals</TabsTrigger>
          <TabsTrigger value="pm">PM</TabsTrigger>
          <TabsTrigger value="escalation">Escalations</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${typeColors[notification.type]}`}>
                          {typeIcons[notification.category]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{notification.title}</span>
                            {!notification.read && (
                              <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-400">{notification.timestamp}</span>
                            {notification.actionUrl && (
                              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                                {notification.actionLabel}
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => markAsRead(notification.id)}
                              title="Mark as read"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 text-gray-400" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notification Preferences</CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: "Job Updates", description: "Status changes, completions", enabled: true },
              { label: "Approval Requests", description: "Timesheets, CSRs pending approval", enabled: true },
              { label: "PM Reminders", description: "Upcoming and overdue PMs", enabled: true },
              { label: "Escalations", description: "New escalations and updates", enabled: true },
              { label: "System Announcements", description: "Bulletins, updates", enabled: false },
            ].map((pref) => (
              <div key={pref.label} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{pref.label}</div>
                  <div className="text-xs text-gray-500">{pref.description}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={pref.enabled}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
