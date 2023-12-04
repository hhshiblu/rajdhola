import { getCategory } from "@/allActions/category/category";
import styles from "@/libs/styles";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import AnimateCategory from "./layout/Category/animateCategory";

async function Cate() {
  const categories = await getCategory();

  return <AnimateCategory categories={categories} />;
}

export default Cate;
