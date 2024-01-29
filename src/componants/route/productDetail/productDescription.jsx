import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductDescription({ data, seller }) {
  return (
    <section className="bg-white">
      <div className="w-[90%]   h-full mx-auto pb-16  ">
        <div className="flex    ">
          <div className="w-full  lg:w-[65%] 800px:mx-auto  800px:pl-0 mr-2">
            <div className="800px:px-4 px-0 overflow-hidden">
              <h1 className="text-[18px] font-medium md:text-[20px] py-2 text-slate-700  pl-4">
                Product description
              </h1>
              <hr className="mr-4 " />
              <hr className="mr-4 " />
              <div className=" pt-4 items-center  font-medium flex  justify-between 800px:justify-around w-[90%] mr-auto min-h-fit">
                <div>
                  <h1>Brand Name : {data?.brandName}</h1>
                </div>
                <div>
                  <p>Available Color:</p>
                  {data?.color?.map((color, index) => (
                    <li key={index}> {color}</li>
                  ))}
                </div>
              </div>
              <p className="py-5 text-slate-600">{data?.description}</p>
            </div>
            <div>
              <hr className="mr-4" />
              <h1 className="text-[18px] md:text-[20px] py-2 text-slate-800  font-medium pt-5 ">
                Some popular reviews of :{" "}
                <span className="text-[14px]  font-normal">
                  {data?.name?.slice(0, 25)} ...
                </span>
              </h1>
              <Link href={``}>
                <h2 className="text-[15px] cursor-pointer hover:text-[#db3615] text-gray-500 pb-2">
                  {" "}
                  Shop : {seller?.name}
                </h2>
              </Link>

              <hr className="mr-4" />
              <hr className="mr-4" />
              {/* <h1 onClick={handelMessage}> chat me</h1> */}
              {!data &&
                !data?.reviews?.map((item, index) => {
                  return (
                    <div
                      className="w-full h-min   my-4 p-4 rounded-md "
                      key={index}
                    >
                      <div className="flex ">
                        {item && item.user.avatar ? (
                          <Image
                            src={``}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="w-[50px] h-[50px] rounded-full"
                          />
                        ) : null}
                        <div className="w-full flex  pl-6 relative">
                          <h1 className="font-[500] mr-3">{item.user.name}</h1>
                          <span className="mr-2 !mt-1">
                            {/* <Rating rating={data?.ratings} />{" "} */}
                          </span>
                        </div>
                      </div>

                      <div className="pl-16 mt-[-22px] text-gray-500 text-sm">
                        {item.comment}
                      </div>
                    </div>
                  );
                })}

              <div className="w-full flex justify-center py-3">
                {data && data?.reviews?.length === 0 && (
                  <h5>No Reviews have for this product!</h5>
                )}
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-[30%] mr-auto pt-4 ">
            <h2 className="text-[18px] pb-1 font-normal ">
              From {seller?.name}
            </h2>
            <hr />
            <hr />
            <div className="flex flex-col pt-3 gap-4">
              {/* {products?.slice(0, 4).map((p, i) => {
                  return ( */}
              <div className="w-[90%] 1000px:w-[75%] h-[120px] m-auto">
                <Link href={`${`/product/}`}`}>
                  <div className="relative ">
                    <Image
                      src={``}
                      alt=""
                      className="w-[100%] h-[120px] mx-auto"
                    />
                    <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-[#00453e] font-medium text-xs left-2 top-2">
                      {" "}
                      50 %
                    </div>
                  </div>
                </Link>
              </div>
              {/* );
                })} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDescription;
