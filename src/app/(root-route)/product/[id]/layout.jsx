import Header from "@/componants/layout/header";
import React from "react";
import connectToDB from "@/libs/connect";
import { ObjectId } from "mongodb";

export async function generateMetadata({ params }) {
  const db = await connectToDB();

  const product = await db
    .collection("products")
    .findOne({ _id: new ObjectId(params.id) });
  return {
    title: ` rajdhola.com - ${product.name} `,
    description: product.description,
    metadataBase: new URL("https://rajdhola.com"),
    keywords: product.tags ? product.tags.map((tag) => tag.name) : [],
    openGraph: {
      images: product.images.map((image) => ({ url: image.url })),
    },
  };
}

function layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default layout;
