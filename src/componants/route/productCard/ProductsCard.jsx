import { MotionDiv } from "@/libs/framermotion";
import styles from "@/libs/styles";
import Image from "next/image";
import Link from "next/link";

// import Rating from "../../ProductDetails/Rating";

function ProductsCard({ data, i }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg rounded-md ">
      <div className="w-full h-auto mb- p-3 relative rounded-md  cursor-pointer ">
        <Link href={`/product/${data._id}`}>
          <Image
            src={``}
            width={100}
            height={100}
            alt={data?.name}
            className="w-full pb-1 m-auto h-[160px] object-contain  transform hover:scale-104 transition duration-500"
          />
        </Link>

        <Link href={`/product/${data._id}`}>
          <h5 className="pb-1 font-[500] text-[14px] leading-[19px]  hover:text-red-500">
            {data?.name.length > 20
              ? data.name.slice(0, 30) + "..."
              : data?.name}
          </h5>
        </Link>
        <div className=" flex">
          <h5 className={`${styles.productDiscountPrice}`}>
            {data.originalPrice === 0 ? data.originalPrice : data.discountPrice}
            <span className=" font-semibold"> ৳</span>
          </h5>
          <h4 className={`${styles.price} text-gray-600`}>
            {data.originalPrice ? data.originalPrice + "৳" : null}
          </h4>
        </div>

        <div className="flex items-center">
          {/* <Rating rating={data?.ratings} /> */}
          <div className="ml-3 text-gray-400"></div>
          <span>({data?.sold_out})</span>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
