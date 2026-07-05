import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//async thunk to fetch admin products 
export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchProducts",
    async () => {
        const response = await axios.get(`http://localhost:9000/api/admin/products`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return response.data;
    }
)


//async function to create a new product
export const createProduct = createAsyncThunk("adminProducts/createProducts",
    async (productData) => {
        const response = await axios.post(`http://localhost:9000/api/product/createProduct`,
            productData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return response.data;
    }
)


//async thunk to update an existing product

export const updateProduct = createAsyncThunk("adminProducts/updateProdut",
    async ({ id, productData }) => {
        const response = await axios.put(`http://localhost:9000/api/product/${id}`,
            productData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return response.data;
    })


//async thunk to delete a product
export const deleteProduct = createAsyncThunk("adminProducts/deleteProduct",
    async (id) => {
        const response = await axios.delete(`http://localhost:9000/api/product/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return id;
    })



const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = false;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            //Create product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })

            //Update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(
                    (product) => product._id === action.payload._id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            //Delete product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products =
                    state.products.filter((product) => product._id !== action.payload);
            })
    }
})



export default adminProductSlice.reducer;
