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

  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <div>
      {categories.map((category) => {
        const isOpen = openCategory === category.id;

        return (
          <div className="" key={category.id}>
            <div
              className="flex justify-between cursor-pointer hover:bg-blue-200 px-4 py-5 rounded"
              onClick={() => toggleCategory(category.id)}
            >
              {category.name}
              {category.children && category.children.length > 0 && (
                <FaAngleDown
                  className={`text-xl text-slate-400 transform ${
                    isOpen ? "rotate-180" : ""
                  } transition-transform`}
                />
              )}
            </div>
            {category.children && category.children.length > 0 && (
              <ul
                className={`${
                  isOpen ? "max-h-96" : "max-h-0 overflow-hidden"
                } transition`}
              >
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
