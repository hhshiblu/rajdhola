"use server";
import connectToDB from "@/libs/connect";

export const getBanars = async () => {
  try {
    const db = await connectToDB();
    const collection = db.collection("banars");
    const banarsData = await collection.find({ role: 1 }).toArray();
    const banars = JSON.parse(JSON.stringify(banarsData));
    return banars ? banars : [];
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

// export const getBanarsByRole = async () => {
//   try {
//     const db = await connectToDB();
//     const collection = db.collection("banars");

//     // Filter banners where role is equal to 1
//     const banarsData = await collection.find({ role: 1 }).toArray();

//     const banars = JSON.parse(JSON.stringify(banarsData));

//     return banars ? banars : [];
//   } catch (error) {
//     return { status: "error", message: error.message };
//   }
// };
