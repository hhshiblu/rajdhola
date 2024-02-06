"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { AiFillDashboard } from "react-icons/ai";
import { BiCategoryAlt, BiMenuAltLeft } from "react-icons/bi";
import Navbar from "./navbar";
import { ImCancelCircle } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";
import { BsArrowLeftShort } from "react-icons/bs";
import styles from "@/libs/styles";

const Search = ({ user, categories }) => {
  const path = usePathname();
  const router = useRouter();
  const [carts, setCarts] = useState([]);
  const [activemenu, setActiveMenu] = useState("nav_menu");
  const [activeMenu2, setactiveMenu2] = useState("nav_menu2");
  const [SubMenuDetails, setSubMenuDetails] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  // animate categories

  const ToggleMenu = () => {
    if (activemenu === "nav_menu") {
      setActiveMenu("nav_menu nav_phone");
    } else {
      setActiveMenu("nav_menu");
      setactiveMenu2("nav_menu2");
    }
  };

  const ToggleMenu2 = (item) => {
    setSubMenuDetails(item);
    if (activeMenu2 === "nav_menu2") {
      setactiveMenu2("nav_menu2 nav_phone2");
    } else {
      setactiveMenu2("nav_menu2");
    }
  };

  const handleMenuItemClick = (e, itemData) => {
    ToggleMenu2(itemData);
  };

  const subCateHandel = (i, id) => {
    const category = categories.filter((c) => c.id === id);

    const queryParams = new URLSearchParams({
      category: category[0].name,
      subCategory: i,
    });
    const url = `/products?${queryParams}`;
    router.push(url);
    // window.location.reload();
    ToggleMenu();
  };
  // --------------------------------------sticky navbar---------------

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    const fetchedCarts = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCarts(fetchedCarts);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handelSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      searchValue: searchValue,
    });
    const url = `/products?${queryParams}`;
    router.push(url);
  };

  return (
    <>
      <div className={` search  shadow-md font-300 sticky  `}>
        <div className={`navbar ${isSticky ? "sticky" : ""}`}>
          <div className="  h-[60px] min- min-w-fit bg-[#00453e]   md:grid grid-cols-4">
            <div className="hidden md:block text-white pl-20 my-auto h-[30px] cursor-pointer">
              <Link href="/">
                <Image
                  src="/rajdhola_title_logo_white.svg"
                  alt=""
                  className="h-full"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div className=" md:col-span-2 !m-auto w-[90%] py-[10px] relative">
              <form action="">
                <input
                  type="text"
                  placeholder="search any item.."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="h-[40px] w-full px-2 border-[2px] border-[#06229b] rounded-md f focus:border-spacing-1.5 "
                />

                <button
                  type="submit"
                  onClick={handelSubmit}
                  className="text-white bg-[#050320] absolute right-0 h-[40px] w-[100px] rounded-r-md font-[600]   "
                >
                  Search
                </button>
              </form>
            </div>
            <div className="hidden ml-auto pr-10   md:flex items-center">
              <div className="flex items-center">
                <div className="relative cursor-pointer mr-16">
                  <div className="text-white my-auto h-full">
                    <Link href={`${user && user ? "/user-account" : "/login"}`}>
                      {user ? (
                        <div className="flex ">
                          <h1 className=" text-semibold text-[16px]  pl-4">
                            {user.name.slice(0, 7) + "..."}
                          </h1>
                        </div>
                      ) : (
                        <>
                          <p className="text-xs">Hello , </p>
                          <h1 className="text-semibold text-sm pl-4">
                            Sign in
                          </h1>
                        </>
                      )}
                    </Link>
                  </div>
                </div>
              </div>

              <div className={`flex item-center mx-1`}>
                <div className="relative cursor-pointer mr-[15px] text-white">
                  <Link href="/cart-products">
                    <FiShoppingCart size={30} className="text-white" />
                    <h1 className="absolute right-[-6px] top-[-5px] rounded-full bg-[#eb2828] w-5 h-5 top right p-0 m-0 text-white font-mono text-[14px] font-[50] loading-tight text-center">
                      {carts.length}
                    </h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden  bg-[#195851] h-[39px] md:flex items-center ">
            <div
              className="pl-10 my-auto  relative  text-white text-sm md:text-base duration-300 cursor-pointer catagoris"
              onClick={ToggleMenu}
            >
              <BiMenuAltLeft size={25} className="absolute left-2" />
              <h3 className="  font-[600]"> All Catagogies </h3>
            </div>
            <div className={`hidden  md:block  my-auto ml-12`}>
              <Navbar />
            </div>
            <div className="my-auto">
              <Link
                href={`https://rajdhola.com`}
                className="mr-8  text-[#ffffff] font-semibold hover:border-[1px] px-[8px] pt-[9px] pb-[9px]  rounded-md "
              >
                {" "}
                Become Seller
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* show category animation i will try allah borosha */}

      <div
        className={
          activemenu === "nav_menu nav_phone"
            ? "fixed top-0 left-0 w-full h-screen bg-[#00000082]  z-[20000] "
            : null
        }
      >
        <ImCancelCircle
          className={
            activemenu === "nav_menu nav_phone"
              ? "fixed top-3 left-[310px]  z-[20000]  border-[3px] border-black cursor-pointer rounded-[100%] text-white"
              : "hidden"
          }
          size={30}
          onClick={ToggleMenu}
        />
        <div className={activemenu}>
          <div className=" text-left border-b-2 bg-[#00453e] border-b-[#003c36]  py-2 pl-8 flex items-center">
            <h1 className="font-semibold pr-2 text-[15px] text-white">
              Hello ,{" "}
            </h1>
            {user ? (
              <div className="flex ">
                <h1 className=" font-semibold text-lg text-white mt-1">
                  {user.name}
                </h1>
              </div>
            ) : (
              <h1 className="text-semibold text-sm pl-2">Sign in</h1>
            )}
          </div>
          <div className="bg-[#195851] text-white text-sm py-[2px] m-auto">
            <h2>Best wishes for you</h2>
          </div>
          <div className="pt-3">
            {categories?.map((i, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.normalFlex}  justify-between px-4 hover:bg-[#EAEDED] mx-2 text-[16px]  rounded-md cursor-pointer  leading-[26px] forHover `}
                  onClick={(e) => handleMenuItemClick(e, i)} // Pass the 'i' data as an argument
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

          <div className={activeMenu2}>
            <div
              className="text-left border-b-2 border-black py-2 pl-6 flex  text-lg font-semibold"
              onClick={ToggleMenu2}
            >
              <BsArrowLeftShort size={30} className="cursor-pointer" />
              <h1 className="pl-4 cursor-pointer"> Main Categories</h1>
            </div>
            <div className="pt-3 pb-1">
              <h1 className="text-left pl-8 font-semibold text-lg text-gray-900 mx-2 ">
                {SubMenuDetails.name}
              </h1>
            </div>

            <hr />
            <hr />

            <div className="pt-1">
              {SubMenuDetails?.children?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="hover:bg-gray-300 mx-2 text-gray-700 hover:text-gray-950  rounded-md leading-[24px] py-[6px]  "
                    onClick={() => subCateHandel(item.name, item.parentId)}
                  >
                    <h2 className="text-left pl-7 cursor-pointer text-[16px] ">
                      {item.name}
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {!path.includes("/product/") && (
        <div className="fixed bottom-0 left-0 w-full md:hidden bg-[#00453e] h-[50px] mx-auto z-50">
          <div className="flex">
            <div className="grow rounded-tr-[30px] ">
              <div className="flex justify-around">
                <button
                  type="button"
                  className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-5px]"
                  onClick={ToggleMenu}
                >
                  <BiCategoryAlt className="text-white " size={18} />
                  <p className="mt-[1px] text-xs text-white font-[700] ">
                    Category
                  </p>
                </button>
                <Link href={`/`}>
                  <button
                    type="button"
                    className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-5px]"
                  >
                    <CgProfile className="text-white " size={18} />
                    <p className="mt-[1px] text-xs text-white font-[700] ">
                      Account
                    </p>
                  </button>
                </Link>
                <button
                  type="button"
                  className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-10px]"
                >
                  <Link href="/" className=" cursor-pointer">
                    <Image
                      src="/rd_icon_white.svg"
                      alt=""
                      className="h-[32px] "
                      width={30}
                      height={40}
                    />
                  </Link>
                </button>
                <Link href={`/`}>
                  <button
                    type="button"
                    className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-5px]"
                  >
                    <AiFillDashboard className="text-white " size={18} />
                    <p className="mt-[1px] text-xs text-white font-[700] ">
                      Shop
                    </p>
                  </button>
                </Link>
                <button
                  type="button"
                  className="text-center px-3 py-4  flex flex-col justify-center items-center mt-[-5px] "
                >
                  <Link href="/cart-products" className="relative">
                    <FiShoppingCart
                      className="text-white  relative"
                      size={18}
                    />
                    <span className=" absolute  right-[-7px] top-[-4px] rounded-full bg-[#eb2828] w-5 h-5 top right p-0 m-0 text-white font-mono text-[13px] loading-tight text-center">
                      {carts.length}
                    </span>
                    <p className="mt-[1px] text-xs text-white font-[700] ">
                      Cart
                    </p>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
