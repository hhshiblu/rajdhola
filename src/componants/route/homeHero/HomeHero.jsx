import Image from "next/image";
import React from "react";

import Link from "next/link";
import { getBanars } from "@/allActions/home";
import HeroSlider from "./HomeSlider";
async function HomeHero() {
  const banars = await getBanars();
  return (
    <div className="w-full">
      <HeroSlider banars={banars} />
    </div>
  );
}

export default HomeHero;

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
