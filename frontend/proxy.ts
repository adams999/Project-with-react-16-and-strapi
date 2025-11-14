import { type NextRequest, NextResponse } from "next/server";
import { STRAPI_BASE_URL } from "./lib/strapi";

const protectedRoutes = ["/api/protected", "/dashboard", "/settings"];

function checkIsProtectedRoute(url: string): boolean {
  return protectedRoutes.includes(url);
}

export async function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const isProtectedRoute = checkIsProtectedRoute(currentPath);

  if (!isProtectedRoute) return NextResponse.next();

  // Logic to verify authentication
  try {
    //check if user have token
    //check if user is in db
    //check if user is active?

    const cookieStore = request.cookies;
    const jwt = cookieStore.get("jwt")?.value;

    if (!jwt) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const response = await fetch(`${STRAPI_BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });

    const userResponse = await response.json();

    if (!userResponse) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    //console.log("Authentication check failed:", error);
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}


export const config = {
  matcher: ["/api/protected/:path*", "/dashboard/:path*", "/dashboard", "/settings/:path*"],
};