"use client";

import SubmitButton from "@/componants/route/button/submitButton";
import React, { useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CreateSeller } from "@/allActions/auth/auth";
function SellerForm() {
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
    <div className="py-8">
      <form className="space-y-3" action={handelAction}>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 pb-2"
          >
            Phone number or Email
          </label>
          <div className="mt-1">
            <input
              ref={identityref}
              type="text"
              name="identity"
              autoComplete="name"
              placeholder="Enter phone number or email"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="pt-4">
          <SubmitButton name="Create Account" type="loading..." />
        </div>
      </form>
    </div>
  );
}

export default SellerForm;
