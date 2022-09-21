import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const token = localStorage.getItem('token');

export const apiSlice = createApi({
    reducerPath: 'reportApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api/v1',
    prepareHeaders: (headers, { getState }) => {
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
          headers.set('token', 
          `Bearer ${localStorage.getItem('token')}`)
        }
        return headers
      },
 }),
    tagTypes: ['Report'],
    endpoints: (builder) => ({
        getReport: builder.query({
            query: () => 'admin/fy/current',
            // transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['Report']
        }),
        addReport: builder.mutation({
            query: (report) => ({
                url: '/',
                method: 'POST',
                body: report
            }),
            invalidatesTags: ['Report']
        }),
        updateReport: builder.mutation({
            query: (report) => ({
                url: `//${report.id}`,
                method: 'PATCH',
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
} = apiSlice