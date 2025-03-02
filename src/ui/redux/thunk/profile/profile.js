import { createAsyncThunk } from "@reduxjs/toolkit"
import { useApi } from "../../../hooks/apiHooks";

export const fetch = createAsyncThunk(
    "profile/fetch", async () => {        
        // const profile = await useApi("user", "get", "get")        
        // return profile.data[0]
        const token = JSON.parse(localStorage.getItem("token"));
        return token
    }
)