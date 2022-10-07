import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * 
 * FetchbaseQuery replaces the conventional axios or fetch http request.
 * Retrieve token from the local storage.
 *
 * 
 */
//  const start = localStorage.getItem('startDate');

const token = localStorage.getItem("token");
/**
 * 
 * In React Toolkit Query , we call the hook 'createApi
 * createApi will take in arguments such as reducerPath: anyname to identity with,
 *  baseQuery:which is where you set base endpoint and reducers
 * 
 * 
 * 
 */
export const apiSlice = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({
    /**
     * 
     * 
     * Create an .env file to handle endpoints for production and development.
     * check utils file / folder
     * include in the .gitignore file
     * 
     * 
     * 
     */
    baseUrl: "http://localhost:5001/api/v1",
    // baseURL: "https://trms01-server.azurewebsites.net/api/v1/",
    //
    //

    prepareHeaders: (headers, { getState }) => {
      /**
       * 
       * Check if there is a token , if there is set header with the authorizations from the local storage.
       * 
       */
      if (token) {
        headers.set("token", `Bearer ${localStorage.getItem("token")}`);
      }
      return headers;
    },
  }),
  /**
   * Use a tag type to invalidate actions and data - payload once an action has been completed.
   * 
   */
  tagTypes: ["Report"],
  endpoints: (builder) => ({
    getReport: builder.query({
      query: (fy_quarter, fin_year) =>
        `report/quarterly/oands/${fy_quarter}/${fin_year}`,
      providesTags: ["Report"],
    }),
    getPipeline: builder.query({
      query: (financial_year) => `report/closed_deals/${financial_year}`,
      providesTags: ["Report"],
    }),
    getTopNReimbursible: builder.query({
      query: (topn, start, end) => `transaction/reimbursible/${topn}`,
      providesTags: ["Report"],
    }),
    
    /**
     * 
     * For any endpoint other than a get http request - use a builder.mutation
     * 
     */
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

/**
 * RTK Query comes with hooks ,
 * get requests ends with a query, post, put etc ends with a mutation.
 */
export const {
  useGetReportQuery,
  useGetPipelineQuery,
  useGetTopNReimbursibleQuery,
  useAddReportMutation,
  useUpdateReportMutation,
  useDeleteReportMutation,
  
  
} = apiSlice;
