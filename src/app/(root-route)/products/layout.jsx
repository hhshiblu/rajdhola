import { getCategory } from "@/allActions/category/category";
import FilterComponet from "@/componants/filter/FilterComponent";
import React from "react";

async function layout() {
  
  return <div className="flex">
    <div className="w-6/12">
      <FilterComponet/>
    </div>

    <div>
      ProductList
    </div>
  </div>;
}

export default layout;
