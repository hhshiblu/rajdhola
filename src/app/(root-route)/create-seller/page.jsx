"use client";
import { React, useState } from "react";
import "@/componants/animate.css";

import CreateSellerFrom from "./createSellerFrom";
import Link from "next/link";
import Image from "next/image";

const ShopCreate = ({ searchParams }) => {
  return (
    <>
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
              className="box-root  box-background--gray100 animationLeftRight "
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
              className="box-root  box-background--cyan200 animationLeftRight tans3s"
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
            className="box-root flex-flex "
            style={{ gridArea: "4/ 17 / auto / 20" }}
          >
            <div
              className="box-root  box-background--cyan200 animationRightLeft tans4s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
          <div
            className="box-root flex-flex"
            style={{ gridArea: "5 / 14 / auto / 17" }}
          >
            <div
              className="box-root box-background--blue800 animationRightLeft tans3s"
              style={{ flexGrow: 1 }}
            ></div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div
          style={{ zIndex: "1" }}
          className=" sm:mx-auto sm:w-full sm:max-w-md pl-32 pb-1"
        >
          <Image
            src={"/rajdhola_white_logo.svg"}
            alt="rajdhola_logo"
            className="text-center flex justify-center items-center w-[170px]"
            width={100}
            height={100}
          />
        </div>

        <div
          className="sm:mx-auto sm:w-full sm:max-w-md"
          style={{ zIndex: "1" }}
        >
          <hr />
          <hr />
          <div className="w-full border border-dashed  bg-[#e29584]"></div>
          <h2 className="pt-2 text-center text-2xl font-semibold text-gray-900">
            Register as a seller
          </h2>
        </div>
        <div
          className="mt-8 sm:mx-auto sm:w-full  sm:max-w-[40rem] px-4"
          style={{ zIndex: "1" }}
        >
          {searchParams.success ? (
            <div className="bg-white py-8 px-4  sm:rounded-lg sm:px-10 shadow-2xl border border-green-500">
              <p className="text-green-900 text-[17px] font-semibold">
                Welcome to Rajdhola ,{" "}
              </p>
              <h1 className="text-gray-500">
                Please check your email{" "}
                <span className="text-[#e16161] font-Roboto font-semibold ">
                  {searchParams.email ? `${searchParams.email}` : ""}
                </span>{" "}
                <br />
                and activate your account to immerse yourself in a myriad of
                exciting experiences awaiting you
              </h1>
              <div className="pt-2 text-center font-semibold cursor-pointer text-[#00453e] ">
                <Link href="/">Go home</Link>
              </div>
            </div>
          ) : (
            <div className="bg-white py-8 px-4  sm:rounded-lg sm:px-10 shadow-2xl">
              <CreateSellerFrom />
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
          )}
        </div>
      </div>
    </>
  );
};

export default ShopCreate;
