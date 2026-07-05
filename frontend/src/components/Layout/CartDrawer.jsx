import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import CartContent from '../Cart/CartContent'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const CartDrawer = ({ isOpen, toggleCart }) => {
    const navigate = useNavigate();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const userId = user ? user._id : null;


    const handleCheckout = () => {
        toggleCart();
        if (!user) {
            navigate("/login?redirect=checkout");
        } else {
            navigate("/checkout");
        }
    }
    return (
        <div className={`bg-white fixed right-0 top-0 h-full w-3/4 sm:w-1/2 md:w-[30rem] 
        shadow-lg transform transition-transform duration-300 flex flex-col z-50
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}>

            {/* Close Button */}
            <div className={` ${isOpen ? "block" : "hidden"} absolute top-0 right-0 px-5 py-3`}>
                <button onClick={toggleCart}>
                    <HiMiniXMark className='w-6 h-6 cursor-pointer' />
                </button>
            </div>

            {/* Cart content with scrollable area */}

            <div className='flex-grow p-4 overflow-y-auto'>
                <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
                {cart && cart?.products?.length > 0 ? (
                    <CartContent cart={cart} userId={userId} guestId={guestId} />
                ) : (
                    <p>Your cart is empty.</p>
                )
                }
                {/* Component for Cart Content */}

            </div>


            {/* Checkout button fixed at the bottm */}
            <div className='sticky bottom-0 p-4 bg-white'>
                {cart && cart?.products?.length > 0 && (
                    <>
                        <button className='bg-black text-white py-3 w-full rounded-lg font-semibold 
                hover:bg-gray-800 transition
                cursor-pointer '
                            onClick={handleCheckout}
                        >
                            Checkout</button>

                        <p className='text-sm tracking-tight text-gray-500 mt-2 text-center'>Shipping, taxes, abs discount codes calculated at checkout.</p>
                    </>
                )}

            </div>
        </div>
    )
}

export default CartDrawer



