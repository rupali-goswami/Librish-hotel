import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const roomId = searchParams.get("roomId");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { message: "Missing parameters" },
        { status: 400 }
      );
    }

    const requestedCheckIn = new Date(checkIn);
    const requestedCheckOut = new Date(checkOut);

    const client = await clientPromise;
    const db = client.db("Cluster0");
    const bookings = db.collection("bookings");

    // 🔥 Overlap query
    const conflict = await bookings.findOne({
      roomId,
      checkIn: { $lt: requestedCheckOut },
      checkOut: { $gt: requestedCheckIn },
      status: { $ne: "cancelled" },
    });

    return NextResponse.json({
      available: !conflict,
    });
  } catch (error) {
    console.error("Availability Error:", error);
    return NextResponse.json(
      { message: "Failed to check availability" },
      { status: 500 }
    );
  }
}
