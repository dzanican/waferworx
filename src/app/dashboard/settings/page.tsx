"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Building2,
  Save,
  Key,
  Mail,
  Phone,
} from "lucide-react";

export default function SettingsPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  const handleSaveProfile = () => {
    addToast("Profile updated successfully", "success");
  };

  const handleSaveNotifications = () => {
    addToast("Notification preferences saved", "success");
  };

  const handleUpdatePassword = () => {
    addToast("Password updated successfully", "success");
  };

  const handleEnable2FA = () => {
    addToast("2FA setup initiated - check your email", "info");
  };

  const handleSaveAppearance = () => {
    addToast("Appearance settings saved", "success");
  };

  const handleSaveCompany = () => {
    addToast("Company settings saved", "success");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500">Manage your account and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="company">
            <Building2 className="h-4 w-4 mr-2" />
            Company
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                  AM
                </div>
                <div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Manager" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex gap-2">
                  <Input id="email" type="email" defaultValue="admin@waferworx.demo" className="flex-1" />
                  <Button variant="outline">Verify</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="555-0100" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" defaultValue="Service Manager" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select id="timezone" defaultValue="america_chicago">
                  <option value="america_los_angeles">Pacific Time (PT)</option>
                  <option value="america_denver">Mountain Time (MT)</option>
                  <option value="america_chicago">Central Time (CT)</option>
                  <option value="america_new_york">Eastern Time (ET)</option>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                {[
                  { id: "email_jobs", label: "Job Updates", desc: "Status changes, assignments" },
                  { id: "email_approvals", label: "Approval Requests", desc: "Timesheets, CSRs pending" },
                  { id: "email_pm", label: "PM Reminders", desc: "Upcoming and overdue PMs" },
                  { id: "email_escalations", label: "Escalations", desc: "New escalations and updates" },
                  { id: "email_reports", label: "Scheduled Reports", desc: "Weekly/monthly reports" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6 space-y-4">
                <h4 className="font-medium">Push Notifications</h4>
                {[
                  { id: "push_urgent", label: "Urgent Alerts", desc: "Critical issues only" },
                  { id: "push_mentions", label: "Mentions", desc: "When someone mentions you" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2">
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password regularly for security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleUpdatePassword}>
                    <Key className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">2FA Status</div>
                    <div className="text-sm text-gray-500">Not enabled</div>
                  </div>
                  <Button variant="outline" onClick={handleEnable2FA}>Enable 2FA</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage your active sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Current Session</div>
                      <div className="text-xs text-gray-500">Windows • Chrome • Austin, TX</div>
                    </div>
                    <span className="text-xs text-green-600">Active now</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "light", label: "Light", active: true },
                    { id: "dark", label: "Dark", active: false },
                    { id: "system", label: "System", active: false },
                  ].map((theme) => (
                    <div
                      key={theme.id}
                      className={`p-4 border rounded-lg cursor-pointer text-center ${
                        theme.active ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="font-medium">{theme.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="density">Display Density</Label>
                <Select id="density" defaultValue="comfortable">
                  <option value="compact">Compact</option>
                  <option value="comfortable">Comfortable</option>
                  <option value="spacious">Spacious</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select id="dateFormat" defaultValue="mdy">
                  <option value="mdy">MM/DD/YYYY</option>
                  <option value="dmy">DD/MM/YYYY</option>
                  <option value="ymd">YYYY-MM-DD</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weekStart">Week Starts On</Label>
                <Select id="weekStart" defaultValue="sunday">
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveAppearance}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Settings</CardTitle>
              <CardDescription>Manage organization-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" defaultValue="WaferWorx" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">Support Email</Label>
                  <Input id="companyEmail" type="email" defaultValue="support@waferworx.demo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">Support Phone</Label>
                  <Input id="companyPhone" type="tel" defaultValue="1-800-WAFERWORX" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyAddress">Address</Label>
                <Textarea id="companyAddress" defaultValue="123 Tech Drive, Austin, TX 78701" rows={2} />
              </div>

              <div className="border-t pt-6 space-y-4">
                <h4 className="font-medium">Default Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultLaborRate">Default Labor Rate ($/hr)</Label>
                    <Input id="defaultLaborRate" type="number" defaultValue="175" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultTravelRate">Default Travel Rate ($/hr)</Label>
                    <Input id="defaultTravelRate" type="number" defaultValue="175" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workWeekStart">Work Week Starts</Label>
                  <Select id="workWeekStart" defaultValue="monday">
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveCompany}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
