import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { clearCart } from '../../redux/slices/cartSlice';
import { fetchUserOrders } from '../../redux/slices/orderSlice';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchUserOrders())
    }, [dispatch]);



    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate("/login");
    }




    // const orders = [
    //     {
    //         _id: "12312312312312312312312345",
    //         image: "https://static.zara.net/assets/public/218a/0f73/cd104350835f/5c52e0ec0190/04302425800-p/04302425800-p.jpg?ts=1767776659795&w=1024",
    //         createdAt: "13/4/2026",
    //         shippingAddress: "New York, USA",
    //         items: 1,
    //         price: 50,
    //         status: "Processing"
    //     },
    //     {
    //         _id: "98765432109876543210987654",
    //         image: "https://static.zara.net/assets/public/2649/e4d7/9d384344ae9a/f96a058fa26a/01063240711-p/01063240711-p.jpg?ts=1772125028338&w=1024",
    //         createdAt: "14/4/2026",
    //         shippingAddress: "Kuwait City, KW",
    //         items: 2,
    //         price: 120,
    //         status: "Shipped"
    //     },
    //     {
    //         _id: "45645645645645645645645678",
    //         image: "https://static.zara.net/assets/public/8060/6956/be2a478ca7ec/60880177cfa5/08574610707-p/08574610707-p.jpg?ts=1772727463543&w=1024",
    //         createdAt: "15/4/2026",
    //         shippingAddress: "Cairo, Egypt",
    //         items: 3,
    //         price: 210,
    //         status: "Delivered"
    //     }
    // ];


    return (
        <div className='flex flex-col md:flex-row py-5 px-5 md:px-15 gap-8 bg-gray-50 min-h-screen'>

            {/* Left section - Profile Info */}
            <div className='bg-white shadow-lg w-full md:w-[350px] h-fit px-5 py-7 rounded-2xl'>
                <h2 className='font-bold text-2xl text-gray-900'>{user?.name}</h2>
                <p className='text-sm text-gray-700'>{user?.email}</p>
                <button className='bg-red-500 text-white w-full mt-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-red-600 transition-colors font-medium'
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            {/* Right section - Orders Table */}
            <div className='flex-1 bg-white p-4 md:p-7 rounded-2xl shadow-sm overflow-x-auto'>
                <h2 className='text-xl font-bold mb-5 text-gray-800'>My Orders</h2>

                <table className='w-full min-w-[800px] border-collapse'>
                    <thead>
                        <tr className='bg-gray-100 grid grid-cols-[0.5fr_2fr_1fr_1.5fr_0.5fr_0.5fr_1fr] items-center text-[10px] md:text-xs py-3 rounded-t-lg font-bold text-gray-600'>
                            <th className='text-center'>IMAGE</th>
                            <th className='text-left px-4'>ORDER ID</th>
                            <th className='text-center'>CREATED</th>
                            <th className='text-center'>ADDRESS</th>
                            <th className='text-center'>ITEMS</th>
                            <th className='text-center'>PRICE</th>
                            <th className='text-center'>STATUS</th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-gray-100'>
                        {orders?.length > 0 ? (
                            orders?.map((order) => (
                                <tr key={order._id} className='grid grid-cols-[0.5fr_2fr_1fr_1.5fr_0.5fr_0.5fr_1fr] items-center text-center py-4 text-sm hover:bg-gray-50 transition-all cursor-pointer'
                                    onClick={() => navigate(`/order/${order._id}`)}
                                >
                                    <td className='flex justify-center'>
                                        <img
                                            src={order.orderItems?.[0].image}
                                            alt="product"
                                            className='w-10 h-12 object-cover rounded shadow-sm'
                                        />
                                    </td>
                                    <td className='text-left px-4 truncate font-bold text-xs text-gray-950'>
                                        {order._id}
                                    </td>
                                    <td className='text-gray-600'>{order.createdAt}</td>
                                    {/* <td className='truncate px-2 text-gray-600'>{order?.shippingAddress}</td> */}
                                    <td className='text-gray-600'>{order.items}</td>
                                    <td className='font-bold text-gray-900'>${order?.orderItems?.[0].price}</td>
                                    <td>
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold 
                                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-orange-100 text-orange-600'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-gray-500 font-medium">
                                    You haven't placed any orders yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Profile
