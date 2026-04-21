"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/toast";
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRightLeft,
} from "lucide-react";

interface JobPart {
  id: string;
  partNumber: string;
  name: string;
  quantity: number;
  status: string;
  serialRemoved: string | null;
  serialInstalled: string | null;
  notes: string;
}

interface Consumable {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

const initialJobParts: JobPart[] = [
  {
    id: "jp-1",
    partNumber: "ORG-CVD-001",
    name: "Chamber O-Ring Kit",
    quantity: 2,
    status: "installed",
    serialRemoved: "N/A",
    serialInstalled: "N/A",
    notes: "Replaced worn O-rings on chamber 2 load lock",
  },
  {
    id: "jp-2",
    partNumber: "FLT-RF-002",
    name: "RF Generator Filter",
    quantity: 1,
    status: "pending",
    serialRemoved: null,
    serialInstalled: null,
    notes: "Ordered - expected delivery Apr 15",
  },
  {
    id: "jp-3",
    partNumber: "VAL-ISO-003",
    name: "Isolation Valve",
    quantity: 1,
    status: "installed",
    serialRemoved: "IV-2022-0045",
    serialInstalled: "IV-2024-0112",
    notes: "Replaced due to slow response time",
  },
];

const initialConsumables: Consumable[] = [
  { id: "c-1", name: "IPA Wipes", quantity: 50, unit: "sheets" },
  { id: "c-2", name: "Cleanroom Gloves", quantity: 4, unit: "pairs" },
  { id: "c-3", name: "Vacuum Grease", quantity: 1, unit: "tube" },
];

const partsInventory = [
  { partNumber: "ORG-CVD-001", name: "Chamber O-Ring Kit", inStock: 5, location: "Van Stock" },
  { partNumber: "FLT-RF-002", name: "RF Generator Filter", inStock: 0, location: "Backorder" },
  { partNumber: "VAL-ISO-003", name: "Isolation Valve", inStock: 2, location: "Van Stock" },
  { partNumber: "SEN-TEMP-004", name: "Temperature Sensor", inStock: 3, location: "Van Stock" },
  { partNumber: "PMP-TURBO-005", name: "Turbo Pump", inStock: 0, location: "Warehouse" },
];

const statusColors: Record<string, "success" | "warning" | "default" | "secondary" | "destructive"> = {
  installed: "success",
  pending: "warning",
  backordered: "destructive",
  returned: "secondary",
};

export default function TechnicianPartsPage() {
  const { addToast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showConsumableDialog, setShowConsumableDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentJobParts, setCurrentJobParts] = useState<JobPart[]>(initialJobParts);
  const [consumablesUsed, setConsumablesUsed] = useState<Consumable[]>(initialConsumables);
  const [newPart, setNewPart] = useState({
    partNumber: "",
    name: "",
    quantity: "1",
    status: "installed",
    serialRemoved: "",
    serialInstalled: "",
    notes: "",
  });
  const [newConsumable, setNewConsumable] = useState({
    name: "",
    quantity: "1",
    unit: "each",
  });

  const handleAddPart = () => {
    if (!newPart.partNumber || !newPart.name) {
      addToast("Please fill in required fields", "error");
      return;
    }
    
    const part: JobPart = {
      id: `jp-${Date.now()}`,
      partNumber: newPart.partNumber,
      name: newPart.name,
      quantity: parseInt(newPart.quantity) || 1,
      status: newPart.status,
      serialRemoved: newPart.serialRemoved || null,
      serialInstalled: newPart.serialInstalled || null,
      notes: newPart.notes,
    };
    
    setCurrentJobParts((prev) => [...prev, part]);
    addToast(`Part ${newPart.partNumber} added`, "success");
    setShowAddDialog(false);
    setNewPart({
      partNumber: "",
      name: "",
      quantity: "1",
      status: "installed",
      serialRemoved: "",
      serialInstalled: "",
      notes: "",
    });
  };

  const handleAddConsumable = () => {
    if (!newConsumable.name) {
      addToast("Please enter consumable name", "error");
      return;
    }
    
    const consumable: Consumable = {
      id: `c-${Date.now()}`,
      name: newConsumable.name,
      quantity: parseInt(newConsumable.quantity) || 1,
      unit: newConsumable.unit,
    };
    
    setConsumablesUsed((prev) => [...prev, consumable]);
    addToast(`${newConsumable.name} added`, "success");
    setShowConsumableDialog(false);
    setNewConsumable({ name: "", quantity: "1", unit: "each" });
  };

  const filteredInventory = partsInventory.filter(
    (p) =>
      p.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Parts & Consumables</h2>
          <p className="text-gray-500">Track parts used and inventory for current job</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowConsumableDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Consumable
          </Button>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Part
          </Button>
        </div>
      </div>

      {/* Current Job Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-blue-900">JOB-2024-0001 - CVD-3000 Annual PM</div>
              <div className="text-sm text-blue-700">Acme Semiconductor • CVD-3000X</div>
            </div>
            <Badge variant="warning">In Progress</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parts Used */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5" />
                Parts Used on This Job
              </CardTitle>
              <CardDescription>Track parts installed and removed</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Serial Removed</TableHead>
                    <TableHead>Serial Installed</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentJobParts.map((part) => (
                    <TableRow key={part.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{part.partNumber}</div>
                          <div className="text-sm text-gray-500">{part.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{part.quantity}</TableCell>
                      <TableCell className="text-sm">
                        {part.serialRemoved || <span className="text-gray-400">—</span>}
                      </TableCell>
                      <TableCell className="text-sm">
                        {part.serialInstalled || <span className="text-gray-400">—</span>}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusColors[part.status]}>{part.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Consumables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Consumables Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {consumablesUsed.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-600">{item.quantity} {item.unit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Parts Inventory Lookup */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Parts Lookup</CardTitle>
              <CardDescription>Search available inventory</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search parts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {filteredInventory.map((part) => (
                  <div key={part.partNumber} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{part.partNumber}</span>
                      {part.inStock > 0 ? (
                        <Badge variant="success" className="text-xs">{part.inStock} in stock</Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs">Out of stock</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{part.name}</div>
                    <div className="text-xs text-gray-400">{part.location}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                Pending Parts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {currentJobParts
                  .filter((p) => p.status === "pending")
                  .map((part) => (
                    <div key={part.id} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="font-medium text-sm">{part.partNumber}</div>
                      <div className="text-sm text-gray-600">{part.name}</div>
                      <div className="text-xs text-orange-600 mt-1">{part.notes}</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Part Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg" onClose={() => setShowAddDialog(false)}>
          <DialogHeader>
            <DialogTitle>Add Part Used</DialogTitle>
            <DialogDescription>Record a part installed or removed during this job</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partNumber">Part Number *</Label>
                <Input
                  id="partNumber"
                  value={newPart.partNumber}
                  onChange={(e) => setNewPart({ ...newPart, partNumber: e.target.value })}
                  placeholder="e.g., ORG-CVD-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={newPart.quantity}
                  onChange={(e) => setNewPart({ ...newPart, quantity: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="partName">Part Name *</Label>
              <Input
                id="partName"
                value={newPart.name}
                onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
                placeholder="e.g., Chamber O-Ring Kit"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                value={newPart.status}
                onChange={(e) => setNewPart({ ...newPart, status: e.target.value })}
              >
                <option value="installed">Installed</option>
                <option value="pending">Pending / On Order</option>
                <option value="backordered">Backordered</option>
                <option value="returned">Returned</option>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serialRemoved">Serial # Removed</Label>
                <Input
                  id="serialRemoved"
                  value={newPart.serialRemoved}
                  onChange={(e) => setNewPart({ ...newPart, serialRemoved: e.target.value })}
                  placeholder="If applicable"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serialInstalled">Serial # Installed</Label>
                <Input
                  id="serialInstalled"
                  value={newPart.serialInstalled}
                  onChange={(e) => setNewPart({ ...newPart, serialInstalled: e.target.value })}
                  placeholder="If applicable"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newPart.notes}
                onChange={(e) => setNewPart({ ...newPart, notes: e.target.value })}
                placeholder="Reason for replacement, condition, etc."
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddPart}>Add Part</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Consumable Dialog */}
      <Dialog open={showConsumableDialog} onOpenChange={setShowConsumableDialog}>
        <DialogContent onClose={() => setShowConsumableDialog(false)}>
          <DialogHeader>
            <DialogTitle>Add Consumable</DialogTitle>
            <DialogDescription>Record consumables used during this job</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="consumableName">Item Name *</Label>
              <Input
                id="consumableName"
                placeholder="e.g., IPA Wipes"
                value={newConsumable.name}
                onChange={(e) => setNewConsumable({ ...newConsumable, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="consumableQty">Quantity</Label>
                <Input
                  id="consumableQty"
                  type="number"
                  min="1"
                  value={newConsumable.quantity}
                  onChange={(e) => setNewConsumable({ ...newConsumable, quantity: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consumableUnit">Unit</Label>
                <Select
                  id="consumableUnit"
                  value={newConsumable.unit}
                  onChange={(e) => setNewConsumable({ ...newConsumable, unit: e.target.value })}
                >
                  <option value="each">Each</option>
                  <option value="sheets">Sheets</option>
                  <option value="pairs">Pairs</option>
                  <option value="tubes">Tubes</option>
                  <option value="liters">Liters</option>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConsumableDialog(false)}>Cancel</Button>
            <Button onClick={handleAddConsumable}>Add Consumable</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
