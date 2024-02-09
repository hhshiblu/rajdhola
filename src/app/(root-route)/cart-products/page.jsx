import React, { Suspense } from "react";
import Cartpage from "./cartpage";

function page({ searchParams }) {
  return <Cartpage searchParams={searchParams} />;
}

export default page;
