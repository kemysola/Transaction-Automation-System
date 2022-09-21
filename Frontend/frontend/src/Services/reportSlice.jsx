import { createSlice} from "@reduxjs/toolkit";
const initialState = {
    items:[],
    status:null,
    error:null,
}
/**
 * SLICE CONTAINS THE LOGICS
 * 
 */
const reportSlice = createSlice({
    name:'reports',
    initialState,
    reducers:{
    },
})

export default reportSlice.reducer