import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="management">{children}</DashboardShell>;
}
