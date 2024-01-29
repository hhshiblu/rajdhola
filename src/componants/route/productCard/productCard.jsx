import { MotionDiv } from "@/libs/framermotion";
import styles from "@/libs/styles";
import Image from "next/image";
import Link from "next/link";
import Rating from "../rating/rating";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
function ProductCard({ data, i }) {
  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: i * 0.15,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="bg-white hover:shadow-lg rounded-md "
    >
      <div className="w-full h-auto mb- p-3 relative rounded-md  cursor-pointer ">
        <Link href={`/product/${data._id}`}>
          <Image
            src={data.images[0].url}
            alt={data.name}
            className="h-[160px]  w-auto object-cover pb-1 m-auto rounded-md hover:rounded-none   mx-auto  transform hover:scale-105  transition duration-500 "
            height={10000}
            width={10000}
          />
        </Link>

        <Link href={`/product/${data._id}`}>
          <h5 className="pb-1 font-[500] text-[14px] leading-[19px]  hover:text-red-500">
            {data?.name.length > 20
              ? data.name.slice(0, 38) + "..."
              : data?.name}
          </h5>
        </Link>
        <div className=" flex">
          <h5 className={`${styles.productDiscountPrice}`}>
            {data.discountPrice ? data.discountPrice : data.originalPrice}
            <span className=" font-semibold"> ৳</span>
          </h5>
          <h4 className={`${styles.price} text-gray-600`}>
            {data.discountPrice ? data.originalPrice + "৳" : null}
          </h4>
        </div>

        <div className="flex items-center">
          <Rating rating={4.5} />
          <div className="ml-3 text-gray-400"></div>
          <span>({data?.sold_out})</span>
        </div>
      </div>
    </MotionDiv>
  );
}

export default ProductCard;
