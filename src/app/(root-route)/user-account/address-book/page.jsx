import { getUser } from "@/allActions/auth/auth";
import AddressBook from "@/componants/users/addressbook";
import React from "react";

async function page({ searchParams }) {
  const user = await getUser();

  return (
    <div className="">
      <h2 className="text-[#195851] font-semibold pb-3">My address</h2>
      <div className=" ">
        <AddressBook user={user} searchParams={searchParams} />
      </div>
    </div>
  );
}

export default page;
