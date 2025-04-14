import ProductPage from '@/app/component/productpage/ProductPage';
import React from 'react';
function Page({ params }) {
  const { slug } = params;
  return <ProductPage product={slug} />;
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