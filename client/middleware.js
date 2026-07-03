// client/middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const adminAuth = req.cookies.get("admin_auth");

  if (pathname.startsWith("/admin")) {
    if (!adminAuth && pathname !== "/admin/login") {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }

    if (adminAuth && pathname === "/admin/login") {
      return NextResponse.redirect(
        new URL("/admin", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
