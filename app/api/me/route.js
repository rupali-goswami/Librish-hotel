import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import clientPromise from "@/lib/mongodb";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ user: null });

    const decoded = verifyToken(token);

    const client = await clientPromise;
    const db = client.db("Cluster0");
    const user = await db.collection("users").findOne({ _id: decoded.id });

    return NextResponse.json({
      user: { name: user.name, email: user.email }
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
