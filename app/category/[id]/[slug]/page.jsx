import React from "react";
import { use } from "react";
import Breadcrumb from "@/app/component/breadcrumb/Breadcrumb";
import Container from "@/app/component/header/Container";
import CardItems from "@/app/component/cardItem/CardItems";
import Filtering from "@/app/component/filtering/Filtering";
import FilteringMobile from "@/app/component/filtering/FilteringMobile";
function page({ params }) {
  const { slug } = params;
  return (
    <>
      <Breadcrumb />
      <main className="">
        <Container>
          <div className="grid grid-cols-12 py-5">
            <div className="hidden lg:flex lg:col-span-3 relative rounded-lg">
              <Filtering slug={slug} />
            </div>
            <div className="flex lg:hidden w-full col-span-12">
              <FilteringMobile />
            </div>
            <div className="col-span-12 lg:col-span-9 flex flex-wrap *:min-h-[450px] *:max-h-[450px] *:w-full *:md:w-[50%] *:lg:w-[33%] *:xl:w-[25%] pr-4">
              <CardItems slug={slug} />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

export default page;
// export async function generateStaticParams() {
//   const res = await fetch("https://67cd78d0dd7651e464ee7491.mockapi.io/api/v1/products");
//   const products = await res.json();

//   return products.map(product => ({
//     id: product.id.toString(),
//     slug: product.title + product.id?.toLowerCase().replace(/\s+/g, "-") || "no-slug",
//   }));
// }
