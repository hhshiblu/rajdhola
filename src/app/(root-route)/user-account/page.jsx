import { getUser } from "@/allActions/auth/auth";
import React from "react";

async function Page() {
  const user = await getUser();
  const Address = user.addresses[0];

  return (
    <div className="w-[100%]">
      <h2 className="text-[#195851] font-semibold pb-3">My Details</h2>
      <div className="  rounded-lg w-[100%] ">
        <div className="flex  flex-wrap justify-center items center gap-3">
          <div className="flex w-[100%] lg:w-[40%] flex-col bg-white hover:shadow-lg p-4 md:px-8 px-3 rounded-lg">
            <h2 className="text-semibold text-gray-800 py-2">
              {" "}
              Profile details
            </h2>
            <hr />
            <div className=" text-[13px] text-gray-600 ">
              <p className="py-1">{user?.name}</p>
              <p>{user.phoneNumber}</p>
              <p className="py-1">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-col w-[100%] lg:w-[40%] bg-white hover:shadow-lg p-4 px-3 md:px-8 rounded-lg">
            <h2 className="text-semibold text-gray-800 py-2"> My address</h2>
            <hr />

            <div className=" text-[14px] text-gray-500 ">
              <p className="pb-2 pt-1 text-black">
                {Address.addressType} shipping address{" "}
              </p>
              <p className="text-gray-700 text-[14px]">{Address.name}</p>
              <p className="text-gray-600 text-[14px]">{Address.number}</p>
              <p className="pt-1">
                {Address.area} - {Address.upazila}
              </p>
              <p className="py-[1px]">
                {Address.district} , {Address.division}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
