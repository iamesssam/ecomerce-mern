import React from 'react'
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"
const Topbar = () => {
    return (
        <div className='bg-[#ea2e0e] text-white'>
            <div className='container mx-auto flex justify-between py-2 px-15'>
                <div className='hidden md:flex items-center space-x-4'>
                    {/* icons */}
                    <a href="#" className='hover:text-gray-300'>
                        <TbBrandMeta className='w-5 h-5' />
                    </a>

                    <a href="#" className='hover:text-gray-300'>
                        <IoLogoInstagram className='w-5 h-5' />
                    </a>

                    <a href="#" className='hover:text-gray-300'>
                        <RiTwitterXLine className='w-5 h-5' />
                    </a>
                </div>
                <div className='text-sm text-center flex-grow'>
                    We ship worldwide Fast and reliable shipping!
                </div>
                <div className='text-center text-sm hidden md:block'>
                    <span>
                        +1(234) 567-890
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Topbar
