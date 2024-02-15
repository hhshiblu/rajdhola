import {
  getCategory,
  getChildrensChildren,
} from "@/allActions/category/category";
import Header from "@/componants/layout/header";
import React from "react";

async function layout({ children }) {
  return <div>{children}</div>;
}

export default layout;
