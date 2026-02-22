import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const ADMIN_ID = "devrupali_admin";
const ADMIN_PASSWORD = "devrupali@567";
const JWT_SECRET = "super-secret-admin-key";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "ID and password required" },
        { status: 400 }
      );
    }

    if (email !== ADMIN_ID || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { role: "admin" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    const cookieStore = await cookies();
    cookieStore.set("adminToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    // ✅ IMPORTANT PART
    return NextResponse.json({
      success: true,
      admin: {
        id: "admin-1",
        email: ADMIN_ID,
      },
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
