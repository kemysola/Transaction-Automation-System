import { configureStore } from '@reduxjs/toolkit'
import { apiServices } from '../Services/apiServices'
export const store = configureStore({
  reducer: {
      [apiServices.reducerPath]: apiServices.reducer
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiServices.middleware),
  devTools: true
})

