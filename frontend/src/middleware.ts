import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/admin"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookieStore = cookies();

  const userString = cookieStore.get("user");
  const user = userString ? JSON.parse(userString?.value) : null;

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (user?.rol === "admin" && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  } else if (
    user?.rol !== "admin" &&
    req.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
