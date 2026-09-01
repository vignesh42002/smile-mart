import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Check if request is targeting admin subdomain (e.g. admin.smilemart.com or admin.localhost)
  const isAdminSubdomain = hostname.startsWith("admin.");

  // Handle subdomain rewriting
  if (isAdminSubdomain && !pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    const targetPath = `/admin${pathname === "/" ? "" : pathname}`;
    const rewriteUrl = new URL(targetPath, request.url);
    
    // Auth check for rewritten admin routes
    const isLogin = targetPath === "/admin/login";
    if (!isLogin) {
      const token = request.cookies.get(SESSION_COOKIE)?.value;
      const session = token ? await verifySessionToken(token) : null;
      if (!session) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
    return NextResponse.rewrite(rewriteUrl);
  }

  // Gate every /admin and /api/admin route except the login page/endpoint.
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
