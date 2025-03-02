import { createSlice } from "@reduxjs/toolkit";
import { add } from "../../thunk/todo/todo";


const initialState = {
    todoDataAdd: [],
    status: "idle",
    error: null
}

const todoAddSlice = createSlice({
    name: "todoAddSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(add.fulfilled, (state, action) => {
            state.todoDataAdd = action.payload
            state.status = "successfully"
            state.error=null;
        }).addCase(add.pending, (state, action) => {
            state.status = "pending"
        }).addCase(add.rejected, (state, action) => {
            state.status = "failed"
            state.error = "error"
        })
    }
})

export default todoAddSlice