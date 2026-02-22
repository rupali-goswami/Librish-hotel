import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const { bookingId, userId } = await req.json();

    if (!bookingId || !userId) {
      return NextResponse.json({
        success: false,
        message: "Missing data",
      });
    }

    // ✅ FIX: convert userId to ObjectId
    const booking = await db.collection("bookings").findOne({
      _id: new ObjectId(bookingId),
      userId: new ObjectId(userId),
    });

    if (!booking) {
      return NextResponse.json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status?.toLowerCase() === "cancelled") {
      return NextResponse.json({
        success: false,
        message: "Booking already cancelled",
      });
    }

    await db.collection("bookings").updateOne(
      { _id: new ObjectId(bookingId) },
      {
        $set: {
          status: "cancelled",
          cancelledAt: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}
