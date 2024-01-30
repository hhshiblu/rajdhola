import Image from "next/image";
import Link from "next/link";
import Rating from "../rating/rating";

function ProductCardA({ p }) {
  return (
    <div>
      <div className="min-w-[245px] pb-4 rounded-lg max-w[245px] ">
        <div>
          <Link href={"/product/" + p._id}>
            <div className="  bg-gray-200  rounded-md hover:rounded-none h-[190px]  max-w-[250px]  overflow-hidden mx-auto duration-500">
              <Image
                src={p.images[0].url}
                alt={p.name}
                className="h-[100%] w-auto rounded-md hover:rounded-none  object-cover mx-auto transform hover:scale-105   transition duration-500    "
                height={100}
                width={100}
              />
            </div>
          </Link>
          <div className="">
            <div className="flex items-center pt-1 gap-2">
              {p.discountPrice ? (
                <div className=" bg-[#00453e] rounded-sm px-[2px] pt-[3px] font-semibold h-[24px] w-[56px] text-white text-[13px]">
                  {(p.discountPrice
                    ? ((p.originalPrice - p.discountPrice) / p.originalPrice) *
                      100
                    : 0
                  ).toFixed(0)}
                  % off
                </div>
              ) : (
                <div className="text-[#00453e] font-bold text-[12px]   ">
                  Daily
                </div>
              )}
              <div className="text-[#00453e] font-bold text-[12px]   ">
                Deal
              </div>{" "}
            </div>
          </div>
          <div className="flex">
            <h5
              className={`text-[17px] text-[#0F1111] text-sm py-[2px] font-semibold `}
            >
              {p.discountPrice ? p?.discountPrice : p?.originalPrice}
              <span className="  font-medium"> ৳</span>
            </h5>
            {p?.discountPrice && (
              <div className=" flex">
                <h5 className="pl-2 text-[12px] leading-[18px] text-[#565959]  ">
                  {" "}
                  Daily Price:{" "}
                </h5>
                <h4
                  className={`pl-1 text-[12px] leading-[18px] text-[#565959] line-through`}
                >
                  {p?.originalPrice ? p?.originalPrice + " ৳" : null}
                </h4>
              </div>
            )}
          </div>
          <div className="flex items-center ">
            <Rating rating={4.5} />
            <div className="ml-3 text-gray-400"></div>
            <span>({p?.sold_out})</span>
          </div>

          <Link href={"/product/" + p._id}>
            <h2 className="pr-2 font-[500] text-[14px] hover:text-red-500 leading-[19px]">
              {p?.name.length > 20 ? p?.name.slice(0, 45) + "..." : p?.name}
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCardA;
