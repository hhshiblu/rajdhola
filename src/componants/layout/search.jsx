"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

import Image from "next/image";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Search = ({ user, children }) => {
  const { cart } = useSelector((state) => state.cart);
  const router = useRouter();

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
      <div className={` search  shadow-md font-300 sticky  pt-0 md:pt-1`}>
        <div className={`navbar ${isSticky ? "sticky" : ""}`}>
          <div className="  h-[60px] min- min-w-fit bg-[#00453e]   md:grid grid-cols-4">
            <div className="hidden md:block text-white pl-20 my-auto h-[30px] cursor-pointer">
              <Link href="/">
                <Image
                  src="/logo/logo_title.svg"
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
                    <Link
                      href={`${user && user ? "/account/profile" : "/login"}`}
                    >
                      <p className="text-xs">Hello , </p>
                      {user ? (
                        <div className="flex ">
                          <h1 className=" text-semibold text-[16px]  pl-4">
                            {user.name}
                          </h1>
                        </div>
                      ) : (
                        <h1 className="text-semibold text-sm pl-4">Sign in</h1>
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
                      {cart.length}
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
