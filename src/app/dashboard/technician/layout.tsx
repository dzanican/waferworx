import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="technician">{children}</DashboardShell>;
}
