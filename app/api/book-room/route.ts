import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";


export async function POST(req: Request) {
  try {
    const body = await req.formData();
    // console.log(localStorage.getItem("usersession"))
    // return false;
    // Extract all the form data
    const bookingData = {
       userId: new ObjectId(body.get("userId") as string), // ✅ IMPORTANT
      roomId: body.get("roomId"),
      checkIn: body.get("checkIn"),
      checkOut: body.get("checkOut"),
      total: body.get("total"),
      

      firstName: body.get("firstName"),
      lastName: body.get("lastName"),
      email: body.get("email"),
      phone: body.get("phone"),

      address: body.get("address"),
      city: body.get("city"),
      state: body.get("state"),
      zip: body.get("zip"),
      country: body.get("country"),

      specialRequest: body.get("specialRequest"),
      status: "pending",  // Default status
      createdAt: new Date(),
    };
console.log("USER ID 👉", bookingData.userId);
    // Basic validation
    if (
      !bookingData.roomId ||
      !bookingData.checkIn ||
      !bookingData.checkOut ||
      !bookingData.firstName ||
      !bookingData.email ||
      !bookingData.phone
    ) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("Cluster0");
    const collection = db.collection("bookings");

    // Insert the booking data into MongoDB
    const result = await collection.insertOne(bookingData);

    return NextResponse.json(
      {
        success: true,
        message: "Booking confirmed successfully",
        data: { id: result.insertedId },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { message: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Cluster0");
    const collection = db.collection("bookings");

    // Fetch all bookings
    const bookings = await collection
      .find({})
      .sort({ createdAt: -1 }) // latest first
      .toArray();

    return NextResponse.json(
      { success: true, data: bookings },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get Bookings Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
