import React from 'react'
import ProductSlider from './ProductSlider'
import ProductInfo from './ProductInfo'
function ProductTop({product}) {
  return (
<div className='w-full flex flex-wrap *:w-full *:lg:w-[50%] *:p-5'>
<ProductSlider product={product} />
<ProductInfo product={product}/>
</div>
  )
}

export default ProductTop