import {
  getCategory,
  getChildrensChildren,
} from "@/allActions/category/category";
import Footer from "@/componants/layout/footer";
import Header from "@/componants/layout/header";
import React from "react";
export const dynamic = "force-dynamic";
async function layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default layout;
