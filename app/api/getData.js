import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    console.log("MongoDB connected successfully!");
    const db = client.db("sample_mflix");
    const collection = db.collection("movies");
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
}
