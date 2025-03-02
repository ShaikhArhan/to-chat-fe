import { createSlice } from "@reduxjs/toolkit";
import { fetch } from "../../thunk/profile/profile";

const initialState = {
    profileData: {},
    status: "idle",
    error: null
}

const profileFetchSlice = createSlice({
    name: "profileFetchSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetch.pending, (state, action) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetch.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profileData = action.payload;
            })
            .addCase(fetch.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export default profileFetchSlice