import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = localStorage.getItem("token");
export const apiSlice = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({
    baseURL: "https://trms01-server.azurewebsites.net/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      if (token) {
        headers.set("token", `Bearer ${localStorage.getItem("token")}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Report"],
  endpoints: (builder) => ({
    getReport: builder.query({
      query: (fy_quarter, fin_year) => ({
        url: `report/quarterly/oands/${fy_quarter}/${fin_year}`,
        responseHandler: (response) => response.json() || response.text,
        staleTime: 1000 * 20,
      }),
      providesTags: ["Report"],
    }),
    getPipeline: builder.query({
      query: (financial_year) => ({
        url: `report/closed_deals/${financial_year}`,
        responseHandler: (response) => response.json() || response.text,
        staleTime: 1000 * 20,
      }),
      providesTags: ["Report"],
    }),

    getAllClosedDeals: builder.query({
      query: () => ({
        url: `report/all/closed_deals`,
        responseHandler: (response) => response.json() || response.text,
        staleTime: 1000 * 20,
      }),
      providesTags: ["Report"],
    }),
    getTopNReimbursible: builder.query({
      query: (topn, start, end) => ({
        url: `transaction/reimbursible/${topn}`,
        responseHandler: (response) => response.json() || response.text,
        staleTime: 1000 * 20,
      }),
      providesTags: ["Report"],
    }),
    getAllTransaction: builder.query({
      query: (fin_year) => ({
        url: `transaction/portfolio/${fin_year}`,
        responseHandler: (response) => response.json(),
        staleTime: 1000 * 20,
      }),
      providesTags: ["Report"],
    }),
    getAllAdminFy: builder.query({
      query: (target_year) => ({
        url: `admin/fy/${target_year}`,
        responseHandler: (response) => response.json() || response.text,
        transformResponse: (response, meta, arg) => response.data,

        staleTime: 1000 * 20,
      }),
      providesTags: ["Report"],
    }),

    addReport: builder.mutation({
      query: (report) => ({
        url: "report/quarterly/oands",
        method: "POST",
        body: report,
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
      }),
      invalidatesTags: ["Report"],
    }),

    updateReport: builder.mutation({
      query: (report) => ({
        url: `//${report.id}`,
        method: "PATCH",
        body: report,
      }),
      invalidatesTags: ["Report"],
    }),

    deleteReport: builder.mutation({
      query: ({ id }) => ({
        url: `/report/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Report"],
    }),
  }),
});

export const {
  useGetReportQuery,
  useGetPipelineQuery,
  useGetAllClosedDealsQuery,
  useGetTopNReimbursibleQuery,
  useAddReportMutation,
  useUpdateReportMutation,
  useDeleteReportMutation,
  useGetAllTransactionQuery,
  useGetAllAdminFyQuery,
} = apiSlice;
