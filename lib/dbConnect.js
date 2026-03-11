import { MongoClient } from "mongodb";

const URL = process.env.DB;

export const connectToDB = async () => {
  const client = new MongoClient(URL);
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};
