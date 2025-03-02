import { createAsyncThunk } from "@reduxjs/toolkit"
import { useApi } from "../../../hooks/apiHooks"

export const fetch = createAsyncThunk(
    "todo/fetch", async () => {
        try {
            const userList = await useApi("user", "get", "get")
            // console.log('userList: ', userList);
            if (userList) {
                return userList.data
            }
        } catch (error) {
            console.log('error: ', error);
            return error
        }
    }
)