"use client"
import React from "react";
import Slider from "./component/slider/Slider";
import SliderProduct from "./component/sliderproduct/SliderProduct";
import HomeProduct from "./component/homeproduct/HomeProduct";
import { dbmegamenu } from "./component/header/db";
function page() {

  return (
    <main className="grow min-h-screen flex flex-col gap-10">
      <Slider />
      <SliderProduct />
      {dbmegamenu[0].submenu&&dbmegamenu[0].submenu.map((itemss, i) => {
        return (
          <HomeProduct itemss={itemss} key={i} />

        )
      })

      }
    </main>

  )



}

export default page;