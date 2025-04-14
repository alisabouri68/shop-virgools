// 'use client'
// import React, { useEffect, useState } from 'react'
// import { UseFilterBrandStore } from "@/app/zustand/UseFilterBrandStore";
// function FilteringBrand({ styles , slug}) {
//     const {brandValue , setBrandValue} = UseFilterBrandStore()
//   const [items, SetItemms] = useState([])
//   useEffect(() => {
//     const arrItems = allproducts[brandIndex]?.productsitems.map((brand) => brand.brand.toString()) || []
//     const uniqueArray = [...new Set(arrItems)]
//     const updatedItems = [...uniqueArray, "تمام برند ها"].reverse();
//     SetItemms(updatedItems)

//   }, [brandIndex])
//   return (
//     <div className={styles}>

//       {items.length > 0 ? items.map((x, i) => (
//         <div className="control-group" key={i}>
//           <label className="control control-radio text-2xl">
//             {x}
//             <input type="radio" name="radio" checked={brandValue === x} value={x} onChange={(e)=>setBrandValue(e.target.value)} />
//             <div className="control_indicator"></div>
//           </label>

//         </div>
//       )) : null
//       }

//     </div>
//   )
// }

// export default FilteringBrand