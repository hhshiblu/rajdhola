import { getUser } from "@/allActions/auth/auth";
import CheckOut from "@/componants/checkout";

import { redirect } from "next/navigation";

import React from "react";

async function Page({ searchParams }) {
  if (!searchParams?.cart_product) {
    redirect("/");
  }
  const user = await getUser();

  return (
    <div>
      <CheckOut user={user} />
    </div>
  );
}

export default Page;
