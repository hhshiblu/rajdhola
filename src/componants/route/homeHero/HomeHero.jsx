import React from "react";

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
