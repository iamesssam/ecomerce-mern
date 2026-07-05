import React, { useEffect, useState } from 'react'
// import shirt from "../../assets/05755438800-a1.jpg"
// import cardigan from "../../assets/09598418712-p.jpg"
import { toast } from 'sonner'
import ProductGrid from './ProductGrid'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsDetails, fetchSimilarProducts } from '../../../redux/slices/productsSlice'
import { addToCart } from '../../../redux/slices/cartSlice';
// const selectedProduct1 = {
//     name: "RELAXED FIT KNIT T-SHIRT",
//     price: 120,
//     originalPrice: 150,
//     description: 'This is a stylish Polo for any occasion',
//     brand: 'massimo dutti',
//     material: 'Cotton',
//     sizes: ["S", "M", "L", "XL"],
//     colors: ['brown', 'Black'],
//     images: [
//         {
//             url: 'https://static.zara.net/assets/public/0752/d74c/015d4e33a4a7/c21c8de44ac8/00526410716-p/00526410716-p.jpg?ts=1766134017363&w=1430'
//         },
//         {
//             url: 'https://static.zara.net/assets/public/3ae7/7641/3119479dab12/fb02446d0de9/05755438800-a1/05755438800-a1.jpg?ts=1774962797723&w=1430'
//         }
//     ]
// }


// const similarProducts = [
//     {
//         _id: 1,
//         name: 'Product 1',
//         price: 100,
//         images: [{ url: 'https://static.pullandbear.net/assets/public/937e/487e/c2064cf88e56/36a898bb265f/03540524800-M/03540524800-M.jpg?ts=1772617578060&w=766&f=auto' }]
//     },

//     {
//         _id: 2,
//         name: 'Brown bomber jacket',
//         price: 110,
//         images: [{ url: 'https://static.pullandbear.net/assets/public/daf3/38a4/1dbc4c899235/9d4f617ddc28/03721503700-M/03721503700-M.jpg?ts=1768219095957&w=766&f=auto' }]
//     },

//     {
//         _id: 3,
//         name: 'embroidered striped shirt',
//         price: 120,
//         images: [{ url: 'https://static.pullandbear.net/assets/public/3509/70ab/00784a09a25e/e5544bd207d6/03460501712-M/03460501712-M.jpg?ts=1764173319892&w=766&f=auto' }]
//     },

//     {
//         _id: 4,
//         name: 'Short-sleeved sweater',
//         price: 150,
//         images: [{ url: 'https://static.pullandbear.net/assets/public/3aba/8647/256b4b80b25c/3b825018ed34/03540524064-M/03540524064-M.jpg?ts=1772617597824&w=766&f=auto' }]
//     },

// ]




