import { createSlice ,createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit";
import axios from "axios";

/**
 * 
 * 
 */
const initialState = {
    items:[],
    status:null,
    error:null,
}

// export const productsFetch = createAsyncThunk(
//     "product/productsFetch",
//      () => {
//             const response = axios.get('https://fakestoreapi.com/products')
//             return response;     
//     }
// )
/**
 * SLICE CONTAINS THE LOGICS
 * 
 */
const reportSlice = createSlice({
    name:'reports',
    initialState,
    reducers:{
    },
    // extraReducers:{
    //     [productsFetch.pending] :(state,action) => {state.status = "pending"},
    //     [productsFetch.fulfilled]: (state, action) => {
    //         state.status ="success";
    //         state.items = action.payload.data;
    //     },
    //     [productsFetch.rejected]:(state, action) => {
    //         state.status ="rejected";
    //         state.error = action.error.message
    //     },
    // }

})

export default reportSlice.reducer