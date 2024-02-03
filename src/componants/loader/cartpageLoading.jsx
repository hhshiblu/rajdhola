import React from "react";

function CartpageLoading({ length }) {
  const loadingItems = [];

  for (let i = 0; i < length; i++) {
    loadingItems.push(
      <>
        <div className="flex w-full gap-3">
          <div className="bg-gray-300 h-[73px] w-[89px]  animate-pulse"></div>
          <div className=" flex flex-1">
            <div className="flex flex-col w-full md:pr-6">
              <div className="w-[100%] h-[38px] rounded-md  bg-gray-300 animate-pulse"></div>
              <div className="inline-flex gap-3 pt-2">
                <div className="h-[23px] w-[80px] bg-gray-300  rounded-md animate-pulse"></div>
              </div>
            </div>
            <div className="  flex-col items-end hidden md:flex">
              <div className="  h-[23px] w-[90px] bg-gray-300   rounded-md animate-pulse"></div>
              <div className=" mt-4 h-[23px] w-[90px] bg-gray-300   rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {loadingItems}
      <div className="w-[70%] 600px:[40%] h-[20px] rounded-md  bg-gray-300 animate-pulse"></div>
    </>
  );
}

export default CartpageLoading;
