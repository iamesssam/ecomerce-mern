import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cartSlice';

// const checkout = {
//     _id: "12323",
//     createdAt: new Date(),
//     checkoutItems: [
//         {
//             productId: "1",
//             name: "Jacket",
//             color: "black",
//             size: "M",
//             price: 150,
//             quantity: 1,
//             image: "https://static.pullandbear.net/assets/public/f733/cba2/aadb43a68b07/26e535b0f8fa/03721505712-A7M/03721505712-A7M.jpg?ts=1769426200557&w=766&f=auto"
//         },
//         {
//             name: 'Stylish T-Shirt',
//             size: 'L',
//             color: 'White',
//             price: 120,
//             image: "https://static.pullandbear.net/assets/public/ea6a/8eee/62a143939925/f6a6c2021def/03231538251-M/03231538251-M.jpg?ts=1775728889117&w=766&f=auto"

//         },
//     ],

//     shippingAddress: {
//         address: "21 wall street",
//         city: "New York",
//         country: "USA"
//     }
// }




const OrderConfirmationPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state) => state.checkout);

    useEffect(() => {
        if (checkout && checkout._id) {
            dispatch(clearCart());
            localStorage.removeItem("cart");
        } else {
            navigate("/profile");
        }
    }, [checkout, dispatch, navigate]);

    const calculateEstimatedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10); //Add 10 days to the order date
        return orderDate.toLocaleDateString();
    }


    return (
        <div className='max-w-4xl mx-auto p-6 bg-white'>
            <h1 className='text-4xl font-bold text-emerald-700 mb-8 text-center'>
                Thank You for Your Purchase</h1>

            {
                checkout &&
                (

                    <div className='p-6 rounded-lg border'>
                        <div className='flex justify-between mb-20'>
                            {/* Order Id and Date */}
                            <div>
                                <h2 className='text-xl font-semibold'>
                                    Order ID: {checkout?._id}
                                </h2>
                                <p className='text-gray-500 '>
                                    Order Date: {new Date(checkout?.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Estimated Delivery */}
                            <div>
                                <p className='text-emerald-700 text-sm'>
                                    Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
                                </p>
                            </div>
                        </div>

                        {/* Ordered Items */}
                        <div className='mb-20'>
                            {checkout.checkoutItems.map((item) => (
                                <div key={item.productId} className='flex items-center mb-4'>
                                    <img src={item.image}
                                        alt=""
                                        className='w-16 h-16 object-cover rounded-md mr-4'
                                    />

                                    <div>
                                        <h4 className='text-md font-semibold'>{item.name}</h4>
                                        <p className='text-sm to-gray-500'>
                                            {item.color} | {item.size}
                                        </p>
                                    </div>
                                    <div className='ml-auto text-right'>
                                        <p className='text-md'>EGP{item.price}</p>
                                        <p className='text-gray-500 text-sm'>
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Payment and Delivery Info */}
                        <div className='grid grid-cols-2 gap-8'>
                            <div>
                                <h4 className='text-lg font-semibold mb-2'>Payment</h4>
                                <p className='text-gray-600'>Stripe</p>
                            </div>

                            {/* Delivery Info */}
                            <div>
                                <h4 className='text-lg font-semibold mb-2'>Delivery</h4>
                                <p className='text-gray-600'>
                                    {checkout.shippingAddress.address}
                                </p>
                                <p className='text-gray-600'>
                                    {checkout.shippingAddress.city}, {" "}
                                    {checkout.shippingAddress.country}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
        </div >
    )
}

export default OrderConfirmationPage
