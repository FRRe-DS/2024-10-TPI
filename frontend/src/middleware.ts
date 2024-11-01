import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/inicio"];
const publicRoutes = ["/login", "/edition", "/register", "/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const correo = cookies().get("correo")?.value;

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !correo) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    correo === "admin@admin.com" &&
    req.nextUrl.pathname.startsWith("/inicio")
  ) {
    return NextResponse.next();
  } else if (
    correo !== "admin@admin.com" &&
    req.nextUrl.pathname.startsWith("/inicio")
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
