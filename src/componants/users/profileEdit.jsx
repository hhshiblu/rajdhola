"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

function ProfileEdit() {
  const [profile, setShowProfile] = useState(false);
  return (
    <>
      <div className="relative">
        {" "}
        <h2
          className="cursor-pointer font-bold text-2xl"
          onClick={() => setShowProfile(!profile)}
        >
          ...
        </h2>
        <div
          className=" overflow-hidden  absolute top-5 right-0  shadow-lg rounded-md h-[14vh] w-[160px] flex flex-col px-4   duration-200 z-10"
          style={{ height: profile ? "14vh" : "0px" }}
        >
          <div className="flex gap-2 pt-4 items-center">
            <RxAvatar size={21} />
            <h2 className="font-semibold cursor-pointer "> Profile</h2>
          </div>
          <div className="flex items-center gap-2 pt-2 pl-1">
            <MdOutlineLogout />
            <h2
              className=" font-semibold cursor-pointer "
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              LogOut
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileEdit;
