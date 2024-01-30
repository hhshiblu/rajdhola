import Image from "next/image";
import React from "react";

function DetailsImage({ images, setSelect, select }) {
  return (
    <div className="  w-[100%] md:w-[43%] lg:w-[32%] h-[44vh] md:h-[48vh] mx-auto">
      <div className=" md:h-[98%] h-[80%] w-auto mx-auto rounded-lg overflow-hidden">
        {images && images[select] && (
          <Image
            src={images[select].url}
            alt=""
            className=" overflow-hidden rounded-lg w-auto  m-auto h-[100%]"
            height={1000}
            width={1000}
          />
        )}
      </div>

      <div className=" flex gap-4 w-full pt-6">
        {images &&
          images?.map((i, index) => (
            <div
              className={`${
                select === index ? "border-[2px] border-red-400" : "null border"
              } cursor-pointer h-[40px] w-[40px] flex justify-center items-center rounded-sm `}
              key={index}
            >
              <Image
                src={i.url}
                alt={i.url}
                className="  h-full w-auto overflow-hidden mx-auto rounded-sm"
                width={1000}
                height={1000}
                onClick={() => setSelect(index)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default DetailsImage;
