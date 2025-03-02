import { createSlice } from "@reduxjs/toolkit";
import { edit } from "../../thunk/todo/todo";


const initialState = {
    todoDataEdit: [],
    status: "idle",
    error: null
}

const todoEditSlice = createSlice({
    name: 'todoEditSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(edit.fulfilled, (state, action) => {
            state.todoDataEdit = action.payload;
            state.status = "succeeded";
            state.error = null;
        }).addCase(edit.pending, (state, action) => {
            state.status = "loading";
            state.error = null;
        }).addCase(edit.rejected, (state, action) => {
            state.status = "failed";
            state.error = "error";
        })
    }

})

export default todoEditSlice;