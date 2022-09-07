import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { apiSlice } from "../api/apiSlice";

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/report',
            transformResponse: responseData => {
                const loadedPosts = responseData.map(report => {
                    return report;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                { type: 'Report', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Report', id }))
            ]
        }),
        getReportByUserId: builder.query({
            query: id => `/report/?userId=${id}`,
            transformResponse: responseData => {
                const loadedPosts = responseData.map(report => {
                    return report;
                });
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({ type: 'report', id }))
            ]
        }),
        addNewReport: builder.mutation({
            query: initialPost => ({
                url: '/report',
                method: 'POST',
                body: {
                    ...initialPost,
                    data:'',
                    data1 : "",
                    data2:""
                    }
                }
            }),
            invalidatesTags: [
                { type: 'Report', id: "LIST" }
            ]
        }),


        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/report/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    data:''
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Report', id: arg.id }
            ]
        }),

        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/report/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Report', id: arg.id }
            ]
        }),


        addReaction: builder.mutation({
            query: ({ postId, reactions }) => ({
                url: `posts/${postId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions }
            }),
            async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const post = draft.entities[postId]
                        if (post) post.reactions = reactions
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        })
    })


export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation
} = extendedApiSlice



// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select()

// Creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)