"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Search,
  Download,
  Send,
  Eye,
  Filter,
  Building2,
} from "lucide-react";

const pendingInvoices = [
  {
    id: "inv-1",
    jobNumber: "JOB-2024-0004",
    customer: "Acme Semiconductor",
    site: "Fab 1 - Austin",
    tool: "CVD-3000X",
    entitlement: "Billable",
    completedDate: "Mar 15, 2024",
    laborHours: 24,
    travelHours: 4,
    partsTotal: 2500,
    laborRate: 175,
    estimatedTotal: 7400,
    readinessFlags: {
      csrApproved: true,
      timesheetApproved: true,
      partsRecorded: true,
      customerSigned: true,
      poReceived: false,
    },
    status: "pending_po",
  },
  {
    id: "inv-2",
    jobNumber: "JOB-2024-0006",
    customer: "MegaChip Corp",
    site: "New Fab",
    tool: "CVD-3000X",
    entitlement: "Billable",
    completedDate: "Mar 28, 2024",
    laborHours: 16,
    travelHours: 2,
    partsTotal: 0,
    laborRate: 175,
    estimatedTotal: 3150,
    readinessFlags: {
      csrApproved: true,
      timesheetApproved: false,
      partsRecorded: true,
      customerSigned: false,
      poReceived: false,
    },
    status: "incomplete",
  },
];

const invoiceHistory = [
  {
    id: "inv-h1",
    invoiceNumber: "INV-2024-0015",
    jobNumber: "JOB-2024-0002",
    customer: "TechFab Inc",
    amount: 4200,
    invoicedDate: "Feb 15, 2024",
    status: "paid",
    paidDate: "Mar 1, 2024",
  },
  {
    id: "inv-h2",
    invoiceNumber: "INV-2024-0012",
    jobNumber: "JOB-2024-0001",
    customer: "Silicon Valley Chips",
    amount: 6800,
    invoicedDate: "Jan 25, 2024",
    status: "paid",
    paidDate: "Feb 10, 2024",
  },
  {
    id: "inv-h3",
    invoiceNumber: "INV-2024-0008",
    jobNumber: "JOB-2023-0045",
    customer: "Acme Semiconductor",
    amount: 12500,
    invoicedDate: "Jan 10, 2024",
    status: "paid",
    paidDate: "Jan 28, 2024",
  },
];

const contractRevenue = [
  { customer: "Acme Semiconductor", contractValue: 120000, recognized: 40000, remaining: 80000 },
  { customer: "TechFab Inc", contractValue: 45000, recognized: 22500, remaining: 22500 },
  { customer: "Silicon Valley Chips", contractValue: 60000, recognized: 15000, remaining: 45000 },
];

const statusColors: Record<string, "success" | "warning" | "destructive" | "default"> = {
  ready: "success",
  pending_po: "warning",
  incomplete: "destructive",
  invoiced: "default",
  paid: "success",
};

