import React from 'react'
import featured from "../../assets/featured.webp"
import { Link } from 'react-router-dom'
const FeaturedCollection = () => {
    return (
        <div className='relative container mx-auto 
       px-5  md:px-15 flex flex-col-reverse md:flex-row justify-between'>
            {/* Left side */}
            <div className='h-[400px] md:h-[600px] bg-green-50  flex flex-col
            justify-start md:justify-center  rounded-xl
            w-full md:w-1/2 px-7
            '>
                <h3 className='text-sm font-semibold text-gray-900 mb-2
                text-center md:text-start mt-5
                '>
                    Comfort and style</h3>

                <h2 className='text-2xl md:text-4xl font-bold mb-3
                text-center md:text-start
                '>Apparel made for your <br />
                    everyday life
                </h2>

                <p className='text-sm text-gray-900 mb-3 
                text-center md:text-start
                '>
                    Discover high-quality, comfortable clothing that effortlessly blends fashion
                    and <br />
                    function. Designed to make you look and feel great everyday.
                </p>
                <div className='text-center md:text-start mt-5'>

                    <Link
                        to="/collections/all"
                        className='px-4 py-2 bg-black text-white rounded text-sm
                    cursor-pointer
                    '>
                        Shop Now</Link>
                </div>
            </div>

            {/* Right side */}

            <div className='w-full md:w-1/2'>
                <img src={featured} alt="" className='h-[400px] md:h-[600px] rounded-xl
                object-cover
                ' />
            </div>
        </div>
    )
}

export default FeaturedCollection
