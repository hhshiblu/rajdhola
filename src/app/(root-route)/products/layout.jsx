import { getCategory } from "@/allActions/category/category";
import ProductList from "@/componants/ProductList/ProductList";
import FilterComponet from "@/componants/filter/FilterComponent";
import React from "react";

async function layout() {
  
  return <div className="grid grid-cols-12">
    <aside className="col-span-3 ">
      <FilterComponet/>
    </aside>

    <main className="col-span-9">
      <div className=""><ProductList/></div>
    </main>
  </div>
}

export default layout;
