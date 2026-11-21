import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type UserRole = "USER" | "ADMIN";

const dashboardByRole: Record<UserRole, string> = {
  USER: "/user/dashboard",
  ADMIN: "/administrator/dashboard",
};

async function getVerifiedRole(token?: string): Promise<UserRole | null> {
  const secret = process.env.CHIPER_KEY;
  if (!token || !secret) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      { algorithms: ["HS256"] },
    );
    const role =
      typeof payload.role === "string" ? payload.role.toUpperCase() : null;

    return role === "USER" || role === "ADMIN" ? role : null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = await getVerifiedRole(request.cookies.get("token")?.value);
  const isPublicAuthPage = pathname === "/login" || pathname === "/register";
  const isUserRoute = pathname === "/user" || pathname.startsWith("/user/");
  const isAdminRoute =
    pathname === "/administrator" || pathname.startsWith("/administrator/");

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(role ? dashboardByRole[role] : "/login", request.url),
    );
  }

  if (isPublicAuthPage) {
    if (role) {
      return NextResponse.redirect(new URL(dashboardByRole[role], request.url));
    }

    return NextResponse.next();
  }

  if (!isUserRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  if (!role) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    response.cookies.delete("role");
    return response;
  }

  if (isUserRoute && role === "ADMIN") {
    return NextResponse.redirect(new URL(dashboardByRole.ADMIN, request.url));
  }

  if (isAdminRoute && role === "USER") {
    return NextResponse.redirect(new URL(dashboardByRole.USER, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/user/:path*",
    "/administrator/:path*",
  ],
};
