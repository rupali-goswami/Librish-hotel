import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  console.log("Middleware running on:", req.nextUrl.pathname);
  console.log("Token:", token);

  if (req.nextUrl.pathname.startsWith("/userdashboard")) {
    if (!token) {
      console.log("No token, redirecting...");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      verifyToken(token);
    } catch (err) {
      console.log("Invalid token, redirecting...");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/userdashboard/:path*"],
};
