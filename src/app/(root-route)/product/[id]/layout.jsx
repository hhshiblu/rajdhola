import Header from "@/componants/layout/header";
import React from "react";
import connectToDB from "@/libs/connect";
import { ObjectId } from "mongodb";
import Footer from "@/componants/layout/footer";
import Search from "@/componants/layout/search";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getCategory } from "@/allActions/category/category";
import { getServerSession } from "next-auth";

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

async function layout({ children }) {
  const categories = await getCategory();

  const session = await getServerSession(authOptions);
  return (
    <>
      <Search user={session && session?.user} categories={categories} />
      {children}
      <Footer />
    </>
  );
}

export default layout;
