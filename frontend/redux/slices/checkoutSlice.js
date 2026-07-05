import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//Async Thunk to create a checkout session

// checkoutItems, shippingAddress, paymentMethod, totalPrice

export const createCheckout = createAsyncThunk(
    "checkout/createCheckout",
    async (checkoutData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `https://ecomerce-mern-backend-8psi.onrender.com/api/checkout`,
                checkoutData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);


const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCheckout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckout.fulfilled, (state, action) => {
                state.loading = false;
                state.checkout = action.payload.checkout;
            })
            .addCase(createCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
})


export default checkoutSlice.reducer;

