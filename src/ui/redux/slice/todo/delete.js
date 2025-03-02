import { createSlice } from "@reduxjs/toolkit";
import { deleted } from "../../thunk/todo/todo";

const initialState = {
    todoDataDelete: [],
    status: "idle",
    error: null
}

const todoDeleteSlice = createSlice({
    name: 'todoDeleteSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleted.fulfilled, (state, action) => {
            state.todoDataDelete = action.payload;
            state.status = "succeeded";
            state.error = null;
        }).addCase(deleted.pending, (state, action) => {
            state.status = "loading";
            state.error = null;
        }).addCase(deleted.rejected, (state, action) => {
            state.status = "failed";
            state.error = "error";
        })
    }

})

export default todoDeleteSlice;