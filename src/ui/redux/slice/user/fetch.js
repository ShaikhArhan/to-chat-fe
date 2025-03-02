import { createSlice } from "@reduxjs/toolkit";
import { fetch } from "../../thunk/user/user";

const initialState = {
    userDataFetch: [],
    status: "idle",
    error: null
}

const userFetchSlice = createSlice({
    name: "userFetchSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetch.fulfilled, (state, action) => {
            state.userDataFetch = action.payload
            state.status = "successfully"
            state.error=null;
        }).addCase(fetch.pending, (state, action) => {
            state.status = "pending"
        }).addCase(fetch.rejected,(state, action)=>{
            state.status = "failed"
            state.error = "error"
        })
    }
})

export default userFetchSlice