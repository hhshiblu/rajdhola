"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

import { useRouter } from "next/navigation";
import ButtonHeader from "../route/button/headerVerify";
import { toast } from "sonner";
import { CreateSeller } from "@/allActions/auth/auth";

function SellerHeader() {
  const router = useRouter();
  const identityref = useRef(null);
  const handelAction = async () => {
    try {
      const identity = identityref.current.value;
      const res = await CreateSeller(identity);
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
          `/create-seller/?identity=${identity}&${
            res.email ? res.email : res.number
          }=true&message=An OTP sent successfully`
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
    <div className="h-[60px] bg-white shadow-2xl flex items-center justify-between 600px:px-20 px-2 overflow-hidden">
      <div>
        <Link href="/">
          <Image
            src="/rajdhola_title_logo.svg"
            alt="rajdhola logo"
            width={120}
            height={100}
          />
        </Link>
      </div>

      <form className="md:block hidden" action={handelAction}>
        <div className="flex gap-1 items-center">
          <input
            ref={identityref}
            type="text"
            name="identity"
            autoComplete="name"
            placeholder="Enter phone number or email"
            className="appearance-none block w-full px-3 py-1 border-[2px] border-gray-600 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
          />

          <div className="">
            <ButtonHeader name="Verify" type="loading..." />
          </div>
        </div>
      </form>
    </div>
  );
}

export default SellerHeader;
