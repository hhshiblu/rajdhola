"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillTwitterSquare,
  AiFillYoutube,
} from "react-icons/ai";

import Image from "next/image";
import Link from "next/link";
import { topCategory, footercompanyLinks } from "@/libs/data";
import { MdOutgoingMail } from "react-icons/md";

function Footer() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="bg-[#195851]  text-white pb-16 md:pb-0">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:px-8 px-4 pt-8 pb-6 md sm:text-center  items-center mx-auto">
        <ul className="px-5 text-center sm:text-start flex sm:block  flex-col items-center mx-auto">
          <Image
            src="/rajdhola_title_logo_white.svg"
            alt="rajdhola logo"
            className="w-[110px] h-[40px]  pb-4 md:pb-0"
            width={100}
            height={100}
          />
          <br />
          <p> </p>
          <div className="flex items-center ">
            <AiFillFacebook size={22} className="cursor-pointer" />
            <AiFillInstagram
              size={22}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillTwitterCircle
              size={22}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={22}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="justify-center sm:text-start  pl-8  md:pl-0 mx-auto">
          <h1 className="md-1 font-semibold text-[15px] "> Company </h1>
          {footercompanyLinks.map((link) => {
            return (
              <li key={link.name} className="pl-1  ">
                <Link
                  href={link.link}
                  className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6 text-[14px]"
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="justify-center sm:text-start  pl-8  md:pl-0 mx-auto">
          <h1 className="md-1 font-semibold text-[15px] "> Top Category </h1>
          {topCategory.map((cate) => {
            return (
              <li
                key={cate.name}
                className="pl-1  text-[12px] cursor-pointer hover:text-red-400"
                onClick={() =>
                  router.push(
                    "/products" + "?" + createQueryString("_c", cate.name)
                  )
                }
              >
                {cate.name}
              </li>
            );
          })}
        </ul>

        <ul className="text-center sm:text-start  pl-8  md:pl-0 mx-auto">
          <h1 className="md-1 font-semibold text-[15px] "> Support </h1>
          {/* {footercompanyLinks.map((link) => {
            return (
              <li key={link.name} className="pl-1  ">
                <Link
                  href={link.link}
                  className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6 text-[14px]"
                >
                  {link.name}
                </Link>
              </li>
            );
          })} */}
          <div className="flex gap-1">
            <MdOutgoingMail />
            <li className="text-[12px]">support.rajdhola.com</li>
          </div>
        </ul>
      </div>

      <div className="  flex items-center  justify-around md:pb-6 pb-3 flex-col sm:flex-row   gap-4 text-center  text-gray-400 text-sm ">
        <span>2024 Rajdhola team, all rights reserved</span>
        <span> Terms @ Privacy Policy</span>
      </div>
    </div>
  );
}

export default Footer;
