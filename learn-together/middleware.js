import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/login(.*)",
  "/signup(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher(.*)"]);
const isProtectedRoute = createRouteMatcher(["/profile(.*)", "/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // >>> EARLY RETURN: Allow API routes and assets to pass through unchanged
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Now it's safe to call auth() / auth.protect() for page requests
  const { userId, sessionClaims } = await auth();

  // Protect non-public routes (pages)
  if (!isPublicRoute(req)) {
    await auth.protect({
      unauthenticatedUrl: new URL("/login", req.url).toString(),
    });
  }

  // Role-based access control for authenticated users
  if (userId) {
    const role =
      sessionClaims?.publicMetadata?.role ||
      sessionClaims?.metadata?.role ||
      sessionClaims?.role ||
      "user";

    // Role-based home page redirects
    if (pathname === "/") {
      if (role === "admin") return NextResponse.redirect(new URL("/admin", req.url));
      if (role === "teacher") return NextResponse.redirect(new URL("/teacher", req.url));
      // users stay on home page
    }

    // Admin route protection
    if (isAdminRoute(req) && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Teacher route protection (admins can access too)
    if (isTeacherRoute(req) && role !== "teacher" && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Default: allow next
  return NextResponse.next();
});

export const config = {
  matcher: [
    // This large negative-matching pattern keeps the middleware for pages,
    // while we still optionally include API/trpc below — you can remove the next line
    // if you don't need middleware on API routes at all.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
