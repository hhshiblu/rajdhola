import { MongoClient } from "mongodb";

const connectToDB = async () => {
  const client = await MongoClient.connect(process.env.DATABASE_URL);
  return client.db("ecom-Shop");
};

export default connectToDB;
