console.log("MongoDB client module loaded");

const client = new MongoClient('mongodb+srv://devrupali_db_user:devrupali567@cluster0.s7le2p0.mongodb.net/Cluster0?retryWrites=true&w=majority');

let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } else {
    console.log("Creating new MongoDB connection...");
    global._mongoClientPromise = client.connect();
    clientPromise = global._mongoClientPromise;
  }
} else {
  console.log("Using direct MongoDB client connection in production...");
  clientPromise = client.connect();
}

clientPromise
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

export default clientPromise;
