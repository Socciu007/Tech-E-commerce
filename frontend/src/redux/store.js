import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice.js';
import userReducer from './slices/userSlice.js';
import orderReducer from './slices/orderSlide.js';

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    order: orderReducer
  },
})
