import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/jwt";

// Gate every /admin and /api/admin route except the login page/endpoint.
// Each admin API route also re-checks the session itself (doc §15 — defense
// in depth, since a proxy matcher change should never be the only guard).
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginRoute = pathname === "/admin/login" || pathname === "/api/admin/login";
  if (isLoginRoute) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (session) return NextResponse.next();

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
