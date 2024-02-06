"use client";
import { activationSeller } from "@/allActions/auth/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Page({ params }) {
  const [error, setError] = useState(false);

  const handleActivation = () => {
    activationSeller(params.token)
      .then((res) => {
        if (res.success === true) {
          toast.success(res.message, {
            duration: 3000,
            cancel: {
              label: "cancel",
            },
          });
        }
        if (res.error) {
          setError(true);
          toast.error(res.error, {
            duration: 3000,
            cancel: {
              label: "cancel",
            },
          });
        }
      })
      .catch((err) => {
        if (err) {
          toast.error(err, {
            duration: 3000,
            cancel: {
              label: "cancel",
            },
          });
        }
        setError(true);
      });
  };

  useEffect(() => {
    handleActivation();
  });

  return (
    <div className="flex justify-center items-center bg-slate-200">
      <>
        {error ? (
          <div className="flex justify-center items-center h-[100vh]">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-[20px]">
                Oops! Looks like you arrived a bit late.
                <p className="text-[#DF2E38]">Your token has expired.</p>
              </h2>
              <h4 className="pt-6 text-[#1A5D1A] text-[18px]">
                Please go back and try again...
              </h4>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[100vh] justify-center items-center">
            <h2 className="text-[#17441100] font-Roboto font-semibold text-lg py-2">
              Congratulations 🎉!
            </h2>
            <h3 className="font-normal">
              Your account has been created. Activation will take 1-24 hours.
              Thanks for joining us! 🌟
            </h3>
            <p className="text-[#1A5D1A] text-[19px] text-center">
              Keep an eye on your email for confirmation and exciting updates!
            </p>
            <h5 className="text-[#1A5D1A] text-center text-sm pt-2">
              {" "}
              Click here to go home.
            </h5>
            <Link
              href="https://rajdhola.com"
              className="bg-[#2ABBA7] border rounded-md px-2 py-1 pt-4 text-white font-semibold"
            >
              Click me
            </Link>
          </div>
        )}
      </>
    </div>
  );
}

export default Page;
