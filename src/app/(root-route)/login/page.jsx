"use client";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "@/componants/animate.css";
import Link from "next/link.js";
import { signIn } from "next-auth/react";
import SubmitButton from "@/componants/route/button/submitButton";

function Page({ searchParams }) {
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const HandelSubmit = async () => {
    try {
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
    <div>
      <div className="loginbackground box-background--white padding-top--64">
        <div
          className="loginbackground-gridContainer "
          style={{
            backgroundImage:
              "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
            display: "-ms-grid",
            display: "grid",
            msGridColumns:
              "[start] 1fr [left-gutter] (86.6px)[16] [left-gutter] 1fr [end]",
            gridTemplateColumns:
              "[start] 1fr [left-gutter] repeat(16,86.6px) [left-gutter] 1fr [end]",
            msGridRows:
              "[top] 1fr [top-gutter] (64px)[8] [bottom-gutter] 1fr [bottom]",
            gridTemplateRows:
              "[top] 1fr [top-gutter] repeat(8,64px) [bottom-gutter] 1fr [bottom]",
            justifyContent: "center",
            margin: "0 -2%",
            transform: "rotate(-12deg) skew(-12deg)",
          }}
        >
          <div
            className="box-root flex-flex"
            style={{ gridArea: "top / start / 8 / end" }}
          >
            <div
              className="box-root"
              style={{
                backgroundImage:
                  "linear-gradient(white 0%, rgb(247, 250, 252) 33%)",
                flexGrow: 1,
              }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "4 / 2 / auto / 5" }}
          >
            <div
              className="box-root box-divider--light-all-2 animationLeftRight tans3s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "6 / start / auto / 2" }}
          >
            <div
              className="box-root box-background--gray100 animationLeftRight"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "2 / start / auto / 4" }}
          >
            <div
              className="box-root box-background--blue800 animationLeftRight "
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "7/ start / auto / 4" }}
          >
            <div
              className="box-root box-background--blue animationLeftRight"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "8 / 4 / auto / 6" }}
          >
            <div
              className="box-root box-background--gray100 animationLeftRight tans3s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "9 / 13 / auto / 20" }}
          >
            <div
              className="box-root box-background--blue800 animationLeftRight tans3s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "2/ 15 / auto / end" }}
          >
            <div
              className="box-root box-background--cyan200 animationRightLeft tans4s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>

          <div
            className="box-root flex-flex"
            style={{ gridArea: "4/ 17 / auto / 20" }}
          >
            <div
              className="box-root box-background--gray100 animationRightLeft tans4s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "5 / 14 / auto / 17" }}
          >
            <div
              className="box-root box-divider--light-all-2 animationRightLeft tans3s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8 z-50">
        <div
          className=" sm:mx-auto sm:w-full sm:max-w-md "
          style={{ zIndex: "inherit" }}
        >
          <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
            Login on your account
          </h2>
        </div>

        <div
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
          style={{ zIndex: "inherit" }}
        >
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-3" action={HandelSubmit}>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    placeholder="+880 000000"
                    required
                    value={phoneNumber}
                    onChange={(e) => setphoneNumber(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword1 ? "text" : "password"}
                    name="password"
                    autoComplete="curent-password"
                    placeholder="*****"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
                  />
                  {showPassword1 ? (
                    <AiOutlineEye
                      className=" absolute right-3 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setShowPassword1(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className=" absolute right-3 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setShowPassword1(true)}
                    />
                  )}
                </div>
              </div>

              <div>
                <SubmitButton name="Login" type="loading..." />
              </div>
              <div className={`flex items-center w-full`}>
                <h4> Not have any account?</h4>
                <Link href="/signup-account" className="text-blue-500 p-2">
                  {" "}
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div
          className="flex justify-center text-center font-semibold pt-8 text-gray-600 gap-4 w-full mx-auto text-[14px]"
          style={{ zIndex: "inherit" }}
        >
          <span>
            <Link href="#">© Rajdhola</Link>
          </span>
          <span>
            <Link href="#">Contact</Link>
          </span>
          <span>
            <Link href="#">Privacy & terms</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Page;
