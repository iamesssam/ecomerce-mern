import React, { useEffect, useState } from 'react'
import loginPic from "../assets/login.webp"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { mergeCart } from '../../redux/slices/cartSlice'


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    //Get redirect parameter and check if it's checkout or something
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user }))
                    .then(() => {
                        navigate(isCheckoutRedirect ? "/checkout" : "/")
                    })
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : "/")
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

    const handelSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    }


    return (
        <div className='flex flex-col md:flex-row min-h-screen items-center justify-center bg-gray-50'>

            {/* Left section (Form) - الفورم الآن أولاً ليظهر على اليسار */}
            <div className='flex flex-col justify-center items-center w-full md:w-1/2 p-6 md:p-16'>
                <div className='w-full max-w-md border border-gray-200 bg-white p-5 rounded-2xl shadow-sm'>
                    <div className='text-center'>
                        <h3 className='mb-4 font-bold text-xl tracking-tight text-black'>Rabbit</h3>
                        <h2 className='text-2xl font-bold mb-2'>Hey there! 👋🏻</h2>
                        <p className='text-gray-500 text-sm mb-8'>Enter your email and password to login.</p>
                    </div>

                    <form className='space-y-4' onSubmit={handelSubmit}>
                        <div className='flex flex-col'>
                            <label className='mb-1.5 font-semibold text-sm text-gray-700'>Email</label>
                            <input
                                type="email"
                                className='w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none py-2 px-3 transition-all'
                                placeholder='Enter your email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label className='mb-1.5 font-semibold text-sm text-gray-700'>Password</label>
                            <input
                                type="password"
                                className='w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none py-2 px-3 transition-all'
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className='w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-2 cursor-pointer'>
                            Sign In
                        </button>
                    </form>

                    <p className='text-center text-sm mt-6 text-gray-600'>
                        Don't have an account?
                        <Link to={`/register?direct=${encodeURIComponent(redirect)}`} className='text-blue-600 font-semibold hover:underline'>Register</Link>
                    </p>
                </div>
            </div>

            {/* Right section (Image) - الصورة ثانياً لتظهر على اليمين */}
            <div className='w-full md:w-1/2 h-[300px] md:h-screen'>
                <img
                    src={loginPic}
                    alt="Login Visual"
                    className='h-full w-full object-cover'
                />
            </div>

        </div>
    )
}

export default Login


