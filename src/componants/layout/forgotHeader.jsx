"use client";
import React, { useRef } from "react";

import Image from "next/image";
import SubmitButton from "../route/button/submitButton";
import ForgotButton from "../route/button/forgotVerify";
import Link from "next/link";
import { signIn } from "next-auth/react";
function ForgotHeader() {
  const number = useRef();
  const passwords = useRef();

  const HandelSubmit = async () => {
    try {
      const phoneNumber = number.current.value;
      const password = passwords.current.value;
      await signIn("credentials", {
        phoneNumber,
        password,
        callbackUrl: "/",
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="h-[60px] bg-white shadow-2xl w-[100vw] overflow-hidden flex justify-between items-center px-8">
      <Link href="/">
        <Image
          src="/rajdhola_title_logo.svg"
          alt=""
          className="h-full"
          width={120}
          height={100}
        />
      </Link>
      <div className="hidden md:items-center gap-2 md:flex">
        <input
          ref={number}
          type="number"
          name="phoneNumber"
          autoComplete="phoneNumber"
          placeholder="01*********"
          required
          className="appearance-none block w-full px-3 py-[6px] border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
        />
        <input
          ref={passwords}
          name="password"
          autoComplete="curent-password"
          placeholder="**********"
          required
          className="appearance-none block w-full px-3 py-[6px] border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
        />
        <form action={HandelSubmit}>
          <ForgotButton name="Login" type="loading..." />
        </form>
      </div>
      <Link
        href="/login"
        className="bg-[#00453e] hover:bg-[#0d5e56] px-3 h-[35px] flex justify-center items-center rounded-md font-[600] text-white md:hidden"
      >
        Login
      </Link>
    </div>
  );
}

export default ForgotHeader;
