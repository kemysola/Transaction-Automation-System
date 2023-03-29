import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from './api/http-common'
export const apiServices = createApi({
    reducerPath: 'api', //optional....
    baseQuery: fetchBaseQuery({ axios}),
    tagTypes: ['Report'],
    endpoints: (builder) => ({})
});

//create extended slices for multiple features......