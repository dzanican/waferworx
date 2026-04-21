"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Wrench,
  LayoutDashboard,
  Briefcase,
  Users,
  Building2,
  Cpu,
  Calendar,
  FileText,
  ClipboardList,
  Settings,
  BarChart3,
  FileCheck,
  Clock,
  BookOpen,
  AlertTriangle,
  Shield,
  Package,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const managementNav: NavItem[] = [
  { title: "Dashboard", href: "/dashboard/management", icon: LayoutDashboard },
  { title: "Jobs", href: "/dashboard/management/jobs", icon: Briefcase },
  { title: "Schedule", href: "/dashboard/management/schedule", icon: Calendar },
  { title: "Customers", href: "/dashboard/management/customers", icon: Building2 },
  { title: "Tools", href: "/dashboard/management/tools", icon: Cpu },
  { title: "Technicians", href: "/dashboard/management/technicians", icon: Users },
  { title: "Approvals", href: "/dashboard/management/approvals", icon: FileCheck },
  { title: "Billing", href: "/dashboard/management/billing", icon: FileText },
  { title: "Metrics", href: "/dashboard/management/metrics", icon: BarChart3 },
  { title: "Settings", href: "/dashboard/management/settings", icon: Settings },
];

const technicianNav: NavItem[] = [
  { title: "Dashboard", href: "/dashboard/technician", icon: LayoutDashboard },
  { title: "My Jobs", href: "/dashboard/technician/jobs", icon: Briefcase },
  { title: "Schedule", href: "/dashboard/technician/schedule", icon: Calendar },
  { title: "Timesheets", href: "/dashboard/technician/timesheets", icon: Clock },
  { title: "Reports", href: "/dashboard/technician/reports", icon: ClipboardList },
  { title: "Parts", href: "/dashboard/technician/parts", icon: Package },
  { title: "Escalations", href: "/dashboard/technician/escalations", icon: AlertTriangle },
  { title: "Manuals", href: "/dashboard/technician/manuals", icon: BookOpen },
];

const customerNav: NavItem[] = [
  { title: "Dashboard", href: "/dashboard/customer", icon: LayoutDashboard },
  { title: "My Tools", href: "/dashboard/customer/tools", icon: Cpu },
  { title: "Service Visits", href: "/dashboard/customer/visits", icon: Briefcase },
  { title: "Reports", href: "/dashboard/customer/reports", icon: ClipboardList },
  { title: "Contracts", href: "/dashboard/customer/contracts", icon: Shield },
  { title: "Contacts", href: "/dashboard/customer/contacts", icon: Users },
];

interface SidebarProps {
  role: "management" | "technician" | "customer";
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const navItems = {
    management: managementNav,
    technician: technicianNav,
    customer: customerNav,
  }[role];

  const roleLabels = {
    management: "Management Portal",
    technician: "Technician Portal",
    customer: "Customer Portal",
  };

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center gap-2 px-4 border-b border-gray-800">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Wrench className="h-5 w-5" />
        </div>
        <div>
          <div className="font-semibold text-sm">WaferWorx FSM</div>
          <div className="text-xs text-gray-400">{roleLabels[role]}</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== `/dashboard/${role}` && pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-800 p-4">
        <div className="text-xs text-gray-500">
          Semiconductor Equipment Services
        </div>
      </div>
    </div>
  );
}
