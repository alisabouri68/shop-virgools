import React from 'react'
import Container from '../header/Container'
import ProductTop from './ProductTop'
function ProductPage({product}) {
    return (
        <main className='flex min-h-screen grow'>
            <Container>
                <div className='flex items-center'>
                    <ProductTop product={product} />
                </div>
            </Container>
        </main>
    )
}

export default ProductPage