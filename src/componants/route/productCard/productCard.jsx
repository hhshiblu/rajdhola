import { MotionDiv } from "@/libs/framermotion";
import styles from "@/libs/styles";
import Image from "next/image";
import Link from "next/link";
import Rating from "../rating/rating";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
function ProductCard({ data, i, ref }) {
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
      ref={ref}
    >
      <div className="w-full h-auto  pt-[1px] 600px:pt-1 overflow-hidden relative rounded-md  cursor-pointer ">
        <Link href={`/product/${data._id}`}>
          <Image
            src={data.images[0].url}
            alt={data.name}
            className="h-[180px]  sm:h-[193px]   w-auto object-cover pb-[6px]  m-auto rounded-md hover:rounded-none   mx-auto  transform hover:scale-105  transition duration-500 "
            height={500}
            width={500}
          />
        </Link>

        <Link href={`/product/${data._id}`}>
          <h5 className="pb-1 font-normal text-[14px] px-[4px] pt-[6px] 600px:px-0 leading-[15px]   hover:text-red-500">
            {data?.name.length > 20
              ? data.name.slice(0, 36) + "..."
              : data?.name}
          </h5>
        </Link>
        <div className="px-[4px]  flex">
          <h5 className={`${styles.productDiscountPrice}`}>
            {data.presentPrice}
            <span className=" font-semibold"> ৳</span>
          </h5>
          <h4 className={`${styles.price} text-gray-600`}>
            {data?.previousPrice ? data.previousPrice : ""}
          </h4>
        </div>

        <div className="flex items-center px-[4px] 600px:px-0">
          <Rating rating={4.5} />
          <div className="ml-3 text-gray-400"></div>
          <span>({data?.reviews.length})</span>
        </div>
      </div>
    </MotionDiv>
  );
}

export default ProductCard;
