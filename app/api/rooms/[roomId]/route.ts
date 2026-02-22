import { NextResponse } from "next/server";
import rooms from "@/app/data/rooms.json";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params; // ✅ VERY IMPORTANT

  const room = (rooms as any[]).find(
    (r) => String(r.roomId) === String(roomId)
  );

  if (!room) {
    return NextResponse.json(
      { message: "Room not found", roomId },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: room });
}
