"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface User {
  id: string;
  username: string;
  role: "management" | "technician" | "customer";
  firstName?: string;
  lastName?: string;
}

interface DashboardShellProps {
  children: React.ReactNode;
  role: "management" | "technician" | "customer";
}

export function DashboardShell({ children, role }: DashboardShellProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch("/api/auth/session");
        if (!response.ok) {
          router.push("/login");
          return;
        }
        const data = await response.json() as { user: User };
        setUser(data.user);
      } catch {
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSession();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
