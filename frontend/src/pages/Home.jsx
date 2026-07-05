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
                const res = await axios.get(`https://ecomerce-mern-backend-8psi.onrender.com/api/product/bestSeller`);
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
