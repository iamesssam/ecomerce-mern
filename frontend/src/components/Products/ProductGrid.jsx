import React from 'react'
import { Link } from 'react-router-dom'

const ProductGrid = ({ products, loading, error }) => {
    if (loading) {
        return <p>Loading....</p>
    }

    if (error) {
        return <p>Error:{error}</p>
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {products?.map((product, index) => (
                <Link to={`/product/${product._id}`}
                    key={index}
                    className='block'
                >
                    <div className='bg-white p-4 rounded-lg'>
                        <div className='w-full h-96 mb-4'>
                            <img src={product.images[0].url} alt=""
                                className='rounded-lg object-cover w-full h-full'
                            />
                        </div>
                        <h3 className='text-sm mb-2'>{product.name}</h3>
                        <p className='text-gray-800 font-medium text-sm'>
                            EGP {product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProductGrid
