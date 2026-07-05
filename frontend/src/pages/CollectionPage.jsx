import React, { isValidElement, useEffect, useRef, useState } from 'react'
import { FiFilter } from 'react-icons/fi';
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../../redux/slices/productsSlice';

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    
    const queryParams = Object.fromEntries([...searchParams]);




    // const [products, setProducts] = useState([]);
    const sidebarRef = useRef();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }, [dispatch, collection, searchParams]);



    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleClickOutside = (e) => {
        //close sidebar if clicked outside
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])


    // useEffect(() => {

    //     const womenProducts = [
    //         {
    //             _id: 1,
    //             name: 'Short nylon jacket',
    //             price: 200,
    //             images: [{ url: 'https://static.pullandbear.net/assets/public/2338/d67b/9f9547c7b24c/dcf51e150752/03720363712-A7M/03720363712-A7M.jpg?ts=1773396713302&w=766&f=auto' }]
    //         },

    //         {
    //             _id: 2,
    //             name: 'Jacket with integrated collar',
    //             price: 320,
    //             images: [{ url: 'https://static.pullandbear.net/assets/public/fc12/1aa8/bbf541e9a99b/49b6a7eb50aa/0372030070700-A7M/0372030070700-A7M.jpg?ts=1769097603737&w=766&f=auto' }]
    //         },

    //         {
    //             _id: 3,
    //             name: 'Bardot soft faux sweater',
    //             price: 280,
    //             images: [{ url: 'https://static.pullandbear.net/assets/public/f4df/6424/2de0439fa92b/c8b8d2be9558/07550307803-M/07550307803-M.jpg?ts=1768562947008&w=766&f=auto' }]
    //         },

    //         {
    //             _id: 4,
    //             name: 'Ninety One hooded sweatshirt',
    //             price: 150,
    //             images: [{ url: 'https://static.pullandbear.net/assets/public/f50f/3ba1/316e46dca80d/4ba260aa8e74/07560364700-A4M/07560364700-A4M.jpg?ts=1762437551066&w=766&f=auto' }]
    //         },
    //     ]
    //     setProducts(womenProducts);
    // }, [])




    return (
        <div className='flex flex-col md:flex-row'>
            <button
                onClick={toggleSidebar}
                className='lg:hidden border p-2 flex justify-center items-center'>
                {/* Moile filter button */}
                <FiFilter />
            </button>

            {/* Filter Sidebar */}

            <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" :
                "-translate-x-full"} fixed inset-y-0 z-50 left-0 bg-white 
                w-64 overflow-y-auto transition-transform duration-300
                lg:static lg:translate-x-0
                `}>
                <FilterSidebar />
            </div>

            <div className='flex-grow p-4'>
                <h2 className='text-2xl uppercase mb-4'>
                    All Collection</h2>

                {/* Sort Options */}
                <SortOptions />

                {/* Product Grid */}
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    )
}

export default CollectionPage
