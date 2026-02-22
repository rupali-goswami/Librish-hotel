import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

/* =======================
   CREATE BOOKING (POST)
======================= */
export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      roomType,
      checkIn,
      checkOut,
      guests,
    } = await req.json();

    if (!name || !email || !phone || !checkIn || !checkOut) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("Cluster0");
    const collection = db.collection("bookings");

    const result = await collection.insertOne({
      name,
      email,
      phone,
      roomType: roomType || "",
      guests: guests || 1,
      checkIn,
      checkOut,
      status: "pending", // pending | confirmed | cancelled
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully!",
        data: { id: result.insertedId },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking Insert Error:", error);
    return NextResponse.json(
      { message: "Failed to create booking" },
      { status: 500 }
    );
  }
}

/* =======================
   GET ALL BOOKINGS
======================= */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Cluster0");
    const collection = db.collection("bookings");

    const bookings = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Booking Fetch Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

/* =======================
   DELETE BOOKING
======================= */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Cluster0");

    await db.collection("bookings").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking Delete Error:", error);
    return NextResponse.json(
      { message: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
