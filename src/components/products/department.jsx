"use client";
import Rating from "@/componants/route/rating/rating";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

function Department({ childcate, searchParam, category }) {
  const minref = useRef(null);
  const maxref = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryParams = searchParam._c;

  const subcategoryParams = searchParam._subc;
  const router = useRouter();
  const rating = searchParams.rating;
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [selectedRating, setSelectedRating] = useState(null);

  const handleDivClick = (rating) => {
    setSelectedRating(rating);
    router.push(pathname + "?" + createQueryString("rating", rating));
  };

  const MaxHandler = () => {
    const max = maxref.current.value;

    router.push(pathname + "?" + createQueryString("_greaterThan", max));
  };
  const MinHandler = () => {
    const min = minref.current.value;

    router.push(pathname + "?" + createQueryString("_lessThan", min));
  };

  return (
    <div>
      {categoryParams ? (
        <p className="flex items-center justify-start ml-[-4px] text-[15px] font-[500] pt-1">
          <IoIosArrowBack size={14} /> {categoryParams}
        </p>
      ) : (
        <>
          {category.map((cate, i) => (
            <h2
              className="text-[13px] cursor-pointer hover:text-red-500 leading-[20px]  font-[400]"
              key={i}
              onClick={() =>
                router.push(pathname + "?" + createQueryString("_c", cate.name))
              }
            >
              {cate.name}
            </h2>
          ))}
        </>
      )}
      {categoryParams ? (
        subcategoryParams ? (
          <p className="flex items-center justify-start pl-[2px] text-[14px] font-[500] ">
            <IoIosArrowBack size={14} /> {subcategoryParams}
          </p>
        ) : (
          <>
            {category
              ?.find((cat) => cat.name === categoryParams)
              .children?.map(
                (cate, i) =>
                  cate && (
                    <h2
                      className="text-[13px] pl-3 cursor-pointer hover:text-red-500 leading-[20px]  font-[400]"
                      key={i}
                      onClick={() =>
                        router.push(
                          pathname + "?" + createQueryString("_subc", cate.name)
                        )
                      }
                    >
                      {cate.name}
                    </h2>
                  )
              )}
          </>
        )
      ) : (
        ""
      )}

      {categoryParams &&
        subcategoryParams &&
        childcate?.map((cate, i) => (
          <h2
            className="text-[13px] pl-4 cursor-pointer hover:text-red-500 leading-[20px]  font-[440]"
            key={i}
            onClick={() =>
              router.push(pathname + "?" + createQueryString("_ch", cate.name))
            }
          >
            {cate.name}
          </h2>
        ))}

      <div className="pt-6">
        <h2 className="text-[15px] font-[500]">price</h2>
        <form action={MinHandler}>
          <div className="flex items-center gap-[7px] pt-1">
            <label htmlFor="min"></label>
            <input
              ref={minref}
              type="text"
              name="min"
              className="w-[100px] px-[3px] font-[500] text-[14px] border-[2px] border-gray-400 rounded-md text-black "
              placeholder="Min Price"
              style={{ backgroundColor: "transparent" }}
            />

            <button
              type="submit"
              className="border border-gray-400 px-3 rounded-md py-[px]"
            >
              Go
            </button>
          </div>
        </form>
        <form action={MaxHandler}>
          <div className="flex items-center gap-[7px] pt-1">
            <label htmlFor="mxn"></label>
            <input
              ref={maxref}
              name="max"
              type="text"
              className="w-[100px] px-[3px] font-[500] text-[14px] border-[2px] border-gray-400 rounded-md text-black"
              placeholder="Max Price"
              style={{ backgroundColor: "transparent" }}
            />
            <button
              type="submit"
              className="border border-gray-400 px-3 rounded-md py-[px]"
            >
              Go
            </button>
          </div>
        </form>
      </div>

      <div className="pt-10 ">
        <div className="py-4 ext-[15px] font-[500] text-gray-600">
          {" "}
          Filter by rating
        </div>
        <div className="pl-2">
          <div className="flex gap-2 py-1" onClick={() => handleDivClick(5)}>
            <input
              type="checkbox"
              className="cursor-pointer  w-[15px]"
              checked={rating == 5 || selectedRating === 5}
            />
            <Rating rating="5" />
          </div>
          <div className="flex gap-2 py-1" onClick={() => handleDivClick(4)}>
            <input
              type="checkbox"
              className="cursor-pointer  w-[15px]"
              checked={rating == 4 || selectedRating === 4}
            />
            <Rating rating="4" />
          </div>
          <div className="flex gap-2 py-1" onClick={() => handleDivClick(3)}>
            <input
              type="checkbox"
              className="cursor-pointer  w-[15px]"
              checked={rating == 3 || selectedRating === 3}
            />
            <Rating rating="3" />
          </div>
          <div className="flex gap-2 py-1" onClick={() => handleDivClick(2)}>
            <input
              type="checkbox"
              className="cursor-pointer  w-[15px]"
              checked={rating == 2 || selectedRating === 2}
            />
            <Rating rating="2" />
          </div>
          <div className="flex gap-2 py-1" onClick={() => handleDivClick(1)}>
            <input
              type="checkbox"
              className="cursor-pointer  w-[15px]"
              defaultChecked={rating == 1}
              checked={rating == 1 || selectedRating === 1}
            />
            <Rating rating="1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Department;
