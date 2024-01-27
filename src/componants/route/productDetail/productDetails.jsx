"use client";
import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { IoLocation } from "react-icons/io5";
import { GrServices } from "react-icons/gr";

// import Rating from "./Rating";
import Image from "next/image";

import { addTocart } from "@/redux/action/cart";
import { toast } from "sonner";
import ProductDescription from "./productDescription";

const ProductDetails = ({ data }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [selectedColor, setSelectedColor] = useState({
    color: "",
    index: -1,
  });
  const [selectedSize, setSelectedSize] = useState({
    size: "",
    index: -1,
  });

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  const addToCartHandler = () => {
    if (cart === null) {
      const cartData = {
        productId: data?.product._id,
        quantity: count, // Assuming count is the quantity
        color: selectedColor.color,
        size: selectedSize.size,
      };
      dispatch(addTocart(cartData));
    } else {
      const isItemExists = cart.find(
        (item) => item.productId === data.product._id
      );

      if (isItemExists) {
        toast.error("Item already in cart!", {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      } else {
        if (data.product.stock <= 1) {
          toast.error("Product stock limited!", {
            duration: 3000,
            cancel: {
              label: "cancel",
            },
          });
        } else {
          const cartData = {
            productId: data?.product._id,
            quantity: count,
            color: selectedColor.color,
            size: selectedSize.size,
          };

          dispatch(addTocart(cartData));

          toast.success("Item added to cart successfully!", {
            duration: 3000,
            cancel: {
              label: "cancel",
            },
          });
        }
      }
    }
  };
  const incrementCount = () => {};

  const decrementCount = () => {};

  return (
    <>
      <div className="bg-white ">
        <br />
        {data.product ? (
          <div className={` mx-auto w-[90%] 800px:w-[90%]`}>
            <div className="w-full py-7">
              <div className="block w-full md:flex gap-5 ">
                {/* ---------------------------------------image part------------------- */}

                <div className=" w-full sm:w-[90%] md:w-[40%] lg:w-[26%] h-[44vh] md:h-[55]">
                  <div className="h-[80%]  m-auto">
                    {data && data.images && data.images[select] && (
                      <Image
                        src={``}
                        alt=""
                        className=" overflow-hidden  w-[100%] 800px:w-[98%] m-auto h-[100%]"
                        height={100}
                        width={100}
                      />
                    )}
                  </div>

                  <div className=" flex gap-4 w-full pt-6">
                    {data &&
                      data?.images?.map((i, index) => (
                        <div
                          className={`${
                            select === index
                              ? "border-[2px] border-red-400"
                              : "null border"
                          } cursor-pointer h-[40px] w-[40px] flex justify-center items-center `}
                          key={index}
                        >
                          <Image
                            src={``}
                            alt=""
                            className="  h-full overflow-hidden mx-auto"
                            width={100}
                            height={100}
                            onClick={() => setSelect(index)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                {/* ------------------------ product Information part ---------------------------- */}

                <div className="!w-full md:!w-[50%] lg:w-[40%] pt-5 ">
                  <p className="pb-2">
                    {" "}
                    {data.product.stock > 0 ? (
                      <span className=" text-red-700 font-[500] ">
                        In Stock
                      </span>
                    ) : (
                      <span>no Stock</span>
                    )}
                  </p>

                  <hr />
                  <h1 className={`font-medium text-[16px] py-2`}>
                    {data.product.name}
                  </h1>
                  <hr />
                  <p className="font-medium pt-2">
                    Brand:
                    {data?.product.brandName ? (
                      <span>{data?.product.brandName}</span>
                    ) : (
                      <span className="pl-2">No brand</span>
                    )}{" "}
                  </p>

                  <div className="flex items-center pb-2">
                    {/* <Rating rating={data?.ratings} /> */}
                    <div className="ml-3 text-gray-500"></div>
                    <span>
                      (
                      {data?.product.ratings ? (
                        <span>{averageRating}/5</span>
                      ) : (
                        ""
                      )}
                      )
                    </span>
                    <span className="pl-3">
                      {" "}
                      |{" "}
                      <span className="text-[#0d14e4]">
                        {" "}
                        {/* {totalReviewsLength} */}
                        Ratings
                      </span>{" "}
                    </span>
                  </div>
                  <hr />

                  <div className="flex pt-3 my-2">
                    <h4
                      className={`font-bold  text-[18px] text-[#333] font-Roboto`}
                    >
                      {data?.product.discountPrice}
                      <span className="font-medium pr-2"> ৳</span>{" "}
                    </h4>
                    <h3
                      className={`font-[500] text-[16px]  mt-[-4px] line-through pl-5 flex`}
                    >
                      {data?.product.originalPrice ? (
                        <span>{data?.product.originalPrice + "৳"} </span>
                      ) : null}
                    </h3>
                    {/* <div className="text-sm  text-blue-950 pl-4">
                      ({percentageDiscount.toFixed(0)}%)
                    </div> */}
                    {/* <h3 className="pl-3 mt-[-4px] "> {data?.originalPrice? ( "("+discountPercentage+"% )") :null }</h3> */}
                  </div>
                  <hr />
                  <div className="py-2 flex items-center">
                    <h1 className="font-medium text-sm md:text-[17px]">
                      {data?.product.color?.length > 0 ? "Color :" : ""}{" "}
                    </h1>
                    {data?.product.color ? (
                      <div className="flex">
                        {data?.product.color.map((color, index) => {
                          // Change 'i' to 'color' here
                          return (
                            <span
                              key={index}
                              className={`${
                                selectedColor.index === index
                                  ? "border border-red-400"
                                  : null
                              } cursor-pointer p-[3px] mx-2`}
                            >
                              <h1
                                onClick={() =>
                                  setSelectedColor({ color, index })
                                }
                              >
                                {color}{" "}
                              </h1>{" "}
                              {/* Change 'i.color' to 'color' here */}
                            </span>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                  <div className="py-2 flex items-center">
                    <h1 className="font-medium text-sm md:text-[17px]">
                      {data?.product.size?.length > 0 ? "Size :" : ""}{" "}
                    </h1>
                    {data?.product.size ? (
                      <h1 className="flex">
                        {data?.product.size.map((size, index) => {
                          return (
                            <span
                              key={index}
                              className={`${
                                selectedSize.index === index
                                  ? "border border-red-400"
                                  : null
                              } cursor-pointer px-[2px] mx-2`}
                            >
                              <h1
                                onClick={() => setSelectedSize({ size, index })}
                              >
                                {size}{" "}
                              </h1>{" "}
                              {/* Change 'i.color' to 'color' here */}
                            </span>
                          );
                        })}
                      </h1>
                    ) : null}
                  </div>

                  {/* increment button */}

                  <div className="flex items-center mt-4 justify-between pr-3">
                    <div className="inline-flex pl-12">
                      <div
                        className={`bg-[#00453e] border-[#e4434373] mt-2  rounded-sm w-[30px] h-[30px] flex items-center  justify-center cursor-pointer  shadow-lg hover:opacity-75 transition duration-300 ease-in-out`}
                        onClick={incrementCount}
                      >
                        <HiPlus size={24} color="#fff" className="" />
                      </div>
                      <span className="inline-flex  justify-center w-8 p-2 px-5">
                        {count}
                      </span>
                      <div
                        className="bg-[#22988a]  rounded-sm w-[30px] mt-2  h-[30px] flex items-center  justify-center cursor-pointer shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                        onClick={decrementCount}
                      >
                        <HiOutlineMinus size={24} color="#fff" />
                      </div>
                    </div>
                    <div>
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer"
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer"
                          // onClick={() => addToWishlistHandler(data?)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>

                  {/* -------------------------buy now /add to cart----------- */}

                  <div className="md:flex justify-center mr-5 pt-8 hidden ">
                    <div
                      className={`w-[150px] bg-[#050320]  my-3  justify-center  cursor-pointer !mt-6 !rounded !h-10 flex items-center mr-5`}
                      onClick={() => addToCartHandler(data?.product._id)}
                    >
                      <span className="text-white flex items-center">
                        Buy Now
                        <AiOutlineShoppingCart className="ml-1" />
                      </span>
                    </div>
                    <div
                      className={`w-[150px] bg-[#00453e]  my-3  justify-center  cursor-pointer !mt-6 !rounded !h-10 flex items-center`}
                    >
                      <span
                        className="text-white flex items-center"
                        onClick={addToCartHandler}
                      >
                        Add to cart <AiOutlineShoppingCart className="ml-1" />
                      </span>
                    </div>
                  </div>

                  {/* -----------------------------------shop name------ */}
                </div>
                {/* ------------------------------------------- shop adress part------------------------           */}
                <div className="hidden lg:block lg:w-[25%] border float-left  shadow-md px-4">
                  <div className="flex justify-between pt-8  text-base ">
                    <div className="text-gray-400">
                      <p> Shop Information</p>
                    </div>

                    <IoLocation size={20} className="text-gray-400 " />
                  </div>

                  <div className="block py-4 text-[15px] text-gray-700 ">
                    <h1 className="text-[#007185]"> {data?.seller?.name} </h1>
                    {/* <h1 className="">{data?.seller?.address}</h1> */}
                  </div>
                  <hr />

                  <div className="flex justify-between pt-8  text-base ">
                    <div className="text-lg text-gray-500">
                      <p> service</p>
                    </div>

                    <GrServices size={15} className="text-gray-400" />
                  </div>
                  <div className="flex flex-col pb-5">
                    <div className="pt-2 pl-3 text-[18px]">
                      <h2>7 days Returns</h2>
                      <p className="text-gray-400 text-sm">
                        {" "}
                        change mind not allow
                      </p>
                    </div>
                    <div className="pl-3 text-lg pt-2">
                      <h3>Warranty not available</h3>
                    </div>
                  </div>
                  <hr />
                  <div className="py-5">
                    <h2> Cash on Delivery Available</h2>
                  </div>
                  <hr />
                  <div className="flex justify-around items-center py-4">
                    <div>
                      <p className="text-gray-400">Ship on Time</p>
                      <h1 className=" text-bold text-xl pt-4 text-center">
                        90%
                      </h1>
                    </div>
                    <div>
                      <p className="text-gray-400">Chat Response</p>
                      <h1 className=" text-bold text-xl pt-4 text-center">
                        100%
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              {/* ----------------------------------- shop name---------------------- */}
            </div>
            {/* ------------------product details info-------------------- */}

            <br />
            <br />
          </div>
        ) : null}
        <ProductDescription data={data?.product} seller={data.seller} />
      </div>

      {/* small sceen product details page */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-[#050320] h-[48px] mx-auto z-50 ">
        <div className="flex">
          <div className="grow rounded-tr-[30px] ">
            <div className="flex mx-auto justify-between ">
              <div className="flex w-[45%] items-center  justify-around">
                <button
                  type="button"
                  className="text-center px-3 py-4  flex flex-col justify-center items-center "
                >
                  <p className="pt-[-2px] text-[15px] text-white font-[500] ">
                    Profile
                  </p>
                </button>
                <button
                  type="button"
                  className="text-center px-3 py-4  flex flex-col justify-center items-center "
                >
                  <p className="pt-[-2px] text-[15px] text-white font-[500] ">
                    Rajdhola
                  </p>
                </button>
              </div>

              <div className="flex w-[55%] bg-[#00453e] font-medium ">
                <h1 className="text-center  pt-3 text-white  w-[45%]   bg-[#00453e] cursor-pointer">
                  Buy Now
                </h1>

                <h1
                  className="text-center h-full bg-[#22988a] w-[55%] pt-3 px-2  text-white  font-medium  cursor-pointer"
                  style={{
                    clipPath: "polygon(21% 0, 100% 0, 100% 100%, 0% 100%)",
                  }}
                  onClick={addTocart}
                >
                  Add to Cart
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
