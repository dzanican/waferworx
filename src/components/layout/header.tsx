"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GlobalSearch } from "@/components/global-search";
import { Bell, LogOut, User, Settings } from "lucide-react";

interface HeaderProps {
  user: {
    firstName?: string;
    lastName?: string;
    username: string;
    role: string;
  };
}

export function Header({ user }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.username;

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">
          Welcome back, {displayName}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <GlobalSearch />
        
        <Link href="/dashboard/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              3
            </span>
          </Button>
        </Link>
        
        <Link href="/dashboard/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-gray-500" />
          </Button>
        </Link>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-900">{displayName}</div>
            <div className="text-gray-500 capitalize">{user.role}</div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>
    </header>
  );
}
