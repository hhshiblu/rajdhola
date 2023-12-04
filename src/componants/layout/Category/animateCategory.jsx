import styles from "@/libs/styles";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

function AnimateCategory({ categories }) {
  return (
    <>
      {" "}
      <div className="pt-3">
        {categories.map((i, index) => {
          return (
            <div
              key={index}
              className={`${styles.normalFlex}  justify-between px-4 hover:bg-[#EAEDED] mx-2 text-[16px]  rounded-md cursor-pointer  leading-[26px] forHover `}
              // onClick={(e) => handleMenuItemClick(e, i)}
            >
              <h3 className=" cursor-pointer select-none m-2  font-[510]    text-gray-600">
                {i.name}
              </h3>
              <h2>
                <IoIosArrowForward className="text-gray-300" />
              </h2>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AnimateCategory;
