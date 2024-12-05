// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 1. Specify protected route prefixes
const protectedRoutePrefixes = ["/admin", "/Esculturas/"];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 2. Check if the current route is protected by verifying if it starts with any protected prefix
  const isProtectedRoute = protectedRoutePrefixes.some((prefix) =>
    path.startsWith(prefix),
  );

  // 3. Decrypt the session from the cookie
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");

  let user = null;
  try {
    user = userCookie ? JSON.parse(userCookie.value) : null;
  } catch (error) {
    console.error("Error parsing user cookie, setting user to null:", error);
    user = null;
  }

  // 4. Redirect to /login if the user is not authenticated and trying to access a protected route
  if (isProtectedRoute && !user) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Role-based access control for /admin routes
  if (path.startsWith("/admin")) {
    if (user?.rol === "admin") {
      // User is admin, allow access
      return NextResponse.next();
    } else {
      // User is not admin, redirect to login or another appropriate page
      const loginUrl = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 6. Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", // Protect /admin and its subpaths
    "/Esculturas/:path*", // Protect /Esculturas and its dynamic subpaths
  ],
};
