import clientPromise from "../../lib/mongodb"; // MongoDB client import

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Get the data from the request body
      const { name, email, subject, phone, message } = req.body;

      // Validate the required fields
      if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db("Cluster0"); // Replace with your database name
      const collection = db.collection("contacts"); // Replace with your collection name

      // Insert the form data into the MongoDB collection
      const result = await collection.insertOne({
        name,
        email,
        subject,
        phone,
        message,
        timestamp: new Date(),
      });

      // Return a success message
      res.status(200).json({
        message: "Your message has been sent successfully!",
        data: result,
      });
    } catch (error) {
      console.error("Error inserting contact data into MongoDB:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  } else {
    // Handle any non-POST requests
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
