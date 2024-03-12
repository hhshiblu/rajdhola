"use client";
import ForgotHeader from "@/componants/layout/forgotHeader";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import ForgotButton from "@/componants/route/button/forgotVerify";
import {
  ChangePassword,
  getUserByPhoneNumber,
  verifyOtpForForgot,
} from "@/allActions/auth/auth";
import { useRouter } from "next/navigation";
import VerifyBubmitButton from "@/componants/route/button/verifyButton";

function Page({ searchParams }) {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const number = useRef();
  const passwords = useRef();
  const success = searchParams.success;
  const identity = searchParams.identity;

  const [visible, setVisible] = useState(false);

  const handleOtpChange = (e) => {
    let newValue = e.target.value;
    newValue = newValue.replace(/[^0-9]/g, "");
    setOtp(newValue);
  };

  const handelSubmit = async () => {
    const phoneNumber = number.current.value;
    try {
      const res = await getUserByPhoneNumber(phoneNumber);

      if (res.error) {
        toast.error(res.error, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
      if (res.success == true) {
        router.push(`?identity=${phoneNumber}&message=user found successfully`);
        toast.success(res.message, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
    } catch (error) {
      if (error) {
        toast.error(error, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
    }
  };
  const handelOtp = async () => {
    try {
      const res = await verifyOtpForForgot(otp, identity);
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
          `?identity=${identity}&success=true&message=otp verified successfully processed`
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
  const handelPassCange = async () => {
    try {
      const password = passwords.current.value;
      const res = await ChangePassword(password, identity);
      if (res.error) {
        toast.error(res.error, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
      if (res.success == true) {
        router.push(`/`);
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
      <ForgotHeader />
      <div className="flex justify-center items-center h-[80vh] ">
        <div className="bg-white  w-[98%] sm:w-[500px] rounded-md shadow-xl">
          {success ? (
            <div className="sm:mx-auto w-full ">
              <h2 className="text-[20px] px-3 py-4 leading-[24px] font-[600] font-Roboto ">
                Choose a new password
              </h2>
              <hr />
              <hr />
              <p className="text-[16px] font-[500] font-Roboto px-3 py-2">
                Create a new password that is at least 6 characters long. A
                strong password has a combination of letters, digits and
                punctuation marks.
              </p>
              <div>
                <div className="px-3 py-3 w-[98%] 600px:w-[80%]  relative ">
                  <input
                    ref={passwords}
                    type={!visible ? "text" : "password"}
                    name="password"
                    placeholder="Enter New Strong Password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-[8px] border border-gray-300 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-[#00453e] focus:border-[#00453e] sm:text-sm"
                  />
                  <h2
                    className="absolute top-[17px] font-[600] right-7 text-[#00453e] cursor-pointer"
                    onClick={() => setVisible(!visible)}
                  >
                    {visible ? "show" : "hide"}
                  </h2>
                </div>
              </div>
              <hr />
              <hr />
              <div className="flex gap-4 py-4 items-center justify-end px-4">
                <Link
                  href="/"
                  className="bg-gray-300 px-3 h-[35px] flex justify-center items-center rounded-md font-[600] text-gray-800"
                >
                  Skip
                </Link>
                <form action={handelPassCange}>
                  <ForgotButton name="Continue" type="Lo" />
                </form>
              </div>
            </div>
          ) : identity ? (
            <div className=" sm:mx-auto w-full px-4">
              <div>
                <h2 className="text-[#050505]  text-[20px] py-3 font-[700]">
                  Enter security code
                </h2>
                <hr />
                <hr />

                <h1 className="py-4 text-[15px] text-[#050505] font-[350] leading-[18px]">
                  Please check your mobile number for an email containing your
                  6-digit verification code.
                </h1>
              </div>
              <div className="block 600px:hidden pb-2">
                <h1 className="text-[14px] font-[500] leading-[18px]  pt-[2px]">
                  we send code to,
                </h1>
                <p className="text-[12px] leading-[14px]  pt-[2px]">
                  {searchParams.identity}
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
                      {searchParams.identity}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between items-center  py-3">
                  <Link
                    href="/create-seller"
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
            <div>
              {" "}
              <h2 className="text-[20px] px-8 py-4 leading-[24px] font-[600] font-Roboto ">
                Find Your Account
              </h2>
              <div className="border-b-[3px] "></div>
              <div>
                <h1 className="text-[17px] leading-[20px] px-8 py-4">
                  Please enter your mobile number to search for your account.
                </h1>
                <div className="px-8 py-4 pb-6">
                  {" "}
                  <input
                    ref={number}
                    type="number"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    placeholder="01*********"
                    required
                    className="appearance-none block w-full px-3 py-[10px] border border-[#00453e] shadow-inner rounded-md bg-[#98c6ea74] placeholder-gray-900 focus:outline-none focus:ring-blue-400 focus:border-blue-500 text-[15px]  md:text-[17px] font-normal"
                  />
                </div>
                <div className="border-b-[3px] "></div>
                <div className="flex gap-4 py-4 items-center justify-end px-4">
                  <Link
                    href="/login"
                    className="bg-gray-300 px-3 h-[33px] flex justify-center items-center rounded-md font-[600] text-gray-800"
                  >
                    Cancel
                  </Link>
                  <form action={handelSubmit}>
                    <ForgotButton name="Search" type="Searching ..." />
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
