import React, { useState } from 'react'

const EditProductPage = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(1);
    const [sku, setSku] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [collections, setCollections] = useState("");
    const [material, setMaterial] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, description, price, countInStock, sku, sizes, colors, image);

    }

    return (
        <div className='max-w-5xl p-6 mx-auto container
         border border-gray-200 shadow-md rounded-md'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-3xl font-bold mb-5'>Edit Product</h1>
                <div className='flex flex-col mb-5'>
                    <label className='font-semibold mb-2'>Product Name</label>
                    <input type="text"
                        className='w-full border border-gray-300 py-1 rounded focus:outline-none'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label className='font-semibold mb-2'>Description</label>
                    <textarea name="" id=""
                        className='w-full border border-gray-300 py-1 rounded'
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>
                </div>

                <div className='flex flex-col mb-5'>
                    <label className='font-semibold mb-2'>Price</label>
                    <input type="number"
                        className='w-full border border-gray-300 py-1 rounded focus:outline-none'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label className='font-semibold mb-2'>Count in Stock</label>
                    <input type="number"
                        className='w-full border border-gray-300 py-1 rounded focus:outline-none'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label className='font-semibold mb-2'>SKU</label>
                    <input type="text"
                        className='w-full border border-gray-300 py-1 rounded focus:outline-none'
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                    />
                </div>

                {/* <div className='flex flex-col mb-5'>
                    <label className='font-semibold mb-2'>Sizes (comma-seperated)</label>
                    <input type="text"
                        className='w-full border border-gray-300 py-1 rounded focus:outline-none'
                        value={sizes.join(", ")}
                        onChange={(e) => setSizes(e.target.value.s.split(",").map((size) => size.trime()))}
                    />
                </div>

                <div className='flex flex-col mb-5'>
                    <label className='font-semibold mb-2'>Colors (comma-seperated)</label>
                    <input type="number"
                        className='w-full border border-gray-300 py-1 rounded focus:outline-none' />
                </div> */}

                {/* Sizes Section */}
                <div className='flex flex-col mb-5'>
                    <label className='font-semibold mb-2'>Sizes (comma-separated)</label>
                    <input
                        type="text"
                        className='w-full border border-gray-300 py-1 rounded focus:outline-none'
                        placeholder="S, M, L, XL"
                        // بنعرض المصفوفة كنص مفصول بفاصلة
                        value={sizes.join(", ")}
                        // بنحول النص لمصفوفة ونشيل المسافات الزيادة حول كل كلمة
                        onChange={(e) => setSizes(e.target.value.split(",").map((size) => size.trim()))}
                    />
                </div>

                {/* Colors Section */}
                <div className='flex flex-col mb-5'>
                    <label className='font-semibold mb-2'>Colors (comma-separated)</label>
                    <input
                        type="text" // غيرناها لـ text بدل number
                        className='w-full border border-gray-300 py-1 rounded focus:outline-none'
                        placeholder="Red, Blue, Black"
                        value={colors.join(", ")}
                        onChange={(e) => setColors(e.target.value.split(",").map((color) => color.trim()))}
                    />
                </div>

                {/* Image Upload */}
                <div className='mb-6'>
                    <label className='font-semibold mb-2 block'>Upload Image</label>
                    <input type="file"
                        // className='w-fit border border-gray-300 py-1 rounded focus:outline-none'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                <button
                    className='py-1 text-center bg-green-500 text-white w-full rounded
                    cursor-pointer mt-3 hover:bg-green-600
                    '>
                    Update Product</button>

            </form>
        </div>
    )
}

export default EditProductPage
