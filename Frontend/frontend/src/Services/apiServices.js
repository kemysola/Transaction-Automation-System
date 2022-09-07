import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from '../http-common'
export const apiServices = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ axios}),
    tagTypes: ['Report'],
    endpoints: (builder) => ({
        getReport: builder.query({
            query: () => 'transaction/all_deals',
            // transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['Report']
        }),
        addReport: builder.mutation({
            query: (report) => ({
                url: '/report',
                method: 'POST',
                body: report
            }),
            invalidatesTags: ['Report']
        }),
        updateReport: builder.mutation({
            query: (report) => ({
                url: `/report/${report.id}`,
                method: 'PUT',
                body: report
            }),
            invalidatesTags: ['Report']
        }),
        deleteReport: builder.mutation({
            query: ({ id }) => ({
                url: `/report/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Report']
        }),
    })
})

export const {
    useGetReportQuery,
    useAddReportMutation,
    useUpdateReportMutation,
    useDeleteReportMutation
} = apiServices