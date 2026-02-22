import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, phone, message } = await req.json();

    if (!name || !email || !phone || !message) {
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
    const collection = db.collection("contacts");

    const result = await collection.insertOne({
      name,
      email,
      subject: subject || "",
      phone,
      message,
      timestamp: new Date(),
      status: "unread",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
        data: { id: result.insertedId },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("MongoDB Insert Error:", error);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Cluster0");
    const collection = db.collection("contacts");

    const contacts = await collection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("MongoDB Fetch Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}



export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("Cluster0");

    await db.collection("contacts").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Failed to delete" },
      { status: 500 }
    );
  }
}

