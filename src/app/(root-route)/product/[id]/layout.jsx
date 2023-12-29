import Header from "@/componants/layout/header";
import React from "react";
import prisma from "../../../../../prisma/prisma";

export async function generateMetadata({ params }) {
  const product = await prisma.products.findUnique({
    where: {
      id: params.id,
    },
  });

  return {
    title: ` rajdhola.com - ${product.name} `,
    description: product.description,
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
