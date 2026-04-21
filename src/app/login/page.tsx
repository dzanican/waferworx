"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json() as { error?: string; user?: { role: string } };

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Redirect based on role
      switch (data.user?.role) {
        case "management":
          router.push("/dashboard/management");
          break;
        case "technician":
          router.push("/dashboard/technician");
          break;
        case "customer":
          router.push("/dashboard/customer");
          break;
        default:
          router.push("/dashboard");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Wrench className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">WaferWorx FSM</CardTitle>
          <CardDescription>
            Field Service Management Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">Demo Accounts</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-gray-50 p-2 rounded text-center">
                <div className="font-medium text-gray-700">Management</div>
                <div className="text-gray-500">Management / Password</div>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <div className="font-medium text-gray-700">Technician</div>
                <div className="text-gray-500">FSE / Password</div>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <div className="font-medium text-gray-700">Customer</div>
                <div className="text-gray-500">Customer / Password</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
