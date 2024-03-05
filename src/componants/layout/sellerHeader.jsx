import Image from "next/image";
import Link from "next/link";
import React from "react";

function SellerHeader() {
  return (
    <div className="h-[60px] bg-white shadow-2xl flex items-center justify-between 600px:px-20 px-2 overflow-hidden">
      <div>
        <Link href="/">
          <Image
            src="/rajdhola_title_logo.svg"
            alt="rajdhola logo"
            width={120}
            height={100}
          />
        </Link>
      </div>

      <Link href="/create-seller/account">
        <h2 className="bg-[#195851] rounded-2xl py-[7px] px-5 text-white font-[500] cursor-pointer">
          Start Selling
        </h2>
      </Link>
    </div>
  );
}

export default SellerHeader;
