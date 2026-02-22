import { MongoClient } from "mongodb";

console.log("MongoDB client module loaded");

const client = new MongoClient(
  "mongodb+srv://devrupali_db_user:devrupali567@cluster0.s7le2p0.mongodb.net/Cluster0?retryWrites=true&w=majority"
);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (globalWithMongo._mongoClientPromise) {
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    console.log("Creating new MongoDB connection...");
    globalWithMongo._mongoClientPromise = client.connect();
    clientPromise = globalWithMongo._mongoClientPromise;
  }
} else {
  console.log("Using direct MongoDB client connection in production...");
  clientPromise = client.connect();
}

clientPromise
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error: unknown) => {
    console.error("Error connecting to MongoDB:", error);
  });

export default clientPromise;
