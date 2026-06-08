import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/bmc/:path*",
    "/competitor/:path*",
    "/documents/:path*",
    "/chat/:path*",
    "/my-profile/:path*",
    "/my-profile-edit/:path*",
    "/like-list/:path*",
    "/onboarding/:path*",
    "/notices/recommend",
  ],
};
