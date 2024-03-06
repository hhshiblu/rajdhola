"use client";
import { createUser, verifyOtp } from "@/allActions/auth/auth";
import SubmitButton from "@/componants/route/button/submitButton";
import VerifyBubmitButton from "@/componants/route/button/verifyButton";
import { signIn } from "next-auth/react";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";

function SignUpForm({ searchParams }) {
  const otpuserNaame = searchParams.name;
  const otpUserNumber = searchParams.phoneNumber;
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const nameref = useRef();
  const passref = useRef();
  const numberref = useRef();
  const [showPassword1, setShowPassword1] = useState(false);

  const handleOtpChange = (e) => {
    let newValue = e.target.value;
    newValue = newValue.replace(/[^0-9]/g, "");
    setOtp(newValue);
  };

  const HandelSubmit = async () => {
    const name = nameref.current.value;
    const password = passref.current.value;
    const phoneNumber = numberref.current.value;
    try {
      const res = await createUser(name, phoneNumber, password);

      if (res.error) {
        toast.error(res.error, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
      if (res.success == true) {
        secureLocalStorage.setItem("sp", { password });

        toast.success(res.message, {
          duration: 3000,
          cancel: {
            label: "Cancel",
          },
        });
        router.push(
          `/signup-account?verify=verify&24354g%^%hvbjnk 354g%^%hvbjnknfe3%^%45678uijhg%^%fdrew2v34567v%^%8uionbhv%^%fdesw32456789%^%354g%^%hvbjnknfe3%^%45678uijhg%^%fdrew2v34567v%^%8uionbhv%^%fdesw32456789%^%nfe3%^%45678uijhg%^%fdrew2v34567v%^%8uionbhv%^%fdesw32456789%^%%&name=${name}&phoneNumber=${phoneNumber}`
        );
      }
    } catch (error) {
      toast.error(error.message || "An error occurred", {
        duration: 2000,
        cancel: {
          label: "Cancel",
        },
      });
    }
  };

  const handelOtp = async () => {
    const usePassword = secureLocalStorage.getItem("sp");

    try {
      const res = await verifyOtp(
        otp,
        otpuserNaame,
        otpUserNumber,
        usePassword.password
      );
      if (res.error) {
        toast.error(res.error, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });
      }
      if (res.success == true) {
        toast.success(res.message, {
          duration: 3000,
          cancel: {
            label: "cancel",
          },
        });

        await signIn("credentials", {
          phoneNumber: otpUserNumber,
          password: usePassword.password,
          callbackUrl: "/",
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
    <>
      <div
        className="mt-8  sm:mx-auto sm:w-full sm:max-w-md"
        style={{ zIndex: "inherit" }}
      >
        {searchParams.verify == "verify" ? (
          <div
            style={{ zIndex: "inherit" }}
            className="bg-white    shadow-lg sm:rounded-lg px-[16px] rounded-lg"
          >
            <div>
              <h2 className="text-[#050505]  text-[20px] py-3 font-[700]">
                Enter verify code
              </h2>
              <hr />
              <hr />

              <h1 className="py-4  text-[15px] text-[#050505] font-[350]  leading-[18px] ">
                Please check your number for a message with your code. Your code
                is 6 numbers long.
              </h1>
            </div>
            <div className="block 600px:hidden pb-2">
              <h1 className="text-[14px] font-[500] leading-[18px]  pt-[2px]">
                we send code to,
              </h1>
              <p className="text-[12px] leading-[14px]  pt-[2px]">
                {otpUserNumber}
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
                    {otpUserNumber}
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex justify-between items-center  py-3">
                <Link
                  href="/signup-account"
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
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-3" action={HandelSubmit}>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    ref={nameref}
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="rajdhola.."
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    ref={numberref}
                    type="tel"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    placeholder="01000000000"
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
                    ref={passref}
                    type={showPassword1 ? "text" : "password"}
                    name="password"
                    autoComplete="curent-password"
                    placeholder="*****"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
                  />
                  {showPassword1 || searchParams == "verify" ? (
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
                <SubmitButton name="Signup" type="loading..." />
              </div>
              <div className={`flex items-center w-full text-sm`}>
                <h4> Already have any account?</h4>
                <Link
                  href="/login"
                  className="text-[#00453e] hover:underline p-2"
                >
                  Log in
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default SignUpForm;
