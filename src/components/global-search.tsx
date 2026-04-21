"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Briefcase,
  Building2,
  Cpu,
  User,
  FileText,
  X,
} from "lucide-react";

interface SearchResult {
  id: string;
  type: "job" | "customer" | "tool" | "technician" | "report";
  title: string;
  subtitle: string;
  url: string;
}

const mockResults: SearchResult[] = [
  { id: "1", type: "job", title: "JOB-2024-0001", subtitle: "CVD-3000 Annual PM - Acme Semiconductor", url: "/dashboard/management/jobs/job-1" },
  { id: "2", type: "job", title: "JOB-2024-0004", subtitle: "RF Generator Replacement - Acme Semiconductor", url: "/dashboard/management/jobs/job-4" },
  { id: "3", type: "customer", title: "Acme Semiconductor", subtitle: "Austin, TX - 3 sites, 5 tools", url: "/dashboard/management/customers" },
  { id: "4", type: "customer", title: "TechFab Inc", subtitle: "San Jose, CA - 1 site, 2 tools", url: "/dashboard/management/customers" },
  { id: "5", type: "tool", title: "CVD-3000X (CVD3K-2024-001)", subtitle: "Acme Semiconductor - Fab 1", url: "/dashboard/management/tools" },
  { id: "6", type: "tool", title: "ETCH-2000 (ETCH-2023-001)", subtitle: "TechFab Inc - Main Fab", url: "/dashboard/management/tools" },
  { id: "7", type: "technician", title: "John Technician", subtitle: "Austin, TX - On-site", url: "/dashboard/management/technicians" },
  { id: "8", type: "technician", title: "Sarah Engineer", subtitle: "San Jose, CA - Available", url: "/dashboard/management/technicians" },
  { id: "9", type: "report", title: "CSR-2024-0015", subtitle: "JOB-2024-0001 - Apr 12, 2024", url: "/dashboard/management/approvals" },
];

const typeIcons: Record<string, React.ReactNode> = {
  job: <Briefcase className="h-4 w-4" />,
  customer: <Building2 className="h-4 w-4" />,
  tool: <Cpu className="h-4 w-4" />,
  technician: <User className="h-4 w-4" />,
  report: <FileText className="h-4 w-4" />,
};

const typeColors: Record<string, string> = {
  job: "bg-blue-100 text-blue-700",
  customer: "bg-green-100 text-green-700",
  tool: "bg-purple-100 text-purple-700",
  technician: "bg-orange-100 text-orange-700",
  report: "bg-gray-100 text-gray-700",
};

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      // Escape to close
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockResults.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      router.push(results[selectedIndex].url);
      setIsOpen(false);
      setQuery("");
    }
  };

  const handleSelect = (result: SearchResult) => {
    router.push(result.url);
    setIsOpen(false);
    setQuery("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-white rounded border">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => {
          setIsOpen(false);
          setQuery("");
        }}
      />

      {/* Search Modal */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search jobs, customers, tools, technicians..."
              className="flex-1 outline-none text-lg"
              autoFocus
            />
            <button
              onClick={() => {
                setIsOpen(false);
                setQuery("");
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className={`w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 ${
                    index === selectedIndex ? "bg-blue-50" : ""
                  }`}
                >
                  <div className={`p-2 rounded-lg ${typeColors[result.type]}`}>
                    {typeIcons[result.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{result.title}</div>
                    <div className="text-sm text-gray-500 truncate">{result.subtitle}</div>
                  </div>
                  <Badge variant="outline" className="capitalize text-xs">
                    {result.type}
                  </Badge>
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {query.length > 0 && results.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p>No results found for "{query}"</p>
            </div>
          )}

          {/* Quick Actions */}
          {query.length === 0 && (
            <div className="p-4">
              <div className="text-xs font-medium text-gray-400 mb-2">QUICK ACTIONS</div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    router.push("/dashboard/management/jobs/new");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 text-left hover:bg-gray-50 rounded"
                >
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span>Create new job</span>
                </button>
                <button
                  onClick={() => {
                    router.push("/dashboard/management/schedule");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 text-left hover:bg-gray-50 rounded"
                >
                  <Search className="h-4 w-4 text-gray-400" />
                  <span>View dispatch board</span>
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 text-xs text-gray-500 border-t">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white rounded border">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white rounded border">↵</kbd>
                to select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white rounded border">esc</kbd>
              to close
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
