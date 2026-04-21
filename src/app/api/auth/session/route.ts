import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const secret = process.env.JWT_SECRET || "demo-secret-change-in-production";
  const user = await getSession(secret);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
