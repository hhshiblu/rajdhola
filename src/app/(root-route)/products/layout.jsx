import { getCategory } from "@/allActions/category/category";
import React from "react";

async function layout() {
  const categories = await getCategory();
  return <div></div>;
}

export default layout;
