import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../thunk/auth/auth";

const initialState = {
    loginData: null,
    status: "idle",
    error: null
}

const loginSlice = createSlice({
    name: "loginSlice",
    initialState,
    reducers: {
        resetlogin(state, action) {
            state.status = "";            
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state, action) => {                
                state.status = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loginData = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export const { resetlogin } = loginSlice.actions

export default loginSlice