import { createSlice } from "@reduxjs/toolkit";
import { fetch } from "../../thunk/search/search";

const initialState = {
    searchDataFetch: [],
    status: "idle",
    error: null
}

const searchFetchSlice = createSlice({
    name: "searchFetchSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetch.fulfilled, (state, action) => {
            state.searchDataFetch = action.payload
            state.status = "successfully"
            state.error = null;
        }).addCase(fetch.pending, (state, action) => {
            state.status = "pending"
        }).addCase(fetch.rejected, (state, action) => {
            state.status = "failed"
            state.error = "error"
        })
    }
})

export default searchFetchSlice