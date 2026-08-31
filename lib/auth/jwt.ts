import { SignJWT, jwtVerify } from "jose";

// Pure JWT helpers with no next/headers dependency, so they're safe to import
// from proxy.ts (which has its own request/response cookie API) as well as
// from session.ts (which wraps these for use in Server Components/Route Handlers).
export const SESSION_COOKIE = "smilemart_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 hours

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set. Add it to .env.local.");
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  adminId: string;
  username: string;
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (typeof payload.adminId !== "string" || typeof payload.username !== "string") return null;
    return { adminId: payload.adminId, username: payload.username };
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE_SECONDS = SESSION_DURATION_SECONDS;
