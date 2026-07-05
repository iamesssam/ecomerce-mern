import React, { useEffect, useState } from 'react';
import PayPalButton from './PayPalButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../../redux/slices/checkoutSlice';
import axios from 'axios';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from './StripePaymentForm';
// const cart = {
//     products: [
//         {
//             name: 'Stylish T-Shirt',
//             size: 'L',
//             color: 'White',
//             price: 120,
//             image: "https://static.pullandbear.net/assets/public/ea6a/8eee/62a143939925/f6a6c2021def/03231538251-M/03231538251-M.jpg?ts=1775728889117&w=766&f=auto"

//         },
//         {
//             name: 'Stylish Jacket',
//             size: 'M',
//             color: 'Brown',
//             price: 120,
//             image: "https://static.pullandbear.net/assets/public/f733/cba2/aadb43a68b07/26e535b0f8fa/03721505712-A7M/03721505712-A7M.jpg?ts=1769426200557&w=766&f=auto"

//         }
//     ],
//     totalPrice: 150
// }

const stripePromise = loadStripe('pk_test_51TYk4IDWnS44d1MnRljhpJsSJDGAeza1TNBrZPLAdcTHWOpgqNU7d1nworK7MhlDSESF5RAbVgjGCFYjy8M3ytP0002GDrDV6p');

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cart, loading, error } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [checkoutId, setCheckoutId] = useState(null);

    const [clientSecret, setClientSecret] = useState(null);

    const [shippingAddress, setShippingAddress] = useState({
        email: "user@example.com",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: ""
    })

    //Ensure cart is loaded before proceeding
    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate("/");
        }
    }, [cart, navigate]);


    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        if (cart && cart.products.length > 0) {
            const res = await dispatch(
                createCheckout({
                    checkoutItems: cart.products,
                    shippingAddress,
                    paymentMethod: "Stripe",
                    totalPrice: cart.totalPrice
                })
            );

            if (res.payload && res.payload.clientSecret) {
                setCheckoutId(res.payload.checkout._id);
                setClientSecret(res.payload.clientSecret); // حفظ المفتاح السري للدفع
            }

            // if (res.payload && res.payload._id) {
            // setCheckoutId(res.payload._id); //Set checkout ID if checkout was successful
            // }
        }
    }

    console.log(checkoutId);

    const handlePaymentSuccess = async (details) => {
        try {
            const response = await axios.put(`http://localhost:9000/api/checkout/${checkoutId}/pay`,
                {
                    paymentStatus: "paid",
                    paymentDetails: details
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )

            await handleFinalizeCheckout(checkoutId); //Finalize checkout if payment is successful
        } catch (error) {
            console.log(error);
        }
    }

    const handleFinalizeCheckout = async (checkoutId) => {
        try {
            const response = await axios.
                post(`http://localhost:9000/api/checkout/${checkoutId}/finalize`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("userToken")}`
                        }
                    }
                );
            navigate("/orderConfirmation");
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) return <p>Loading cart...</p>
    if (error) return <p>Error:{error}</p>
    if (!cart || !cart.products || cart.products.length === 0) {
        return <p>Your cart is empty</p>
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6'>
            {/* Left Section */}
            <div className='bg-white rounded-lg p-6'>
                <h2 className='text-2xl uppercase mb-6'>Checkout</h2>

                {!clientSecret ? (
                    <form onSubmit={handleCreateCheckout}>
                        <h3 className='text-lg mb-4'>Contact Details</h3>
                        <div className='mb-4'>
                            <label className='block text-gray-700'>Email</label>
                            <input type="email"
                                value={user ? user.email : shippingAddress.email}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>

                        <h3 className='text-xl'>Delivery</h3>
                        <div className='mb-4 grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-gray-600'>First Name</label>
                                <input type="text"
                                    value={shippingAddress.firstName}
                                    onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                                    className='w-full p-2 border rounded'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-gray-600'>Last Name</label>
                                <input type="text"
                                    value={shippingAddress.lastName}
                                    onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                                    className='w-full p-2 border rounded'
                                    required
                                />
                            </div>
                        </div>

                        <div className='mb-4'>
                            <label>Address</label>
                            <input type="text"
                                value={shippingAddress.address}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>

                        <div className='mb-4 grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-gray-600'>City</label>
                                <input type="text"
                                    value={shippingAddress.city}
                                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                    className='w-full p-2 border rounded'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-gray-600'>Postal Code</label>
                                <input type="text"
                                    value={shippingAddress.postalCode}
                                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                    className='w-full p-2 border rounded'
                                    required
                                />
                            </div>
                        </div>

                        <div className='mb-4'>
                            <label>Country</label>
                            <input type="text"
                                value={shippingAddress.country}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>

                        <div className='mb-4'>
                            <label>Phone</label>
                            <input type="text"
                                value={shippingAddress.phone}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                                className='w-full p-2 border rounded'
                                required
                            />
                        </div>

                        <div className='mt-6'>
                            <button type='submit' className='w-full py-2 bg-black text-white cursor-pointer rounded hover:bg-gray-800 transition'>
                                Continue to Payment
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className='mt-6'>
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <StripePaymentForm checkoutId={checkoutId} />
                        </Elements>
                    </div>
                )}
            </div>

            {/* Right Section */}
            <div className='bg-gray-100 p-6 rounded-lg h-fit'>
                <h2 className='pb-5 border-b border-gray-200 font-bold'>Order Summary</h2>
                {cart.products.map((product, index) => (
                    <div key={index}>
                        <div className='flex border-b border-gray-300 py-4 justify-between'>
                            <div className='flex items-start'>
                                <img src={product.image} alt={product.name} className='w-20 mr-3 rounded' />
                                <div className='flex flex-col'>
                                    <p className='font-bold'>{product.name}</p>
                                    <p className='text-sm text-gray-500'>Size: {product.size}</p>
                                    <p className='text-sm text-gray-500'>Color: {product.color}</p>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <span className='font-bold'>EGP {product.price}</span>
                            </div>
                        </div>
                    </div>
                ))}

                <div className='flex justify-between items-center text-lg mt-4 py-2'>
                    <p className='font-bold'>Subtotal</p>
                    <p className='font-semibold'>EGP {cart.totalPrice?.toLocaleString()}</p>
                </div>

                <div className='flex justify-between items-center text-lg mb-4'>
                    <p className='font-bold'>Shipping</p>
                    <p className='font-bold text-green-600'>Free</p>
                </div>

                <div className='flex justify-between items-center text-xl pt-4 border-t border-gray-300'>
                    <p className='font-bold'>Total</p>
                    <p className='font-bold text-black'>EGP {cart.totalPrice?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}

export default Checkout;