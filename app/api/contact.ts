import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function POST(req: Request) {
  try {
    // Get the data from the request body
    const { name, email, subject, phone, message } = await req.json();

    // Validate the required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("Cluster0");
    const collection = db.collection("contacts");

    // Insert the form data into the MongoDB collection
    const result = await collection.insertOne({
      name,
      email,
      subject: subject || "",
      phone,
      message,
      timestamp: new Date(),
      status: "unread",
    });

    // Return a success message
    return NextResponse.json(
      {
        message: "Your message has been sent successfully! We will get back to you soon.",
        success: true,
        data: {
          id: result.insertedId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting contact data into MongoDB:", error);
    return NextResponse.json(
      { message: "Failed to send message. Please try again later.", error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Cluster0");
    const collection = db.collection("contacts");

    const contacts = await collection.find({}).sort({ timestamp: -1 }).toArray();

    // Convert MongoDB ObjectIds to strings for JSON
    const sanitized = contacts.map((c) => ({
      ...c,
      _id: c._id?.toString ? c._id.toString() : c._id,
    }));

    return NextResponse.json({ success: true, data: sanitized }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contacts from MongoDB:", error);
    return NextResponse.json(
      { message: "Failed to fetch contacts", error: String(error) },
      { status: 500 }
    );
  }
}
