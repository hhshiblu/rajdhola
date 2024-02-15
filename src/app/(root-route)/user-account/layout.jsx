import Footer from "@/componants/layout/footer";
import Header from "@/componants/layout/header";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function layout({ children }) {
  return (
    <div>
      <Header />
      <div className="bg-[#EFF0F4] hidden md:block pb-4">
        <div className="flex  lg:gap-36 md:gap-20 md:px-20 pt-12 px-10">
          <div className="w-[250px]  h-[77vh] flex flex-col ">
            <div className=" text-gray-800  text-[12px] ">
              <p>
                <span>Hello, </span>
                <span id="lzd_current_logon_user_name"> jjssaahasan40</span>
              </p>
            </div>
            <ul className="pt-4">
              <li className=" pb-4 ">
                <Link
                  href="/user-account"
                  className="text-[#195851] font-semibold"
                >
                  My Account
                </Link>
                <ul className="text-[14px] pl-3 py-1 text-gray-800 ">
                  <li className=" hover:text-[#1A9CB7]">
                    <Link href="/user-account/profile">Profile</Link>
                  </li>
                  <Link
                    href="/user-account/address-book"
                    className=" hover:text-[#1A9CB7]"
                  >
                    Address Book
                  </Link>
                </ul>
              </li>

              <li className=" pb-4 ">
                <h2 className="text-[#195851] font-semibold">My Orders</h2>
                <ul className="text-[14px] pl-3 py-1 text-gray-800 ">
                  <li className=" hover:text-[#1A9CB7]">
                    <p>All orders</p>
                  </li>
                  <li className=" hover:text-[#1A9CB7]">
                    <p>Return orders</p>
                  </li>
                </ul>
              </li>

              <li className="">
                <h2 className="text-[#195851] font-semibold">
                  Sell on Rajdhola
                </h2>
              </li>
            </ul>
          </div>
          <div className=" w-[100%]">{children}</div>
        </div>
      </div>
      <div className="p-8">
        <div>
          <Image
            src="/watch.jpg"
            alt=""
            width={500}
            height={500}
            className="w-[80px] h-[80px] rounded-full"
          />
          <h2 className="text-[13px]"> md Hasanul Haque Shiblu</h2>
          <h2 className="text-[13px]"> 01782572426</h2>
        </div>
        <div className="border-b-[2px] py-1"></div>
        <div className="py-4 flex  overflow-x-auto gap-3">
          <Link
            href="/user-account/address-book"
            className="border px-[2px] py-[1px] rounded-md  shadow-md"
          >
            Address book
          </Link>
          <Link
            href="/user-account/all-orders"
            className="border px-[2px] py-[1px] rounded-md  shadow-md"
          >
            All orders
          </Link>
          <Link
            href="#"
            className="border px-[2px] py-[1px] rounded-md shadow-md"
          >
            {" "}
            Return Orders
          </Link>
        </div>
        <div className="py-4">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default layout;
