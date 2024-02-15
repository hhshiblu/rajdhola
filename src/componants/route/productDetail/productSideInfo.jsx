import React from "react";
import { IoLocation } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
function ProductSideInfo({ seller }) {
  return (
    <div className="hidden lg:block lg:w-[24%] border float-left  shadow-md px-4">
      <div className="flex justify-between pt-8  text-base ">
        <div className="text-gray-400">
          <p> Shop Information</p>
        </div>

        <IoLocation size={20} className="text-gray-400 " />
      </div>

      <div className="block py-4 text-[15px] text-gray-700 ">
        <h1 className="text-[#007185]"> {seller?.shopName} </h1>
        {/* <h1 className="">{data?.seller?.address}</h1> */}
      </div>
      <hr />

      <div className="flex justify-between pt-8  text-base ">
        <div className="text-md text-gray-500">
          <p> service</p>
        </div>

        <GrServices size={15} className="text-gray-400" />
      </div>
      <div className="flex flex-col pb-5">
        <div className="pt-2 pl-3 text-[15px]">
          <h2>7 days Returns</h2>
          <p className="text-gray-400 text-sm"> change mind not allow</p>
        </div>
        <div className="pl-3 text-[15px] pt-2">
          <h3>Warranty not available</h3>
        </div>
      </div>
      <hr />
      <div className="py-5 font-medium text-[16px]">
        <h2> Cash on Delivery Available</h2>
      </div>
      <hr />
      <div className="flex justify-around items-center py-4">
        <div>
          <p className="text-gray-400 ">Ship on Time</p>
          <h1 className=" text-bold text-md pt-4 text-center text-gray-700">
            90%
          </h1>
        </div>
        <div>
          <p className="text-gray-400">Chat Response</p>
          <h1 className=" text-bold text-md text-gray-700 pt-4 text-center">
            100%
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ProductSideInfo;
