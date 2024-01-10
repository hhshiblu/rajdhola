"use client";
import React from "react";
import { useFormStatus } from "react-dom";
function VerifyBubmitButton({ name, type }) {
  const { pending } = useFormStatus();
  return (
    <div>
      <button
        type="submit"
        aria-disabled={pending}
        className={`group mx-auto relative mt-4 w-[50%] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white shadow-sm ${
          pending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-800"
        }`}
      >
        {pending ? type : name}
      </button>
    </div>
  );
}

export default VerifyBubmitButton;
