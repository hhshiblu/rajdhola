"use client";
import { createUser, verifyOtp } from "@/allActions/auth/auth";
import SubmitButton from "@/componants/route/button/submitButton";
import VerifyBubmitButton from "@/componants/route/button/verifyButton";
import { signIn } from "next-auth/react";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { toast } from "sonner";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
  return formattedTime;
};

function SignUpForm({ searchParams }) {
  const otpuserNaame = searchParams.name;
  const otpUserNumber = searchParams.phoneNumber;
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [name, setname] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);

  const [cooldown, setCooldown] = useState();
  const [showResend, setShowResend] = useState(false);

  // useEffect to initialize the timer on component mount
  useEffect(() => {
    const storedValue = secureLocalStorage.getItem("secure");
    if (storedValue) {
      startCooldown(parseInt(storedValue, 10));
    }
  }, []);

  const decreaseInterval = (value) => {
    if (value > 0) {
      setTimeout(() => {
        setCooldown(value - 1);
        secureLocalStorage.setItem("secure", value - 1);
        decreaseInterval(value - 1);
      }, 1000);
    } else {
      setShowResend(true);
    }
  };

  const startCooldown = (initialValue) => {
    setCooldown(initialValue);
    secureLocalStorage.setItem("secure", initialValue);

    decreaseInterval(initialValue);
  };

  const handleOtpChange = (e) => {
    let newValue = e.target.value;
    newValue = newValue.replace(/[^0-9]/g, "");
    setOtp(newValue);
  };

  const HandelSubmit = async () => {
    try {
      const res = await createUser(name, phoneNumber, password);

      if (res.error) {
        toast.error(res.error, {
          duration: 3000,
          cancel: {
            label: <ImCancelCircle />,
          },
        });
      }
      if (res.success == true) {
        startCooldown(parseInt(res.time, 10));
        secureLocalStorage.setItem("rajdhola.com", password);
        toast.success(res.message, {
          duration: 3000,
          cancel: {
            label: <ImCancelCircle />,
          },
        });
        router.push(
          `/signup-account?verify=verify&24354g%^%hvbjnk 354g%^%hvbjnknfe3%^%45678uijhg%^%fdrew2v34567v%^%8uionbhv%^%fdesw32456789%^%354g%^%hvbjnknfe3%^%45678uijhg%^%fdrew2v34567v%^%8uionbhv%^%fdesw32456789%^%nfe3%^%45678uijhg%^%fdrew2v34567v%^%8uionbhv%^%fdesw32456789%^%%&name=${name}&phoneNumber=${phoneNumber}`
        );
      }
    } catch (error) {
      toast.error(error, {
        duration: 2000,
        cancel: {
          label: <ImCancelCircle />,
        },
      });
    }
  };

  const handelOtp = async () => {
    const usePassword = secureLocalStorage.getItem("rajdhola.com");

    try {
      const res = await verifyOtp(
        otp,
        otpuserNaame,
        otpUserNumber,
        usePassword
      );
      if (res.error) {
        toast.error(res.error, {
          duration: 3000,
          cancel: {
            label: <ImCancelCircle />,
          },
        });
      }
      if (res.success == true) {
        toast.success(res.message, {
          duration: 3000,
          cancel: {
            label: <ImCancelCircle />,
          },
        });

        await signIn("credentials", {
          phoneNumber,
          password,
          callbackUrl: "/",
        });
      }
    } catch (error) {
      toast.error(error, {
        duration: 2000,
        cancel: {
          label: <ImCancelCircle />,
        },
      });
    }
  };

  const handleResendClick = () => {};
  return (
    <>
      <div
        className="mt-8  sm:mx-auto sm:w-full sm:max-w-md"
        style={{ zIndex: "inherit" }}
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-3" action={HandelSubmit}>
            <div onClick={() => startCooldown(180)}>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="rajdhola.."
                  value={name}
                  onChange={(e) => setname(e.target.value)}
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
                  type="tel"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  placeholder="01000000000"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <div className={`flex items-center w-full`}>
              <h4> Already have any account?</h4>
              <Link href="/login" className="text-blue-500 p-2">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
      {searchParams.verify == "verify" ? (
        <div
          style={{ zIndex: "inherit" }}
          className="fixed min-h-[350px] py-4 text-center top-[50%] left-[50%] sm:max-w-md translate-x-[-50%] translate-y-[-50%] mx-auto  text-gray-900 w-[90%]   bg-white  rounded-lg"
        >
          <form action={handelOtp}>
            <div className="pt-24">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={otp}
                onChange={handleOtpChange}
                maxLength="6"
                placeholder="Enter your otp"
                className="px-2 py-2 text-gray-500 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="py-3 pl-20">
              {cooldown ? (
                <p>Resend OTP in {formatTime(cooldown)}</p>
              ) : (
                showResend && (
                  <button
                    onClick={handleResendClick}
                    className="px-2 py-[2px] border text-black rounded-md focus:outline-none text-[14px]"
                  >
                    Resend OTP
                  </button>
                )
              )}
            </div>
            <div>
              <VerifyBubmitButton name="Verify code" type="loading..." />
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default SignUpForm;
