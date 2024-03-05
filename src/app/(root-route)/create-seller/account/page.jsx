import React from "react";
import CreateSellerFrom from "../createSellerFrom";
import "@/componants/animate.css";
import Link from "next/link";
import SellerHeader from "@/componants/layout/sellerHeader";
import Footer from "@/componants/layout/footer";

function Page({ searchParams }) {
  return (
    <div>
      <SellerHeader />

      <div className=" min-h-screen bg-gray-50 flex flex-col justify-center py-12">
        <div className="flex justify-center">
          <h2 className="pt-2 text-center text-2xl font-semibold text-gray-900">
            Register as a seller
          </h2>
        </div>
        <div className="mt-8 w-[98%] md:w-[65%] mx-auto">
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
      <Footer />
    </div>
  );
}

export default Page;
