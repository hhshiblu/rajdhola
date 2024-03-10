import { getUser } from "@/allActions/auth/auth";
import Footer from "@/componants/layout/footer";
import Header from "@/componants/layout/header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogOut from "@/components/logout.jsx/page";
import ProfileEdit from "@/componants/users/profileEdit";
async function layout({ children }) {
  const user = await getUser();
  return (
    <div>
      <Header />
      <div className="bg-[#EFF0F4] hidden md:block pb-4">
        <div className="flex  lg:gap-36 md:gap-20 md:px-20 pt-12 px-10">
          <div className="w-[250px]  h-[77vh] flex flex-col ">
            <div className=" text-gray-800  text-[12px] ">
              <p>
                <span>Hello, </span>
                <span id="lzd_current_logon_user_name"> {user.name}</span>
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
                  <Link
                    href="/user-account/all-orders"
                    className="hover:text-[#1A9CB7]"
                  >
                    All orders
                  </Link>

                  <li className=" hover:text-[#1A9CB7]">
                    <p>Return orders</p>
                  </li>
                </ul>
              </li>

              <Link
                href="/create-seller"
                className="text-[#195851] font-semibold"
              >
                Sell on Rajdhola
              </Link>

              <LogOut />
            </ul>
          </div>
          <div className=" w-[100%]">{children}</div>
        </div>
      </div>
      <div className=" md:hidden block">
        <div className="flex justify-between p-8">
          <div>
            {user?.image?.url ? (
              <Image
                src={user.image?.url}
                alt=""
                width={500}
                height={500}
                className="w-[80px] h-[80px] rounded-full"
              />
            ) : (
              <Image
                src="/avatar_icon.jpg"
                alt=""
                width={500}
                height={500}
                className="w-[110px] h-[110px] rounded-full"
              />
            )}

            <h2 className="text-[15px] pt-3">name : {user.name}</h2>
            <h2 className="text-[15px]">number : 0{user?.phoneNumber}</h2>
            <h2 className="text-[15px]">email : {user?.email}</h2>
          </div>
          <ProfileEdit />
        </div>
        <hr />
        <div className="py-4 flex scroll_x_hiiden overflow-x-auto gap-3 px-3">
          <Link
            href="/user-account/address-book"
            className="border-blue-900  px-1 py-[2px] bg-white rounded-md  shadow-md"
          >
            Address book
          </Link>
          <Link
            href="/user-account/all-orders"
            className="border-blue-900  px-1 py-[2px] bg-white rounded-md  shadow-md cursor-pointer"
          >
            All orders
          </Link>
          <Link
            href="#"
            className="border-blue-900  px-1 py-[2px] bg-white rounded-md  shadow-md"
          >
            {" "}
            Return Orders
          </Link>
        </div>
        <div className="py-4 bg-white px-[6px]">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default layout;
