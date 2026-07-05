import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrivals from '../components/Products/NewArrivals'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from '../../redux/slices/productsSlice'
import axios from 'axios'

// const womenProducts = [
//     {
//         _id: 1,
//         name: 'Short nylon jacket',
//         price: 200,
//         images: [{ url: 'https://static.pullandbear.net/assets/public/2338/d67b/9f9547c7b24c/dcf51e150752/03720363712-A7M/03720363712-A7M.jpg?ts=1773396713302&w=766&f=auto' }]
//     },

//     {
//         _id: 2,
//         name: 'Jacket with integrated collar',
//         price: 320,
//         images: [{ url: 'https://static.pullandbear.net/assets/public/fc12/1aa8/bbf541e9a99b/49b6a7eb50aa/0372030070700-A7M/0372030070700-A7M.jpg?ts=1769097603737&w=766&f=auto' }]
//     },

//     {
//         _id: 3,
//         name: 'Bardot soft faux sweater',
//         price: 280,
//         images: [{ url: 'https://static.pullandbear.net/assets/public/f4df/6424/2de0439fa92b/c8b8d2be9558/07550307803-M/07550307803-M.jpg?ts=1768562947008&w=766&f=auto' }]
//     },

//     {
//         _id: 4,
//         name: 'Ninety One hooded sweatshirt',
//         price: 150,
//         images: [{ url: 'https://static.pullandbear.net/assets/public/f50f/3ba1/316e46dca80d/4ba260aa8e74/07560364700-A4M/07560364700-A4M.jpg?ts=1762437551066&w=766&f=auto' }]
//     },
// ]



const Home = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    const [bestSellerProduct, setBestSellerProduct] = useState(null);

    useEffect(() => {

        //Fetch products for a specific collection
        dispatch(
            fetchProductsByFilters({
                gender: "Women",
                category: "Bottom Wear",
                limit: 8
            }));
        // Fetch best seller product
        const fetchBestSeller = async () => {
            try {
                const res = await axios.get(`http://localhost:9000/api/product/bestSeller`);
                setBestSellerProduct(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchBestSeller();
    }, [dispatch]);

    return (
        <div>
            <Hero />
            <GenderCollectionSection />
            <NewArrivals />

            {/* Best Seller */}
            <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
            {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />) : (
                <p className='text-center'>Loading best seller product...</p>
            )}

            <div className='mx-auto container'>
                <h2 className='text-3xl text-center font-bold mb-4'>
                    Top Wears for Women
                </h2>
                <ProductGrid products={products} loading={loading} error={error} />
            </div>

            <div className='mt-20'>
                <FeaturedCollection />
                <FeaturesSection />
            </div>
        </div>
    )
}

export default Home