export default function BillingPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("pending");
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<typeof pendingInvoices[0] | null>(null);

  const totalPending = pendingInvoices.reduce((sum, inv) => sum + inv.estimatedTotal, 0);
  const readyToInvoice = pendingInvoices.filter(
    (inv) => Object.values(inv.readinessFlags).every((v) => v)
  ).length;

  const handleExportReport = () => {
    addToast("Generating billing report...", "info");
    setTimeout(() => {
      addToast("Report exported successfully", "success");
    }, 1500);
  };

  const handleGenerateInvoice = (jobNumber: string) => {
    addToast(`Generating invoice for ${jobNumber}...`, "info");
    setTimeout(() => {
      addToast("Invoice generated and sent to customer", "success");
    }, 2000);
    setShowDetailDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Billing & Invoicing</h2>
          <p className="text-gray-500">Track invoice readiness and billing status</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{pendingInvoices.length}</div>
                <div className="text-sm text-gray-500">Pending Invoices</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{readyToInvoice}</div>
                <div className="text-sm text-gray-500">Ready to Invoice</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">${totalPending.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Pending Amount</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{invoiceHistory.length}</div>
                <div className="text-sm text-gray-500">Invoiced This Quarter</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending">
            <Clock className="h-4 w-4 mr-2" />
            Pending ({pendingInvoices.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            <FileText className="h-4 w-4 mr-2" />
            Invoice History
          </TabsTrigger>
          <TabsTrigger value="contracts">
            <Building2 className="h-4 w-4 mr-2" />
            Contract Revenue
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invoices</CardTitle>
              <CardDescription>Jobs ready or nearly ready for invoicing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingInvoices.map((invoice) => (
                  <div key={invoice.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{invoice.jobNumber}</span>
                          <Badge variant={statusColors[invoice.status]}>
                            {invoice.status === "pending_po" ? "Pending PO" : "Incomplete"}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {invoice.customer} • {invoice.site}
                        </div>
                        <div className="text-sm text-gray-500">
                          {invoice.tool} • Completed {invoice.completedDate}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${invoice.estimatedTotal.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Estimated Total</div>
                      </div>
                    </div>

                    {/* Readiness Flags */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="text-sm font-medium mb-2">Invoice Readiness</div>
                      <div className="grid grid-cols-5 gap-2">
                        {Object.entries(invoice.readinessFlags).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-1 text-xs">
                            {value ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className={value ? "text-green-700" : "text-red-700"}>
                              {key === "csrApproved" && "CSR"}
                              {key === "timesheetApproved" && "Timesheet"}
                              {key === "partsRecorded" && "Parts"}
                              {key === "customerSigned" && "Signed"}
                              {key === "poReceived" && "PO"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Line Items Summary */}
                    <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <div className="text-gray-500">Labor</div>
                        <div className="font-medium">
                          {invoice.laborHours}h × ${invoice.laborRate} = ${(invoice.laborHours * invoice.laborRate).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Travel</div>
                        <div className="font-medium">
                          {invoice.travelHours}h × ${invoice.laborRate} = ${(invoice.travelHours * invoice.laborRate).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Parts</div>
                        <div className="font-medium">${invoice.partsTotal.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Entitlement</div>
                        <div className="font-medium">{invoice.entitlement}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowDetailDialog(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {Object.values(invoice.readinessFlags).every((v) => v) && (
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-2" />
                          Generate Invoice
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Job</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Invoiced</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Paid</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceHistory.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.invoiceNumber}</TableCell>
                      <TableCell>{inv.jobNumber}</TableCell>
                      <TableCell>{inv.customer}</TableCell>
                      <TableCell>${inv.amount.toLocaleString()}</TableCell>
                      <TableCell>{inv.invoicedDate}</TableCell>
                      <TableCell>
                        <Badge variant="success">{inv.status}</Badge>
                      </TableCell>
                      <TableCell>{inv.paidDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>Contract Revenue Recognition</CardTitle>
              <CardDescription>Service contract value and recognition status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contractRevenue.map((contract, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">{contract.customer}</div>
                      <div className="text-lg font-bold">${contract.contractValue.toLocaleString()}</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className="bg-green-500 h-3 rounded-full"
                        style={{ width: `${(contract.recognized / contract.contractValue) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Recognized: ${contract.recognized.toLocaleString()}</span>
                      <span>Remaining: ${contract.remaining.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl" onClose={() => setShowDetailDialog(false)}>
          <DialogHeader>
            <DialogTitle>Invoice Details - {selectedInvoice?.jobNumber}</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Customer</div>
                  <div className="font-medium">{selectedInvoice.customer}</div>
                </div>
                <div>
                  <div className="text-gray-500">Site</div>
                  <div className="font-medium">{selectedInvoice.site}</div>
                </div>
                <div>
                  <div className="text-gray-500">Tool</div>
                  <div className="font-medium">{selectedInvoice.tool}</div>
                </div>
                <div>
                  <div className="text-gray-500">Completed</div>
                  <div className="font-medium">{selectedInvoice.completedDate}</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Line Items</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Rate</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Labor</TableCell>
                      <TableCell className="text-right">{selectedInvoice.laborHours}h</TableCell>
                      <TableCell className="text-right">${selectedInvoice.laborRate}</TableCell>
                      <TableCell className="text-right">
                        ${(selectedInvoice.laborHours * selectedInvoice.laborRate).toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Travel</TableCell>
                      <TableCell className="text-right">{selectedInvoice.travelHours}h</TableCell>
                      <TableCell className="text-right">${selectedInvoice.laborRate}</TableCell>
                      <TableCell className="text-right">
                        ${(selectedInvoice.travelHours * selectedInvoice.laborRate).toLocaleString()}
                      </TableCell>
                    </TableRow>
                    {selectedInvoice.partsTotal > 0 && (
                      <TableRow>
                        <TableCell>Parts & Materials</TableCell>
                        <TableCell className="text-right">—</TableCell>
                        <TableCell className="text-right">—</TableCell>
                        <TableCell className="text-right">${selectedInvoice.partsTotal.toLocaleString()}</TableCell>
                      </TableRow>
                    )}
                    <TableRow className="font-bold">
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">${selectedInvoice.estimatedTotal.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailDialog(false)}>Close</Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
