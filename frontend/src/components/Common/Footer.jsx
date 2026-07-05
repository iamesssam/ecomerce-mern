import React from 'react'
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"
import { FiPhoneCall } from "react-icons/fi"

const Footer = () => {
    return (
        <footer className='border-t border-gray-200 pt-12'>
            {/* الجزء العلوي - السكاشن الـ 4 */}
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5 justify-items-center md:justify-items-start'>
                {/* Section 1 */}
                <div className='w-full'>
                    <h2 className='mb-3 font-bold'>Newsletter</h2>
                    <p className='text-sm mb-3 text-gray-700'>
                        Be the first to hear about new products, <br />
                        exclusive events, and online offers.
                    </p>
                    <p className='text-sm font-medium mb-5'>Sign up and get 10% off your first order.</p>
                    <form className='flex'>
                        <input type="email"
                            placeholder='Enter your email'
                            className='focus:outline-none border border-gray-300/70 
                            py-1 px-3 placeholder:text-sm rounded-l w-full'
                        />
                        <button type='submit'
                            className='py-1.5 px-5 text-sm bg-black text-white
                            hover:bg-gray-800 rounded-r cursor-pointer transition-colors'>
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Section 2 */}
                <div className='w-full'>
                    <h2 className='font-bold'>Shop</h2>
                    <div className='text-sm mt-3 space-y-2'>
                        <p className='text-gray-900 cursor-pointer hover:text-black'>Men's Top Wear</p>
                        <p className='text-gray-900 cursor-pointer hover:text-black'>Women's Top Wear</p>
                        <p className='text-gray-900 cursor-pointer hover:text-black'>Men's Bottom Wear</p>
                        <p className='text-gray-900 cursor-pointer hover:text-black'>Women's Bottom Wear</p>
                    </div>
                </div>

                {/* Section 3*/}
                <div className='w-full'>
                    <h2 className='mb-3 font-bold'>Support</h2>
                    <div className='text-sm mt-3 space-y-2'>
                        <p className='text-gray-900 cursor-pointer hover:text-black'>Contact Us</p>
                        <p className='text-gray-900 cursor-pointer hover:text-black'>About Us</p>
                        <p className='text-gray-900 cursor-pointer hover:text-black'>FAQs</p>
                        <p className='text-gray-900 cursor-pointer hover:text-black'>Features</p>
                    </div>
                </div>

                {/* Section 4*/}
                <div className='w-full'>
                    <h2 className='mb-3 font-bold'>Follow Us</h2>
                    <div className='flex mb-5 space-x-4'>
                        <a href="https://facebook.com" target='_blank' rel="noreferrer">
                            <TbBrandMeta className='w-5 h-5 cursor-pointer hover:text-blue-600' />
                        </a>
                        <a href="https://instagram.com" target='_blank' rel="noreferrer">
                            <IoLogoInstagram className='w-5 h-5 cursor-pointer hover:text-pink-600' />
                        </a>
                        <a href="https://x.com" target='_blank' rel="noreferrer">
                            <RiTwitterXLine className='w-5 h-5 cursor-pointer hover:text-gray-700' />
                        </a>
                    </div>

                    <div>
                        <span className='text-sm text-gray-600 font-bold'>Call Us</span>
                        <p className='text-black font-bold text-sm flex items-center mt-1'>
                            <FiPhoneCall className='mr-2' />
                            0123-456-789
                        </p>
                    </div>
                </div>
            </div>

            {/* الجزء السفلي - حقوق النشر (خارج الـ Grid) */}
            <div className='container mx-auto mt-12 px-5 border-t border-gray-200 py-6 text-center'>
                <p className='text-gray-500 text-sm'>
                    © 2026 CompileTab. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
