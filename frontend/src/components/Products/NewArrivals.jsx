import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react' // 1. استدعاء useRef
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const NewArrivals = () => {
    // 2. إنشاء المرجع (Ref)
    const scrollRef = useRef(null);

    // const newArrivals = [
    //     {
    //         _id: "1",
    //         name: "Shirt",
    //         price: 120,
    //         images: [{ url: "https://static.massimodutti.net/assets/public/668e/d606/f0524821b42a/f4eafa39f57b/01212208401-o6/01212208401-o6.jpg?ts=1774361602795&w=850&f=auto" }]
    //     },
    //     {
    //         _id: "2",
    //         name: "Polo",
    //         price: 180,
    //         images: [{ url: "https://static.massimodutti.net/assets/public/2e7e/2801/a5554bd9b148/44de36fbf33b/01181202401-o7/01181202401-o7.jpg?ts=1773396912102&w=850&f=auto" }]
    //     },
    //     {
    //         _id: "3",
    //         name: "Shirt",
    //         price: 190,
    //         images: [{ url: "https://static.massimodutti.net/assets/public/43cb/436d/a1b7494bbb1b/e0e62a0c771b/0193326340003-o7/0193326340003-o7.jpg?ts=1775663199439&w=1920&f=auto" }]
    //     },
    //     {
    //         _id: "4",
    //         name: "Shirt",
    //         price: 250,
    //         images: [{ url: "https://static.massimodutti.net/assets/public/2c06/762c/c4524c6b9fd6/34f070c92ef6/01995266428-o6/01995266428-o6.jpg?ts=1773662570618&w=1920&f=auto" }]
    //     },
    //     {
    //         _id: "5",
    //         name: "Polo Shirt",
    //         price: 280,
    //         images: [{ url: "https://static.massimodutti.net/assets/public/a36f/0a66/b893499ea0d3/b3ec8afbafe5/01249201401-o6/01249201401-o6.jpg?ts=1775554453185&w=1920&f=auto" }]
    //     },
    //     {
    //         _id: "6",
    //         name: "Polo",
    //         price: 210,
    //         images: [{ url: "https://static.massimodutti.net/assets/public/a36f/0a66/b893499ea0d3/b3ec8afbafe5/01249201401-o6/01249201401-o6.jpg?ts=1775554453185&w=1920&f=auto" }]
    //     }
    // ]


    const [newArrivals, setNewArrivals] = useState([]);

    const fetchNewArrivals = async () => {
        try {
            const res = await axios.get("http://localhost:9000/api/product/newArrivals");
            setNewArrivals(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchNewArrivals();
    }, [])


    // 3. دالة السكرول
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300; // مقدار الحركة بالبيكسل
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className='py-12'>
            <div className='container mx-auto text-center mb-10 relative'>
                <h2 className='text-3xl font-bold mb-4'>Explore New Arrivals</h2>
                <p className='text-lg text-gray-600 mb-8'>
                    Discover the latest styles straight off the runway, freshly added to
                    keep yur wordrobe on the cutting edge of fashion.
                </p>

                <div className='absolute right-0 bottom-[-30px] flex space-x-2 z-10'>
                    {/* 4. إضافة onClick للزراير */}
                    <button
                        onClick={() => scroll("left")}
                        className='p-2 rounded border bg-white text-black hover:bg-gray-100'
                    >
                        <FiChevronLeft className='text-2xl' />
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        className='p-2 rounded border bg-white text-black hover:bg-gray-100'
                    >
                        <FiChevronRight className='text-2xl' />
                    </button>
                </div>
            </div>

            {/* 5. إضافة ref للـ div و flex-shrink-0 للعناصر الداخيلة */}
            <div
                ref={scrollRef}
                className='container mx-auto overflow-x-auto flex space-x-6 relative scrollbar-hide'
            >
                {newArrivals?.map((product, index) => (
                    <div
                        key={index}
                        className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative flex-shrink-0'
                    >
                        <img
                            src={product.images[0]?.url}
                            alt={product.name}
                            className='w-full h-[500px] object-cover rounded-lg'
                        />
                        <div className='absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md text-white p-4 rounded-b-lg'>
                            <Link to={`/product/${product._id}`} className='block'>
                                <h4 className='font-medium'>{product.name}</h4>
                                <p className='mt-1'>${product.price}</p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default NewArrivals