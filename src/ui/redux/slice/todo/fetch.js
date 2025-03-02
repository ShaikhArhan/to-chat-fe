import { createSlice } from "@reduxjs/toolkit";
import { fetch } from "../../thunk/todo/todo";

const initialState = {
    todoDataFetch: [],
    status: "idle",
    error: null
}

const todoFetchSlice = createSlice({
    name: "todoFetchSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetch.fulfilled, (state, action) => {
            state.todoDataFetch = action.payload
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

export default todoFetchSlice