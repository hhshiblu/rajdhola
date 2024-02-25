import Image from "next/image";
import React from "react";

function Queryloader() {
  return (
    <div className="h-[60vh]  flex justify-center items-center w-full">
      <Image
        src="/spiner.svg" // Assuming the spinner image path is correct
        alt="spinner"
        width={100}
        height={100}
        className="object-contain bg-white"
      />
    </div>
  );
}

export default Queryloader;
