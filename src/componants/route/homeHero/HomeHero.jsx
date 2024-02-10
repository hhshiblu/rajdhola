import Image from "next/image";
import React from "react";

import "./styles.css";
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
