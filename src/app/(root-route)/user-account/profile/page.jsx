import React from "react";
import Userinfo from "./userinfo";
import { getUser } from "@/allActions/auth/auth";

async function page() {
  const user = await getUser();
  return (
    <div className="">
      <h2 className="text-[#195851] font-semibold pb-3">My Details</h2>
      <div className=" bg-white hover:shadow-lg  gap-3">
        <Userinfo user={user} />
      </div>
    </div>
  );
}

export default page;
