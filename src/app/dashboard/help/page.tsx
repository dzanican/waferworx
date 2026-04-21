"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  BookOpen,
  Video,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  FileText,
  Keyboard,
} from "lucide-react";

const quickStartGuides = [
  {
    title: "Creating a New Job",
    description: "Learn how to create and assign service jobs",
    duration: "3 min read",
    category: "Jobs",
  },
  {
    title: "Submitting Daily Updates",
    description: "How to log your daily work progress",
    duration: "2 min read",
    category: "Technician",
  },
  {
    title: "Completing a Checklist",
    description: "Step-by-step guide for PM checklists",
    duration: "4 min read",
    category: "Technician",
  },
  {
    title: "Generating Reports",
    description: "Export data and create custom reports",
    duration: "5 min read",
    category: "Management",
  },
  {
    title: "Managing PM Schedules",
    description: "Set up and track preventive maintenance",
    duration: "4 min read",
    category: "Management",
  },
  {
    title: "Viewing Service History",
    description: "Access your tool's complete service timeline",
    duration: "2 min read",
    category: "Customer",
  },
];

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Go to Settings > Security > Change Password. Enter your current password and your new password twice to confirm.",
  },
  {
    question: "How do I assign a job to a technician?",
    answer: "Open the job details page and click 'Edit'. Select a technician from the 'Assigned Technician' dropdown and save.",
  },
  {
    question: "Can I export data to Excel?",
    answer: "Yes! Go to Reports > Data Exports and select the data type you want to export. Choose Excel (XLSX) as the format.",
  },
  {
    question: "How do I create a service report (CSR)?",
    answer: "After completing a job, go to Reports > Create CSR. Fill in the required fields and submit for approval.",
  },
  {
    question: "What do the job status colors mean?",
    answer: "Blue = Open, Yellow = In Progress, Red = On Hold, Green = Completed, Gray = Closed.",
  },
];

const keyboardShortcuts = [
  { keys: ["⌘", "K"], description: "Open global search" },
  { keys: ["⌘", "N"], description: "Create new job" },
  { keys: ["⌘", "S"], description: "Save current form" },
  { keys: ["Esc"], description: "Close dialog/modal" },
  { keys: ["↑", "↓"], description: "Navigate search results" },
  { keys: ["Enter"], description: "Select search result" },
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredGuides = quickStartGuides.filter(
    (g) =>
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Help Center</h2>
        <p className="text-gray-500 mt-1">Find answers and learn how to use WaferWorx</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium">Documentation</div>
              <div className="text-sm text-gray-500">Full user guide</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Video className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <div className="font-medium">Video Tutorials</div>
              <div className="text-sm text-gray-500">Watch and learn</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium">Live Chat</div>
              <div className="text-sm text-gray-500">Talk to support</div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Phone className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <div className="font-medium">Call Support</div>
              <div className="text-sm text-gray-500">1-800-WAFERWORX</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Start Guides */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Guides</CardTitle>
              <CardDescription>Get up to speed quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredGuides.map((guide, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium group-hover:text-blue-600">{guide.title}</div>
                        <div className="text-sm text-gray-500">{guide.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{guide.category}</Badge>
                      <span className="text-xs text-gray-400">{guide.duration}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Keyboard Shortcuts */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Keyboard className="h-5 w-5" />
                Keyboard Shortcuts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {keyboardShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, i) => (
                        <kbd
                          key={i}
                          className="px-2 py-1 text-xs bg-gray-100 border rounded"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      expandedFaq === index ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">Still need help?</h3>
              <p className="text-blue-700 mt-1">
                Our support team is available 24/7 to assist you.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
              <Button>
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Chat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
