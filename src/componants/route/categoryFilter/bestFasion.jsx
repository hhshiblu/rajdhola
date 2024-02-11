import Image from "next/image";
import React from "react";

function BestFasion() {
  return (
    <div className="flex gap-2 flex-wrap h-full ">
      <div className="w-[45%] mx-auto">
        <Image
          src="/man'fasion.gif"
          alt="rajdhola_toy_product"
          width={500}
          height={500}
          className=" md:h-[90px] lg:h-[105px] w-full"
        />
        <p className="text-[12px] "> Men&lsquo;s</p>
      </div>
      <div className="w-[45%] mx-auto">
        <Image
          src="/woman_fasion.gif"
          alt="rajdhola_toy_product"
          width={500}
          height={500}
          className="md:h-[90px] lg:h-[105px] w-full"
        />
        <p className="text-[12px] "> Women&lsquo;s</p>
      </div>
      <div className="w-[45%] mx-auto">
        <Image
          src="/kids_fasion.jpg"
          alt="rajdhola_toy_product"
          width={500}
          height={500}
          className="md:h-[90px] lg:h-[105px] w-full"
        />
        <p className="text-[12px] "> Kid&lsquo;s</p>
      </div>
      <div className="w-[45%] mx-auto">
        <Image
          src="/jualary_fasion.jpg"
          alt="rajdhola_toy_product"
          width={500}
          height={500}
          className="md:h-[90px] lg:h-[105px] w-full"
        />
        <p className="text-[12px] "> jualary&lsquo;s</p>
      </div>
    </div>
  );
}

export default BestFasion;