const ProductDetails = ({ productId }) => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const { selectedProduct, loading, error, similarProducts } = useSelector(
        (state) => state.products
    )

    const { user, guestId } = useSelector((state) => state.auth);

    const [selectedPhoto, setSelectedPhoto] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const productFetchId = productId || id;


    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductsDetails(productFetchId));
            dispatch(fetchSimilarProducts({ id: productFetchId }));
        }
    }, [dispatch, productFetchId]);



    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setSelectedPhoto(selectedProduct.images[0].url)
        }
    }, [selectedProduct])

    const handleQuantityChange = (action) => {
        if (action === "plus") {
            setQuantity((prev) => prev + 1)
        } else if (action === "minus" && quantity > 1) {
            setQuantity((prev) => prev - 1)

        }
    }


    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            toast.error("Please select a size and a color before adding to cart", {
                duration: 1000
            });
            return;
        }

        setIsButtonDisabled(true);

        dispatch(
            addToCart({
                productId: productFetchId,
                quantity,
                size: selectedSize,
                color: selectedColor,
                guestId,
                userId: user?._id
            })
        ).then(() => {
            toast.success("Product added to cart!", {
                duration: 1000
            });
        })
            .finally(() => {
                setIsButtonDisabled(false)
            })
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }


    return (
        <div className='p-6'>
            {selectedProduct && (

                <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                    <div className='flex flex-col md:flex-row'>

                        {/* Left */}
                        <div className='hidden md:flex flex-col space-x-4 mr-5'>
                            {selectedProduct.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url} alt=""
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer mb-3
                                    ${selectedPhoto === image.url ? "border border-black" : "border-gray-300"}
                                    `}
                                    onClick={() => setSelectedPhoto(image.url)}
                                />
                            ))}
                        </div>

                        {/* center */}
                        <div className='md:w-1/2'>
                            <div className='mb-4'>
                                <img src={selectedPhoto} alt=""
                                    className={`h-auto w-full 
                                object-cover
                                rounded-lg`} />
                            </div>
                        </div>

                        {/* Mobile */}
                        <div className='md:hidden flex space-x-4 mb-4'>
                            {selectedProduct.images.map((image, index) => (
                                <img src={image.url} alt=""
                                    key={index}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer mb-3
                                    ${selectedPhoto === image.url ? "border-black" : "border-gray-300"}
                                    `}
                                    onClick={() => setSelectedPhoto(image.url)} />
                            ))}
                        </div>


                        {/* right */}
                        <div className='md:w-1/2 md:ml-10'>
                            <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
                                {selectedProduct.name}
                            </h1>

                            <p className='text-lg text-gray-600 mb-1 line-through'>
                                {selectedProduct.originalPrice
                                    &&
                                    `${selectedProduct.originalPrice}`
                                }
                            </p>
                            <p className='text-xl text-gray-500 mb-2'>$ {selectedProduct.price}</p>
                            <p className='text-gray-600 mb-4'>{selectedProduct.description}</p>

                            <div className='mb-4'>
                                <p className='text-gray-700'>Color:</p>
                                <div className='flex gap-2 mt-2'>
                                    {selectedProduct.colors.map((color, index) => (
                                        <button key={index}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-full cursor-pointer border
                                            ${selectedColor === color ?
                                                    "border-3 border-black" : "border-gray-300"}
                                            `}
                                            style={{ backgroundColor: color.toLocaleLowerCase() }}
                                        ></button>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className='mb-4'>
                                <p className='text-gray-700'>Size:</p>
                                <div className='flex gap-2 mt-2'>
                                    {selectedProduct.sizes.map((size, index) => (
                                        <p className={`border border-gray-200 
                                py-1 px-3 cursor-pointer ${selectedSize === size ?
                                                "bg-black text-white"
                                                : ""} `}
                                            onClick={() => setSelectedSize(size)} key={index}>
                                            {size}</p>
                                    ))}
                                </div>
                            </div>

                            <div className='mb-6'>
                                <p className='text-gray-700'>Quantity:</p>
                                <div className='flex items-center space-x-4 mt-2'>
                                    <button className='px-2 py-1 bg-gray-200 rounded text-lg
                                cursor-pointer
                                ' onClick={() => handleQuantityChange("minus")}>
                                        -
                                    </button>
                                    <span className='text-lg'>{quantity}</span>
                                    <button className='px-2 py-1 bg-gray-200 rounded text-lg
                                cursor-pointer
                                ' onClick={() => handleQuantityChange("plus")}>
                                        +
                                    </button>
                                </div>
                            </div>

                            <button className={`bg-black text-white py-2 
                        px-6 rounded w-full mb-4 cursor-pointer 
                        ${isButtonDisabled ? "cursor-not-allowed opacity-50" :
                                    "hover:bg-gray-900"}
                        `}
                                onClick={() => handleAddToCart()}
                                disabled={isButtonDisabled}
                            >
                                {isButtonDisabled ? "Adding...." : "ADD TO CART"}
                            </button>

                            <div className='mt-10 text-gray-700'>
                                <h3 className='text-xl font-bold mb-4'>
                                    Characteristics:
                                </h3>
                                <table className='w-full text-left text-sm to-gray-700'>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'>Brand</td>
                                            <td className='py-1'>{selectedProduct.brand}</td>
                                        </tr>

                                        <tr>
                                            <td className='py-1'>Material</td>
                                            <td className='py-1'>{selectedProduct.material}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className='mt-20'>
                        <h2 className='text-2xl text-center font-medium mb-4'>
                            You May Also Like</h2>
                        <ProductGrid products={similarProducts} loading={loading} error={error} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetails
