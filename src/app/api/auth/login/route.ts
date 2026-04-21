import { NextRequest, NextResponse } from "next/server";
import { createSession, setSessionCookie, verifyPassword, type SessionUser } from "@/lib/auth";
import { getSeedData } from "@/db/seed";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { username?: string; password?: string };
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // For demo, use seeded users
    const seedData = getSeedData();
    const user = seedData.users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const sessionUser: SessionUser = {
      id: user.id,
      username: user.username,
      role: user.role,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      customerId: user.customerId ?? undefined,
    };

    const secret = process.env.JWT_SECRET || "demo-secret-change-in-production";
    const token = await createSession(sessionUser, secret);
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: sessionUser.id,
        username: sessionUser.username,
        role: sessionUser.role,
        firstName: sessionUser.firstName,
        lastName: sessionUser.lastName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
