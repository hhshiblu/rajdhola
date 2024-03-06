"use client";
import React, { useState } from "react";
import CreateSellerFrom from "../createSellerFrom";
import "@/componants/animate.css";
import Link from "next/link";
import SellerHeader from "@/componants/layout/sellerHeader";
import Footer from "@/componants/layout/footer";
import VerifyBubmitButton from "@/componants/route/button/verifyButton";
import { activationSeller } from "@/allActions/auth/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
function Page({ searchParams }) {
  const router = useRouter();
  const email = searchParams.email;
  const success = searchParams.success;
  const [otp, setOtp] = useState("");
  const handleOtpChange = (e) => {
    let newValue = e.target.value;
    newValue = newValue.replace(/[^0-9]/g, "");
    setOtp(newValue);
  };
  const handelOtp = async () => {
    try {
      const res = await activationSeller(email, otp);
      if (res.error) {
        toast.error(res.error, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
      if (res.success == true) {
        router.push(
          `/create-seller/account?email=${email}&success=true&message=Your request hasbeen successfully processed.`
        );
        toast.success(res.message, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
    } catch (error) {
      toast.error(error, {
        duration: 2000,
        cancel: {
          label: "cancel",
        },
      });
    }
  };
  return (
    <div>
      <SellerHeader />

      <div className=" min-h-[90vh] bg-gray-50 flex flex-col justify-center py-12">
        <div className="flex justify-center">
          {!searchParams.email && (
            <h2 className="pt-2 text-center text-2xl font-semibold text-gray-900">
              Register as a seller
            </h2>
          )}
        </div>
        {success ? (
          <div className="bg-white    shadow-lg sm:rounded-lg px-[16px] rounded-lg sm:mx-auto sm:w-[98%] sm:max-w-[550px]">
            <div className="border-[2px] border-white p-6 ">
              <h2 className=" font-Roboto font-semibold text-lg py-2">
                Congratulations 🎉!
              </h2>
              <h3 className="font-normal">
                Your account has been created. Activation will take 1-24 hours.
                Thanks for joining us! 🌟
              </h3>

              <h5 className="text-[#1A5D1A] text-center text-sm pb-4 pt-2">
                {" "}
                Click here to go home.
              </h5>
              <div className="flex justify-center items-center">
                <Link
                  href="/"
                  className="bg-[#00453e] hover:bg-[#0d5e56] border text-center rounded-md px-2 py-1  text-white font-semibold"
                >
                  Click me
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className=" w-[98%] md:w-[65%] mx-auto">
            {searchParams.email ? (
              <div
                style={{ zIndex: "inherit" }}
                className="bg-white    shadow-lg sm:rounded-lg px-[16px] rounded-lg sm:mx-auto sm:w-[98%] sm:max-w-[550px]"
              >
                <div>
                  <h2 className="text-[#050505]  text-[20px] py-3 font-[700]">
                    Enter verify code
                  </h2>
                  <hr />
                  <hr />

                  <h1 className="py-4  text-[15px] text-[#050505] font-[350]  leading-[18px] ">
                    Please check your Gmail for an email containing your 6-digit
                    verification code.
                  </h1>
                </div>
                <div className="block 600px:hidden pb-2">
                  <h1 className="text-[14px] font-[500] leading-[18px]  pt-[2px]">
                    we send code to,
                  </h1>
                  <p className="text-[12px] leading-[14px]  pt-[2px]">
                    {email}
                  </p>
                </div>
                <form action={handelOtp}>
                  <div className="flex gap-4 pb-6">
                    <div className="pt-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={otp}
                        onChange={handleOtpChange}
                        maxLength="6"
                        placeholder="Enter your otp"
                        className="px-2 py-2 text-gray-900 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="hidden 600px:block">
                      <h1 className="text-[14px]  font-[500] leading-[18px]  pt-[2px]">
                        we send code to,
                      </h1>

                      <p className="text-[12px] leading-[14px]  pt-[2px]">
                        {email}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center  py-3">
                    <Link
                      href="/create-seller/account"
                      className="text-[13px] text-[#00453e]  py-2 hover:underline  "
                    >
                      Didn&apos;t get a code?
                    </Link>
                    <div className="flex item-center gap-2">
                      <VerifyBubmitButton name="Continue" type="loading..." />
                    </div>
                  </div>
                </form>
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
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Page;
