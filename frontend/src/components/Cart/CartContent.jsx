
import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCartItemQuantity } from '../../../redux/slices/cartSlice';

const CartContent = ({ cart, userId, guestId }) => {
    const dispatch = useDispatch();

    // دالة التعامل مع زيادة أو نقصان الكمية
    const handleQuantityChange = (productId, delta, quantity, size, color) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            dispatch(
                updateCartItemQuantity({
                    productId,
                    quantity: newQuantity,
                    guestId,
                    userId,
                    size,
                    color,
                })
            )
        }
    };

    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(removeFromCart({
            productId,
            color,
            size,
            userId,
            guestId
        }));
    };

    return (
        <div>
            {cart.products.map((item, index) => (
                <div key={index} className='flex items-start justify-between py-4 border-b border-b-gray-300'>
                    <div className='flex items-start'>
                        <img src={item.image} alt={item.name} className='w-20 h-24 object-cover rounded mr-4' />
                        <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className='text-sm text-gray-500'>
                                Size: {item.size} | Color: {item.color || item.Color}
                            </p>

                            <div className='flex items-center mt-2'>
                                {/* زرار الناقص */}
                                <button
                                    className='border rounded px-2 py-1 text-xl font-medium cursor-pointer hover:bg-gray-100'
                                    onClick={() => handleQuantityChange(
                                        item.productId,
                                        -1,
                                        item.quantity,
                                        item.size,
                                        item.color || item.Color
                                    )}
                                >
                                    -
                                </button>

                                <span className='mx-4'>{item.quantity}</span>

                                {/* زرار الزائد */}
                                <button
                                    className='border rounded px-2 py-1 text-xl font-medium cursor-pointer hover:bg-gray-100'
                                    onClick={() => handleQuantityChange(
                                        item.productId,
                                        1,
                                        item.quantity,
                                        item.size,
                                        item.color || item.Color
                                    )}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-end gap-3'>
                        <p className="font-semibold">$ {item.price.toLocaleString()}</p>
                        <button
                            onClick={() => handleRemoveFromCart(
                                item.productId,
                                item.size,
                                item.color || item.Color
                            )}
                            className='cursor-pointer p-1 hover:bg-red-50 rounded transition'
                        >
                            <RiDeleteBin3Line className='w-6 h-6 text-red-600' />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartContent;
