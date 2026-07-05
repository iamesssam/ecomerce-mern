import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//Helper Function to load cart from Localstorage 
// const loadCartFromLocalStorage = () => {
// const storedCart = localStorage.getItem('cart');
// return storedCart ? JSON.parse(storedCart) : { products: [] };
// };

const loadCartFromLocalStorage = () => {
    try {
        const storedCart = localStorage.getItem('cart');

        // لو الـ storage فاضي أو مخزن كلمة undefined بالخطأ، ارجع للقيمة المبدئية
        if (!storedCart || storedCart === "undefined") {
            return { products: [] };
        }

        return JSON.parse(storedCart);
    } catch (error) {
        console.error("Error parsing cart from localStorage", error);
        return { products: [] }; // حماية إضافية لو الـ JSON باظ لأي سبب
    }
};


//Helper function to save cart in localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//Fetch cart for user or a guest

export const fetchCart = createAsyncThunk("cart/fetchCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://ecomerce-mern-backend-8psi.onrender.com/api/cart`, {
                params: { userId, guestId },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
)


//Add an item to the cart for a user or guest 

export const addToCart = createAsyncThunk("cart/addToCart",
    async ({ productId, color, size, quantity, guestId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`https://ecomerce-mern-backend-8psi.onrender.com/api/cart`,
                { productId, color, size, quantity, guestId, userId });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);




//Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity",
    async ({
        productId, color, size,
        quantity, userId, guestId
    }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`https://ecomerce-mern-backend-8psi.onrender.com/api/cart`,
                {
                    productId, color, size,
                    quantity, userId, guestId
                }
            );
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.data);
        }
    }

)


//Remove an item from the cart
// export const removeFromCart = createAsyncThunk("cart/removeFromCart",
//     async ({
//         productId, color, size
//         , userId, guestId
//     }, { rejectWithValue }) => {
//         try {
//             const response = await axios.delete(`http://localhost:9000/api/cart`, {
//                 productId, color, size
//                 , userId, guestId
//             });
//             return response.data;
//         } catch (error) {
//             rejectWithValue(error.response.data);
//         }
//     })

export const removeFromCart = createAsyncThunk("cart/removeFromCart",
    async ({ productId, color, size, userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`https://ecomerce-mern-backend-8psi.onrender.com/api/cart`, {
                // في الـ DELETE لازم الداتا تكون جوه مفتاح اسمه data
                data: { productId, color, size, userId, guestId }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error removing item");
        }
    }
);

//Merge guest cart into user cart

export const mergeCart = createAsyncThunk("cart/mergeCart",
    async ({ guestId, user }, { rejectWithValue }) => {
        try {

            const response = await axios.post(`https://ecomerce-mern-backend-8psi.onrender.com/api/cart/merge`,
                { guestId, user },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    },
                }
            );

            return response.data;
        }
        catch (error) {
            rejectWithValue(error.response.data);
        }
    }
)


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromLocalStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            localStorage.removeItem('cart');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch cart!"
            })

            //handle add To Cart
            .addCase(addToCart.pending, (state) => {
                state.loading = false;
                state.error = null;
            })

            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add to cart"
            })

            //Handle update cart
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update item quantity";
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to remove item from cart"
            })


            //Handle merge cart
            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to merge cart"
            })
    }
})


export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;


