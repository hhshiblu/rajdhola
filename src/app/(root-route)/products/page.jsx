import { getChildrensChildren } from "@/allActions/category/category";
import Header from "@/componants/layout/header";
import React, { useCallback } from "react";

function Page(searchParams) {
  // const children = await getChildrensChildren(
  //   "Men's-Fashion-qUvg3Jkum",
  //   "Clothing-S3VWpK6yX"
  // );
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div>
      {/* <Header /> */}
      <div className="px-2">
        <div className="w-[267px]">
          Department
          <hr />
          <h2 className="text-[12px]"> Men&apos;s Fasion</h2>
          <p className="text-[12px] pb-1 font-[700]">Men&apos;s clothing</p>
          <div className="pl-[6px] flex flex-col ">
            {/* {children?.map((cate, i) => (
              <h2 className="text-[12px]" key={i}>
                {cate.name}
              </h2>
            ))} */}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Page;

// export default function ExampleClientComponent() {
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   // Get a new searchParams string by merging the current
//   // searchParams with a provided key/value pair
//   const createQueryString = useCallback(
//     (name, value) => {
//       const params = new URLSearchParams(searchParams)
//       params.set(name, value)

//       return params.toString()
//     },
//     [searchParams]
//   )

//   return (
//     <>
//       <p>Sort By</p>

//       {/* using useRouter */}
//       <button
//         onClick={() => {
//           // <pathname>?sort=asc
//           router.push(pathname + '?' + createQueryString('sort', 'asc'))
//         }}
//       >
//         ASC
//       </button>

//       {/* using <Link> */}
//       <Link
//         href={
//           // <pathname>?sort=desc
//           pathname + '?' + createQueryString('sort', 'desc')
//         }
//       >
//         DESC
//       </Link>
//     </>
//   )
// }
