// مسیر: app/category/[id]/[slug]/page.jsx

import React from "react";
import Breadcrumb from "@/app/component/breadcrumb/Breadcrumb";
import Category from "@/app/component/category/Category";

function Page({ params }) {
  const { id } = params;

  return (
    <main className="grow">
      <Breadcrumb />
      <Category id={id} />
    </main>
  );
}

export default Page;
// export async function generateStaticParams() {
//   const res = await fetch("https://67cd78d0dd7651e464ee7491.mockapi.io/api/v1/products");
//   const products = await res.json();

//   return products.map(product => ({
//     id: product.id.toString(),
//     slug: product.title + product.id?.toLowerCase().replace(/\s+/g, "-") || "no-slug",
//   }));
// }