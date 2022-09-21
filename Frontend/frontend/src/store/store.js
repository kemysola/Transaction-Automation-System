import { configureStore } from '@reduxjs/toolkit';
// import productReducer, { productsFetch } from '../features/products/productSlice';
// import { productApi } from '../features/products/productApi';
// import cartReducer from '../features/cart/cartSlice';
// import reportReducer from '../Services/reportSlice'
import { apiSlice } from '../Services/apiSlice';

export const store = configureStore({
  reducer: {
    // cart:cartReducer,
    [apiSlice.reducerPath]:apiSlice.reducer,

  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(apiSlice.middleware)

  
});

// store.dispatch(productsFetch())