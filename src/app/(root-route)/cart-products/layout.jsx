import Footer from "@/componants/layout/footer";
import Header from "@/componants/layout/header";
import SsrTopSell from "@/componants/route/topSell/ssrTopSell";
import TopSell from "@/componants/route/topSell/topSell";
import React, { Suspense } from "react";

async function layout({ children }) {
  // const product = await getbestElectronic();
  return (
    <div>
      <Header />
      {children}
      <br /> <br />
      <TopSell>
        <Suspense fallback={<p>loading</p>}>
          <SsrTopSell />
        </Suspense>
      </TopSell>
      <Footer />
    </div>
  );
}

export default layout;
