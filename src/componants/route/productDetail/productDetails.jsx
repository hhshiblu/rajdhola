"use client";
import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { IoLocation } from "react-icons/io5";
import { GrServices } from "react-icons/gr";

// import Rating from "./Rating";

import Image from "next/image";

import Link from "next/link";

const ProductDetails = ({ data }) => {
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

  const incrementCount = () => {};

  const decrementCount = () => {};

  return (
    <>
      <div className="bg-white ">
        <br />
        {data ? (
          <div className={` mx-auto w-[90%] 800px:w-[90%]`}>
            <div className="w-full py-7">
              <div className="block w-full md:flex gap-5 ">
                {/* ---------------------------------------image part------------------- */}

                <div className=" w-full sm:w-[90%] md:w-[40%] lg:w-[26%] h-[55vh]">
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
                    {data.stock > 0 ? (
                      <span className=" text-red-700 font-[400]">In Stock</span>
                    ) : (
                      <span>no Stock</span>
                    )}
                  </p>

                  <hr />
                  <h1 className={`font-medium text-[16px] py-2`}>
                    {data.name}
                  </h1>
                  <hr />
                  <p className="font-medium pt-2">
                    Brand:
                    {data?.brand ? (
                      <span>{data?.brandName}</span>
                    ) : (
                      <span className="pl-2">No brand</span>
                    )}{" "}
                  </p>

                  <div className="flex items-center pb-2">
                    {/* <Rating rating={data?.ratings} /> */}
                    <div className="ml-3 text-gray-500"></div>
                    <span>
                      ({data?.ratings ? <span>{averageRating}/5</span> : ""})
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
                      {data?.discountPrice}
                      <span className="font-medium pr-2"> ৳</span>{" "}
                    </h4>
                    <h3
                      className={`font-[500] text-[16px]  mt-[-4px] line-through pl-5 flex`}
                    >
                      {data?.originalPrice ? (
                        <span>{data?.originalPrice + "৳"} </span>
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
                      {data?.color?.length > 0 ? "Color :" : ""}{" "}
                    </h1>
                    {data?.color ? (
                      <div className="flex">
                        {data?.color.map((color, index) => {
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
                      {data?.size?.length > 0 ? "Size :" : ""}{" "}
                    </h1>
                    {data?.size ? (
                      <h1 className="flex">
                        {data?.size.map((size, index) => {
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
                    <div class="inline-flex pl-12">
                      <div
                        className={`bg-[#00453e] border-[#e4434373] mt-2  rounded-sm w-[30px] h-[30px] flex items-center  justify-center cursor-pointer  shadow-lg hover:opacity-75 transition duration-300 ease-in-out`}
                        onClick={incrementCount}
                      >
                        <HiPlus size={24} color="#fff" className="" />
                      </div>
                      <span class="inline-flex  justify-center w-8 p-2 px-5">
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
                      onClick={() => addToCartHandler(data?.id)}
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
                        // onClick={addToCartHandler}
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
                      <p> shop Location</p>
                    </div>

                    <IoLocation size={20} className="text-gray-400 " />
                  </div>

                  <div className="block py-4 text-[15px] text-gray-700 ">
                    <h1 className="text-[#007185]"> {data?.seller?.name} </h1>
                    <h1 className="">{data?.seller?.address}</h1>
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

        <section className="bg-white">
          <div className="w-[90%]   h-full mx-auto pb-16  ">
            <div className="flex    ">
              <div className="w-full  lg:w-[65%] 800px:mx-auto  800px:pl-0 mr-2">
                <div className="800px:px-4 px-0">
                  <h1 className="text-[18px] font-medium md:text-[20px] py-2 text-slate-700  pl-4">
                    Product description
                  </h1>
                  <hr className="mr-4 " />
                  <hr className="mr-4 " />
                  <div className=" pt-4 items-center  font-medium flex  justify-between 800px:justify-around w-[90%] mr-auto min-h-fit">
                    <div>
                      <h1>Brand Name : {data.brandName}</h1>
                    </div>
                    <div>
                      <p>Available Color:</p>
                      {data.color.map((color, index) => (
                        <li key={index}> {color}</li>
                      ))}
                    </div>
                  </div>
                  <p className="py-5 text-slate-600">{data?.description}</p>
                </div>
                <div>
                  <hr className="mr-4" />
                  <h1 className="text-[18px] md:text-[20px] py-2 text-slate-800  font-medium pt-5 ">
                    Some popular reviews of :{" "}
                    <span className="text-[14px]  font-normal">
                      {data?.name?.slice(0, 25)} ...
                    </span>
                  </h1>
                  <Link href={`/shop/view/${data?.seller?._id}`}>
                    <h2 className="text-[15px] cursor-pointer hover:text-[#db3615] text-gray-500 pb-2">
                      {" "}
                      Shop : {data?.seller?.name}
                    </h2>
                  </Link>

                  <hr className="mr-4" />
                  <hr className="mr-4" />
                  {/* <h1 onClick={handelMessage}> chat me</h1> */}
                  {!data &&
                    !data?.reviews?.map((item, index) => {
                      return (
                        <div
                          className="w-full h-min   my-4 p-4 rounded-md "
                          key={index}
                        >
                          <div className="flex ">
                            {item && item.user.avatar ? (
                              <Image
                                src={``}
                                alt={item.name}
                                width={50}
                                height={50}
                                className="w-[50px] h-[50px] rounded-full"
                              />
                            ) : null}
                            <div className="w-full flex  pl-6 relative">
                              <h1 className="font-[500] mr-3">
                                {item.user.name}
                              </h1>
                              <span className="mr-2 !mt-1">
                                {" "}
                                {/* <Rating rating={data?.ratings} />{" "} */}
                              </span>{" "}
                            </div>
                          </div>

                          <div className="pl-16 mt-[-22px] text-gray-500 text-sm">
                            {item.comment}
                          </div>
                        </div>
                      );
                    })}

                  <div className="w-full flex justify-center py-3">
                    {data && data?.reviews?.length === 0 && (
                      <h5>No Reviews have for this product!</h5>
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden lg:block w-[30%] mr-auto pt-4 ">
                <h2 className="text-[18px] pb-1 font-normal ">
                  From {data && data?.seller?.name}
                </h2>
                <hr />
                <hr />
                <div className="flex flex-col pt-3 gap-4">
                  {/* {products?.slice(0, 4).map((p, i) => {
                  return ( */}
                  <div className="w-[90%] 1000px:w-[75%] h-[120px] m-auto">
                    <Link href={`${`/product/}`}`}>
                      <div className="relative ">
                        <Image
                          src={``}
                          alt=""
                          className="w-[100%] h-[120px] mx-auto"
                        />
                        <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-[#00453e] font-medium text-xs left-2 top-2">
                          {" "}
                          50 %
                        </div>
                      </div>
                    </Link>
                  </div>
                  {/* );
                })} */}
                </div>
              </div>
            </div>
          </div>
        </section>
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
