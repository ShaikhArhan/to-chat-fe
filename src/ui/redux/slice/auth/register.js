import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../thunk/auth/auth";

const initialState = {
    registerData: null,
    status: "idle",
    error: null
}

const registerSlice = createSlice({
    name: "registerSlice",
    initialState,
    reducers: {
        resetregister(state, action) {
            state.status = "";            
        }
    },
    extraReducers(builder) {
        builder
            .addCase(register.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.registerData = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export const { resetregister } = registerSlice.actions

export default registerSlice