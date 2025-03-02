import { createSlice } from "@reduxjs/toolkit";
import { verifyUser } from "../../thunk/auth/auth";

const initialState = {
    token: JSON.parse(localStorage.getItem("token")),
    login: null,
    register: null,
    status: "idle",
    error: null
};

const verificationSlice = createSlice({
    name: "verification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(verifyUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.login = action.payload?.success;
                state.register = action.payload?.success;
                state.error = null
            })
            .addCase(verifyUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
});

export default verificationSlice;
