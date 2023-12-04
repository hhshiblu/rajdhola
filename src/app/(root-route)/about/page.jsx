import React from "react";

function page() {
  return (
    <div>
      {" "}
      <div className=" w-full h-[90vh]  gap-5 p-2 mx-auto bg-white shadow-lg select-none  rounded-md  ">
        {/* <div className="w-full bg-gray-300 animate-pulse h-20 rounded-2xl"></div> */}
        <div className="w-11/12  flex flex-col pt-4  gap-5 p-2 mx-auto   md:flex-row  ">
          <div className="flex flex-col md:gap-4 gap-4">
            <div className="bg-gray-300   h-[40vh] sm:h-[40vh] md:h-[45vh] md:w-full sm:w-full rounded-xl animate-pulse"></div>
            <div className=" flex flex-row gap-5">
              <div className="bg-gray-200 h-16  w-16 rounded-xl animate-pulse"></div>
              <div className="bg-gray-200 h-16 w-16 rounded-xl animate-pulse"></div>
              <div className="bg-gray-200 h-16  w-16 rounded-xl animate-pulse"></div>
              <div className="bg-gray-200 h-16 w-16 rounded-xl animate-pulse"></div>
            </div>
          </div>

          <div className="flex  flex-row flex-1  gap-5 w-full sm:p-2">
            <div className="flex flex-col flex-1 gap-3 pr-4">
              <div className="w-[15%] md:w-[20%] bg-gray-300 animate-pulse h-6 mt-4 rounded-2xl"></div>
              <div className="w-full bg-gray-300 animate-pulse h-12 rounded-2xl"></div>
              <div className="w-[40%] md:w-[60%] lg:w-[40%] h-10 bg-gray-200 animate-pulse rounded-2xl"></div>
              <div className="w-[20%]  md:w-[25%] lg:w-[15%] h-8 bg-gray-200 animate-pulse rounded-2xl"></div>
              <div className="w-[70%] md:w-[75%] lg:w-[70%] lg:block h-8 bg-gray-200 animate-pulse rounded-2xl"></div>
              <div className="w-[80%]   h-10 bg-gray-200 animate-pulse rounded-2xl"></div>

              <div className="w-[25%] mt-3 ml-4  h-10 bg-gray-200 animate-pulse rounded-2xl"></div>
              <div className="flex flex-row justify-center gap-16 items-center">
                <div className="w-[25%]  mt-6 md:mt-22 h-10  bg-gray-200 animate-pulse rounded-2xl"></div>
                <div className="w-[25%]  mt-6 md:mt-22 h-10  bg-gray-200 animate-pulse rounded-2xl"></div>
              </div>
            </div>

            <div className=" hidden lg:block">
              <div className="bg-gray-300 h-[50vh]  sm:w-52 pl-20 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
