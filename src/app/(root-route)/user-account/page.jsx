import React from "react";

function page() {
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
            <div className=" text-[13px] text-gray-500 ">
              <p className="py-1">
                {/* {name} */}
                hasanul haque shiblu
              </p>
              <p>
                {/* {number} */}
                01782572426
              </p>
              <p className="py-1">
                {/* {name} */}
                hasanul haque shiblu
              </p>
            </div>
          </div>

          <div className="flex flex-col w-[100%] lg:w-[40%] bg-white hover:shadow-lg p-4 px-3 md:px-8 rounded-lg">
            <h2 className="text-semibold text-gray-800 py-2"> My address</h2>
            <hr />
            <div className=" text-[13px] text-gray-500 ">
              <p className="pb-2 pt-1">Default shipping address </p>
              <p className="text-gray-900 text-[14px]">
                {/* {number} */}
                Hasanul haque
              </p>
              <p className="pt-1">15, kalibari road</p>
              <p className="py-[1px]">Netrakona , Mymenshing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
