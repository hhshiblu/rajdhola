"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

import { BsArrowLeftShort } from "react-icons/bs";

import Image from "next/image";

import { useRouter } from "next/navigation";

const Search = ({ children }) => {
  const router = useRouter();

  const [isAuthenticated, se] = useState(false);
  const user = "hekki";
  const isSeller = true;

  const [isSticky, setIsSticky] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  // --------------------------------------sticky navbar---------------

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
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
      <div
        className={` search  shadow-md font-300 sticky  text-black pt-0 md:pt-1`}
      >
        <div className={`navbar ${isSticky ? "sticky" : ""}`}>
          <div className="  h-[60px] min- min-w-fit bg-[#00453e]   md:grid grid-cols-4">
            <div className="hidden md:block text-white m-auto h-[30px] cursor-pointer">
              <Link href="/">
                <Image
                  src="/vercel.svg"
                  alt=""
                  className="h-full"
                  width={30}
                  height={40}
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
            <div className="hidden m-auto  md:flex items-center">
              <div className="flex items-center">
                <div className="relative cursor-pointer mr-[20px]">
                  <Link
                    href={`${isAuthenticated ? "/account/profile" : "/login"}`}
                  >
                    {isAuthenticated ? (
                      <div className=" bg-[#ffffff] !m-auto rounded-full h-[35px] w-[35px] flex items-center justify-center">
                        <h1 className=" text-center text-black mt-[-3px] text-[20px]   font-[600] "></h1>
                      </div>
                    ) : (
                      <CgProfile size={30} color="#fff" />
                    )}
                  </Link>
                </div>
              </div>

              <div className={`flex item-center mx-1`}>
                <div className="relative cursor-pointer mr-[15px] text-white">
                  <Link href="/cart-products">
                    <FiShoppingCart size={30} className="text-white" />
                    <h1 className="absolute right-[-6px] top-[-5px] rounded-full bg-[#eb2828] w-5 h-5 top right p-0 m-0 text-white font-mono text-[14px] font-[50] loading-tight text-center">
                      {/* {cart.length} */}
                    </h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Search;
