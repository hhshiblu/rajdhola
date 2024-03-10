import React from "react";

function Userinfo({ user }) {
  return (
    <div>
      <div className="flex flex-wrap justify-around items center">
        <div className="flex   flex-col   p-4  px-3 rounded-lg">
          <h2 className="text-semibold text-gray-800 py-2 text-[14px]">
            {" "}
            name
          </h2>
          <hr />
          <div className=" text-[13px] text-gray-500 ">
            <p className="py-1">{user.name}</p>
          </div>
        </div>
        <div className="flex   flex-col bg-white  p-4 md:px-8 px-3 rounded-lg">
          <h2 className="text-semibold text-gray-800 py-2 text-[14px]">
            {" "}
            email
          </h2>
          <hr />
          <h2 className=" text-[13px] text-gray-500 ">{user?.email}</h2>
        </div>
        <div className="flex   flex-col bg-white  p-4 md:px-8 px-3 rounded-lg">
          <h2 className="text-semibold text-gray-800 py-2">Phone number</h2>
          <hr />
          <h2 className=" text-[13px] text-gray-500 ">{user.phoneNumber}</h2>
        </div>
      </div>
      <div className=" flex gap-4  pl-8 py-16">
        <button className="px-3 py-2 bg-[#195851]  rounded-md text-white font-medium">
          Update Profile
        </button>
        <h2 className="px-3 py-2 bg-[#195851]  rounded-md text-white font-medium">
          Change password
        </h2>
      </div>
    </div>
  );
}

export default Userinfo;
