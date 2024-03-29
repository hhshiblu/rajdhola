"use client";
import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { addTocart } from "@/redux/action/cart";
import { toast } from "sonner";
import ProductDescription from "./productDescription";
import DetailsImage from "./detailsImage";
import Rating from "../rating/rating";
import ProductSideInfo from "./productSideInfo";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

const ProductDetails = ({ data }) => {
  const router = useRouter();
  const {
    name,
    images,
    color,
    size,
    country,
    warranty,
    capacity,
    powerConsumed,
    powerSupply,
    productMaterial,
    stock,
    presentPrice,
    ratings,
    previousPrice,
    brandName,
  } = data?.product;
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
  const handleClick = () => {
    setClick(!click);
  };

  const addToCartHandler = () => {
    if (cart === null) {
      const cartData = {
        productId: data?.product._id,
        quantity: count,
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
        if (data.product.stock < 1) {
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

  const incrementCount = () => {
    if (stock <= 1) {
      toast.error("Product stock limited!");
    } else {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const buyNowHandlar = () => {
    if (data.product.stock < 1) {
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
      router.push("/cart-products");
    }
  };
  return (
    <>
      <div className="bg-white ">
        <br />
        {data.product ? (
          <div className={` mx-auto w-[90%] 800px:w-[90%]`}>
            <div className="w-full md:py-7 py-4">
              <div className="block w-full md:flex gap-5 ">
                {/* ---------------------------------------image part------------------- */}
                <DetailsImage
                  images={images}
                  select={select}
                  setSelect={setSelect}
                />
                {/* ------------------------ product Information part ---------------------------- */}

                <div className="!w-full md:!w-[50%] lg:w-[40%] pt-4 ">
                  <p className="pb-2">
                    {" "}
                    {stock > 0 ? (
                      <span className=" text-red-700 font-[500] ">
                        In Stock
                      </span>
                    ) : (
                      <span>no Stock</span>
                    )}
                  </p>

                  <hr />
                  <h1 className={`font-medium text-[16px] py-2`}>{name}</h1>
                  <hr />
                  <p className="pt-2 text-[14px] font-[400]">
                    Country of origin :{" "}
                    <span className="font-medium">{country}</span>
                  </p>
                  <p className="font-normal text-[14px] ">
                    Brand :
                    {brandName ? (
                      <span className="pl-3  font-medium">{brandName}</span>
                    ) : (
                      <span className="pl-3 font-medium">No brand</span>
                    )}{" "}
                  </p>

                  <div className="flex items-center pb-2">
                    <Rating rating={ratings} />
                    <div className="ml-3 text-gray-500"></div>
                    <span>
                      ({ratings ? <span>{ratings}/5</span> : 0}
                      /5)
                    </span>
                    <span className="pl-3">
                      <span className="text-[#0d14e4]">Ratings</span>{" "}
                    </span>
                  </div>
                  <hr />

                  <div className="flex pt-3 my-2 mt-[-2px]">
                    <h5
                      className={`font-bold  text-[18px] text-[#333] font-Roboto `}
                    >
                      {presentPrice}
                      <span className="  font-medium"> ৳</span>
                    </h5>
                    {previousPrice && (
                      <div className=" flex  ">
                        <h5 className="pl-4 text-[12px] leading-[18px] text-[#565959] font-semibold ">
                          {" "}
                          Daily Price:{" "}
                        </h5>
                        <h4
                          className={`pl-3  text-[16px] leading-[18px] font-medium text-[#303030] line-through`}
                        >
                          {previousPrice ? previousPrice + " ৳" : null}
                        </h4>
                      </div>
                    )}
                  </div>
                  <hr />
                  <div className="pt-3  pb-2 flex items-center">
                    <h1 className="font-medium text-sm md:text-[17px]">
                      {color?.length > 0 ? "Color :" : ""}{" "}
                    </h1>
                    {color ? (
                      <div className="flex">
                        {color.map((color, index) => {
                          // Change 'i' to 'color' here
                          return (
                            <span
                              key={index}
                              className={`${
                                selectedColor.index === index
                                  ? " border-red-400 border-[2px]  rounded-sm"
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
                  <div>
                    {productMaterial && (
                      <div className="text-[17px] font-[500] text-gray-700">
                        Product material :{" "}
                        <span className="font-[600]">{productMaterial}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    {powerSupply && (
                      <div className="text-[17px] font-[500] text-gray-700 py-2">
                        Power supply :{" "}
                        <span className="font-[600]">{powerSupply}</span>
                      </div>
                    )}
                  </div>

                  <div className="pb-1">
                    {powerConsumed && (
                      <div className="text-[17px] font-[500] text-gray-700">
                        Power consumed :{" "}
                        <span className="font-[600]">{powerConsumed}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    {capacity && (
                      <div className="ttext-[17px] font-[500] text-gray-700 py-2">
                        Capacity :{" "}
                        <span className="font-[600]">{capacity}</span>
                      </div>
                    )}
                  </div>
                  <div className="py-2 flex items-center">
                    <h1 className="font-medium text-sm md:text-[17px]">
                      {size?.length > 0 ? "Size :" : ""}{" "}
                    </h1>
                    {size ? (
                      <h1 className="flex">
                        {size.map((size, index) => {
                          return (
                            <span
                              key={index}
                              className={`${
                                selectedSize.index === index
                                  ? " border-red-400 border-[2px]  rounded-sm"
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
                    <div onClick={handleClick}>
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
                      onClick={buyNowHandlar}
                    >
                      <span className="text-white flex items-center">
                        Buy Now
                        <AiOutlineShoppingCart className="ml-1" />
                      </span>
                    </div>
                    <div
                      className={`w-[150px] bg-[#00453e]  my-3  justify-center  cursor-pointer !mt-6 !rounded !h-10 flex items-center`}
                      onClick={addToCartHandler}
                    >
                      <span className="text-white flex items-center">
                        Add to cart <AiOutlineShoppingCart className="ml-1" />
                      </span>
                    </div>
                  </div>

                  {/* -----------------------------------shop name------ */}
                </div>
                {/* ------------------------------------------- shop adress part------------------------           */}
                <ProductSideInfo
                  seller={data?.sellerinfo}
                  warranty={warranty}
                />
              </div>
              {/* ----------------------------------- shop name---------------------- */}
            </div>
            {/* ------------------product details info-------------------- */}

            <br />
            <br />
          </div>
        ) : null}
        <ProductDescription
          data={data?.product}
          seller={data.sellerinfo}
          products={data?.sellerProducts}
        />
      </div>

      {/* small sceen product details page */}

      <div className="fixed bottom-0 left-0 w-full md:hidden bg-[#050320] h-[52px] mx-auto z-50 ">
        <div className="flex">
          <div className="grow rounded-tr-[30px] ">
            <div className="flex mx-auto justify-between ">
              <div className="flex w-[45%] items-center  justify-around">
                <button
                  type="button"
                  className="text-center px-3 py-4  flex flex-col justify-center items-center "
                >
                  <p className="pt-[-2px] text-[15px] text-white font-[500] ">
                    <Link href="">Profile</Link>
                  </p>
                </button>
                <button
                  type="button"
                  className="text-center px-3 py-4  flex flex-col justify-center items-center "
                >
                  <Link
                    href="/"
                    className="pt-[-2px] text-[15px] text-white font-[500]"
                  >
                    <Image
                      src="/apple_favicon.png"
                      alt="rajdhola logo"
                      width={25}
                      height={25}
                    />
                  </Link>
                </button>
              </div>

              <div className="flex w-[55%] bg-[#00453e] font-medium ">
                <h2
                  className="text-center  pt-4 text-white  w-[45%]   bg-[#00453e] cursor-pointer"
                  onClick={buyNowHandlar}
                >
                  Buy Now
                </h2>

                <h1
                  className="text-center h-full bg-[#22988a] w-[55%] pt-4 px-2  text-white  font-medium  cursor-pointer"
                  style={{
                    clipPath: "polygon(21% 0, 100% 0, 100% 100%, 0% 100%)",
                  }}
                  onClick={addToCartHandler}
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
