"use client";
import { FaAngleDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Cetagory from "../route/category/category";

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/data/category.json")
      .then((val) => val.json())
      .then((category) => setCategories(category))
      .catch((e) => console.log("error fetching data:", e));
  }, []);

  return (
    <div>
      {categories.map((category) => {
        return (
          <div className="px-4 py-2" key={category.id}>
            <div className="flex justify-between  cursor-pointer">
              {category.name}
              {category.children && category.children.length > 0 && (
                <FaAngleDown className="text-lg text-slate-600" />
              )}
            </div>
            {category.children && category.children.length > 0 && (
              <ul >
                {category.children.map((subcategory) => {
                  return <li key={subcategory.id} className="py-3 px-4 cursor-pointer text-sm hover:bg-slate-200 rounded-sm">{subcategory.name}</li>;
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
