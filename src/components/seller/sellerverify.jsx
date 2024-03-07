"use client";
import VerifyBubmitButton from "@/componants/route/button/verifyButton";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { activationSeller, sellerCreateWithInfo } from "@/allActions/auth/auth";

function Sellerverify({ searchParams }) {
  const router = useRouter();
  const success = searchParams.success;
  const sellerCreated = searchParams.sellerCreated;
  const userIdentity = searchParams.identity;
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState({
    category: "",
    password: "",
    cpassword: "",
  });
  const [visible, setVisible] = useState(false);

  const handleShowPasswordChange = () => {
    setVisible(!visible);
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleOtpChange = (e) => {
    let newValue = e.target.value;
    newValue = newValue.replace(/[^0-9]/g, "");
    setOtp(newValue);
  };
  const handelOtp = async () => {
    try {
      const res = await activationSeller(userIdentity, otp);
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
          `/create-seller/?identity=${userIdentity}&success=true&message=Your request hasbeen successfully processed`
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
  const uploadInfo = async () => {
    try {
      const res = await sellerCreateWithInfo(
        userIdentity,
        user.category,
        user.password,
        user.cpassword
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
        router.push(
          `/create-seller/?identity=${userIdentity}&sellerCreated= Shop created successfully for user ${userIdentity}`
        );
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
  return (
    <div>
      {sellerCreated ? (
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
              <Link href="/">
                <VerifyBubmitButton name="Continue" type="loading..." />
              </Link>
            </div>
          </div>
        </div>
      ) : success ? (
        <div className="bg-white    shadow-lg sm:rounded-lg  rounded-lg sm:mx-auto mx-auto p-8">
          <h1 className="md:text-xl font-[500] text-center text-[18px] pb-2">
            create Account
          </h1>
          <form action={uploadInfo}>
            <div className="w-full  py-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Which category product you sell
              </label>
              <div className="mt-1">
                <input
                  type="category"
                  name="category"
                  required
                  placeholder="Enter category name"
                  value={user.category}
                  onChange={handelChange}
                  className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 ">
              <div className="w-[100%]  md:w-[48%] mx-auto ">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={user.password}
                    onChange={handelChange}
                    placeholder="Enter Password"
                    className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="w-[98%]  md:w-[48%] mx-auto ">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="cpassword"
                    autoComplete="current-password"
                    required
                    value={user.cpassword}
                    onChange={handelChange}
                    placeholder="Enter confirm password"
                    className="appearance-none block w-full px-3 py-[6px] border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="checkbox"
                checked={visible}
                onChange={handleShowPasswordChange}
                className="cursor-pointer"
              />
              <p className="text-[13px]">show password</p>
            </div>
            <div className="flex item-center gap-2">
              <VerifyBubmitButton name="Continue" type="loading..." />
            </div>
          </form>
        </div>
      ) : (
        userIdentity &&
        !success && (
          <div className=" w-[98%] p-2 ">
            <div className="bg-white    shadow-lg sm:rounded-lg px-[16px] rounded-lg sm:mx-auto sm:w-[98%] sm:max-w-[550px]">
              <div>
                <h2 className="text-[#050505]  text-[20px] py-3 font-[700]">
                  Enter verify code
                </h2>
                <hr />
                <hr />

                <h1 className="py-4 text-[15px] text-[#050505] font-[350] leading-[18px]">
                  Please check your {searchParams.email || searchParams.number}
                  for an email containing your 6-digit verification code.
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
          </div>
        )
      )}
    </div>
  );
}

export default Sellerverify;
