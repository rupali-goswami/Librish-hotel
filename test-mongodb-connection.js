import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb+srv://devrupali_db_user:devrupali567@cluster0.s7le2p0.mongodb.net/Cluster0?retryWrites=true&w=majority');


//const client = new MongoClient(process.env.MONGODB_URI);

console.log("hii");
async function testConnection() {
  try {
    // Attempting to connect to MongoDB
    await client.connect();
    console.log("MongoDB connection successful!");

    const db = client.db("Cluster0");  // Database name
    const collection = db.collection("movies");  // Collection name
    const data = await collection.find({}).toArray();
    console.log("Data from MongoDB:", data);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error(error.stack);
  } finally {
    await client.close();
  }
}

testConnection();
