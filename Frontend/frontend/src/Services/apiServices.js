import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiServices = createApi({
    reducerPath:'productApi',
    baseQuery: fetchBaseQuery(
        {baseURL: "http://localhost:5001/api/v1/",
        // baseURL: "https://trms01-server.azurewebsites.net/api/v1/",
        headers: {
            token: `Bearer ${localStorage.getItem('token')}`,
            'Content-type': 'application/json; charset=utf-8',
          }
    }),
    endpoints:(builder)=> ({
        getAlReport:builder.query({
            query:() =>'report'
        })

    })
})



export const {useGetAllReportQuery} = apiServices;