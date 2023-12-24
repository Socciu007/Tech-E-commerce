import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice.js';
import userReducer from './slices/userSlice.js';

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer
  },
})
