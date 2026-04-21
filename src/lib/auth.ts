import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type UserRole = "management" | "technician" | "customer";

export interface SessionUser {
  id: string;
  username: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  customerId?: string;
}

const SESSION_COOKIE = "waferworx_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

function getSecretKey(secret: string): Uint8Array {
  return new TextEncoder().encode(secret);
}

export async function createSession(user: SessionUser, secret: string): Promise<string> {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(getSecretKey(secret));
  
  return token;
}

export async function verifySession(token: string, secret: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(secret));
    return payload.user as SessionUser;
  } catch {
    return null;
  }
}

export async function getSession(secret: string): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  
  if (!token) {
    return null;
  }
  
  return verifySession(token, secret);
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export function hashPassword(password: string): string {
  // For demo purposes, using a simple hash
  // In production, use bcrypt or argon2
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "waferworx_salt");
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash) + data[i];
    hash = hash & hash;
  }
  return hash.toString(16);
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}
