import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validation/admin";
import { getAdminByUsername } from "@/lib/data/admins";
import { verifyPassword } from "@/lib/auth/password";
import { setSessionCookie } from "@/lib/auth/session";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`login:${ip}`)) {
    return NextResponse.json({ message: "Too many attempts. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const result = loginSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ message: "Username and password are required." }, { status: 400 });
  }

  const admin = await getAdminByUsername(result.data.username);
  const passwordMatches = admin ? await verifyPassword(result.data.password, admin.passwordHash) : false;

  if (!admin || !passwordMatches) {
    return NextResponse.json({ message: "Invalid username or password." }, { status: 401 });
  }

  await setSessionCookie({ adminId: admin.id, username: admin.username });
  return NextResponse.json({ ok: true });
}
