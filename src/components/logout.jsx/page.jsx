"use client";
import React from "react";
import { signOut } from "next-auth/react";
function LogOut() {
  return (
    <h2
      className="text-[#195851] font-[400] cursor-pointer"
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      Log out
    </h2>
  );
}

export default LogOut;
