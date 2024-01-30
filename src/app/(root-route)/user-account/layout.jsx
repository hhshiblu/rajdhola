import Header from "@/componants/layout/header";
import Link from "next/link";
import React from "react";

function layout({ children }) {
  return (
    <div>
      <Header />
      <div className="bg-[#EFF0F4] h-full">
        <div className="flex  lg:gap-36 md:gap-20 md:px-20 pt-12 px-10">
          <div className="w-[250px]  h-screen flex flex-col ">
            <div className=" text-gray-800  text-[12px] ">
              <p>
                <span>Hello, </span>
                <span id="lzd_current_logon_user_name"> jjssaahasan40</span>
              </p>
            </div>
            <ul className="pt-4">
              <li className=" pb-4 ">
                <Link href="" className="text-[#195851] font-semibold">
                  My Account
                </Link>
                <ul className="text-[14px] pl-3 py-1 text-gray-800 ">
                  <li className=" hover:text-[#1A9CB7]">
                    <Link href="/user-account/profile">Profile</Link>
                  </li>
                  <li className=" hover:text-[#1A9CB7]">
                    <p> Address Book</p>
                  </li>
                </ul>
              </li>

              <li className=" pb-4 ">
                <h2 className="text-[#195851] font-semibold">My Orders</h2>
                <ul className="text-[14px] pl-3 py-1 text-gray-800 ">
                  <li className=" hover:text-[#1A9CB7]">
                    <p> All orders </p>
                  </li>
                  <li className=" hover:text-[#1A9CB7]">
                    <p> Return orders</p>
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
          <div className="  w-[100%]">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default layout;
