import React from 'react'
import mens from "../../assets/mens-collection.webp";
import women from "../../assets/womens-collection.webp"
import { Link } from 'react-router-dom';
const GenderCollectionSection = () => {
    return (
        <div className='flex flex-col container mx-auto justify-center 
        md:flex-row px-5 py-15 gap-5
        w-full'>
            <div className='relative flex-1'>
                <img src={women} alt="" className='w-full h-[700px] 
                object-cover' />
                <div className='absolute bottom-5 left-3 px-7 py-5 bg-white 
                opacity-90
                text-black
                '>
                    <h2 className='font-bold text-xl'>Women's Collection</h2>
                    <Link className='underline text-gray-900'
                        to="/collections/all?gender=Women"

                    >Shop Now</Link>
                </div>
            </div>

            <div className='relative flex-1'>
                <img src={mens} alt="" className='w-full h-[700px]' />

                <div className='absolute bottom-5 left-3 px-7 py-5 bg-white 
                text-black opacity-90
                '>
                    <h2 className='font-bold text-xl'>Men's Collection</h2>
                    <Link className='underline text-gray-900'
                        to="/collections/all?gender=Men"
                    >Shop Now</Link>
                </div>
            </div>
        </div>
    )
}

export default GenderCollectionSection
