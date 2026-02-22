import rooms from "@/app/data/rooms.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: rooms
  });
}
