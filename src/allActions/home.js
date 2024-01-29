"use server";
import connectToDB from "@/libs/connect";

export const getBanars = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("banars");
    const banarsData = await collection.find().toArray();
    const banars = JSON.parse(JSON.stringify(banarsData));
    return banars ? banars : [];
  } catch (error) {
    return { status: "error", message: error.message };
  }
};
