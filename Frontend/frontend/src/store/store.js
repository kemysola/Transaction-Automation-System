import { setupListeners } from '@reduxjs/toolkit/query'
import { configureStore } from '@reduxjs/toolkit'
import { apiServices } from '../Services/apiServices'
export const store = configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [apiServices.reducerPath]: apiServices.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiServices.middleware),
  })

  setupListeners(store.dispatch)

