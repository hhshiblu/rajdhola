"use client";
import CartpageLoading from "@/componants/loader/cartpageLoading";
import styles from "@/libs/styles";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { toast } from "sonner";

function CartProduct({
  data,
  quantity,
  quantityChangeHandler,
  removeFromCartHandler,
  color,
  size,
}) {
  const [value, setValue] = useState(quantity);
  const totalPrice = (data.discountPrice || data.originalPrice) * value;

  const increment = () => {
    if (data.stock < value + 1) {
      toast.error("Product stock limited!", {
        duration: 3000,
        cancel: {
          label: "cancel",
        },
      });
    } else {
      const updatedQuantity = value + 1;
      setValue(updatedQuantity);

      quantityChangeHandler(data._id, updatedQuantity);
    }
  };
  const decrement = () => {
    if (value > 1) {
      const updatedQuantity = value - 1;
      setValue(updatedQuantity);

      quantityChangeHandler(data._id, updatedQuantity);
    }
  };

  return (
    <>
      <div className="flex gap-3 items-center mt-1" id={`cart_${data._id}`}>
        <div>
          <Image
            alt={data.name}
            loading="lazy"
            width="80"
            height="130"
            decoding="async"
            data-nimg="1"
            className="mx-auto 600px:w-[90px] w-[60px] h-[50px] 600px:h-[70px] rounded-sm  text-transparent transition-opacity duration-300 ease-in-out opacity-100 "
            src={data.images[0].url}
          />
        </div>
        <div className="flex flex-1">
          <div className="flex flex-col justify-between flex-1">
            <p className="text-[14px] 600px:text-[15px] text-gray-700 line-clamp-1 pr-2 ">
              {data.name}
            </p>
            <div className="inline-flex ">
              <div
                className={`bg-[#00453e] border-[#00453e]  rounded-full w-[19px] h-[19px] 600px:w-[25px]  600px:h-[25px] ${styles.normalFlex} justify-center cursor-pointer `}
                onClick={increment}
              >
                <HiPlus size={18} color="#fff" />
              </div>
              <span className="inline-flex justify-center w-8  px-5">
                {value}
              </span>
              <div
                className="bg-[#195851]  rounded-full w-[19px] h-[19px] 600px:w-[25px]  600px:h-[25px] flex items-center justify-center cursor-pointer font-medium"
                onClick={decrement}
              >
                <HiOutlineMinus size={16} color="#fff" />
              </div>
            </div>
            <div className="inline-flex gap-3 items-center">
              {color ? (
                <div className="text-gray-600 text-[14px]">color : {color}</div>
              ) : (
                ""
              )}
              {size ? (
                <div className="text-gray-600 text-[14px]"> size : {size}</div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="inline-flex flex-col items-end">
            <p className="text-[16px] 600px:text-[17px]">
              ৳ <span> </span>
              {totalPrice}
            </p>
            <button
              className="mt-2 font-medium text-gray-500 underline hover:text-red-700 text-[15px] 600px:text-[16px]"
              onClick={() => removeFromCartHandler(data._id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProduct;
