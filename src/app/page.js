import Header from "@/componants/layout/header";
import BestDeals from "@/componants/route/bestDeals/bestDeal";
import Category from "@/componants/route/category/category";
import SsrBestDeals from "@/componants/route/bestDeals/ssrBestDeal";
import { Suspense } from "react";
import BestElectronics from "@/componants/route/bestElectronic/bestElectronic";
import SsrBestElectronic from "@/componants/route/bestElectronic/ssrBestElectronics";
import ToyProducts from "@/componants/route/ToysProducts/toyProducts";
import SsrToysProducts from "@/componants/route/ToysProducts/ssrToyProduct";
import FeaturedProduct from "@/componants/route/featuredProduct/featuredProduct";
import HomeHero from "@/componants/route/homeHero/HomeHero";
import Footer from "@/componants/layout/footer";

export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <main>
      <Header />
      <HomeHero />
      <BestDeals>
        <Suspense fallback={<p>loading</p>}>
          <SsrBestDeals />
        </Suspense>
      </BestDeals>
      <Category />
      <BestElectronics>
        <Suspense fallback={<p>loading</p>}>
          <SsrBestElectronic />
        </Suspense>
      </BestElectronics>
      <ToyProducts>
        <Suspense fallback={<p>loading</p>}>
          <SsrToysProducts />
        </Suspense>
      </ToyProducts>
      <FeaturedProduct />
      <br />
      <Footer />
    </main>
  );
}
