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
import CategoryFilter from "@/componants/route/categoryFilter/categoryFilter";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "rajdhola.com",
  description: "rajdhola is a big company as a e-commerce",
  keywords: ["Rajdhola", "rajdhola", "rajdhala"],
  metadataBase: new URL("https://rajdhola.com"),

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    images: "/rajdhola_title_logo.svg",
  },
  icons: {
    icon: ["/favicon_crome.png"],
    apple: ["/apple_favicon.png"],
    shortcut: ["/apple_favicon.png"],
  },
};
export default function Home() {
  return (
    <main>
      <Header />
      <HomeHero />
      <CategoryFilter />

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
