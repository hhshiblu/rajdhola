import { getCategory } from "@/allActions/category/category";

import React from "react";

import AnimateCategory from "./layout/Category/animateCategory";

async function Cate() {
  const categories = await getCategory();

  return <AnimateCategory categories={categories} />;
}

export default Cate;
