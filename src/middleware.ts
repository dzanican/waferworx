import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

const publicPaths = ["/login", "/api/auth/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Allow static files and API routes that don't need auth
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check for session
  const token = request.cookies.get("waferworx_session")?.value;
  const secret = process.env.JWT_SECRET || "demo-secret-change-in-production";

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await verifySession(token, secret);

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based route protection
  if (pathname.startsWith("/dashboard/management") && user.role !== "management") {
    return NextResponse.redirect(new URL(`/dashboard/${user.role}`, request.url));
  }

  if (pathname.startsWith("/dashboard/technician") && user.role !== "technician") {
    return NextResponse.redirect(new URL(`/dashboard/${user.role}`, request.url));
  }

  if (pathname.startsWith("/dashboard/customer") && user.role !== "customer") {
    return NextResponse.redirect(new URL(`/dashboard/${user.role}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
