import "./header.css";

import Test from "../route/test";
import Search from "./search";
import { Suspense } from "react";
import Cate from "../cate";
import AnimateCategory from "./Category/animateCategory";
import { getCategory } from "@/allActions/category/category";

export const dynamic = "force-dynamic";
async function Header() {
  const categories = await getCategory();
  return (
    <div>
      <Search>
        <AnimateCategory categories={categories} />
      </Search>
    </div>
  );
}

export default Header;
