"use client";
import { FaAngleDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Cetagory from "../route/category/category";
import Checkbox from "../input/checkbox";

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
          <div className="px-4 py-3" key={category.id}>
            <div className="flex justify-between  cursor-pointer">
              {category.name}
              {category.children && category.children.length > 0 && (
                <FaAngleDown className="text-xl text-slate-600" />
              )}
            </div>
            {category.children && category.children.length > 0 && (
              <ul className="">
                {category.children.map((subcategory) => {
                  return (
                    <li
                      id="checkbox"
                      key={subcategory.id}
                      className="py-3 px-4 cursor-pointer text-sm hover:bg-slate-200 rounded-sm flex items-center justify-between"
                    >
                      <span>{subcategory.name}</span>
                      <Checkbox />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
