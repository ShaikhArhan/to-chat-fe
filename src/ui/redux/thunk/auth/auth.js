import { createAsyncThunk } from "@reduxjs/toolkit";
import { useApi } from "../../../hooks/apiHooks";

export const login = createAsyncThunk(
    "login", async (data, { rejectWithValue }) => {
        try {
            const response = await useApi("auth", "post", "login", { body: data })
            if (response?.success) {
                localStorage.setItem("token", JSON.stringify(response.data))
                console.log('response: ', response.data);
                return response.data
            }
            else {
                return rejectWithValue("error")
            }
        }
        catch (error) {
            console.log('error: ', error);
            return rejectWithValue("error")
        }
    }
)

export const register = createAsyncThunk(
    "register", async (data, { rejectWithValue }) => {
        try {
            console.log('data: ', data);
            const response = await useApi("auth", "post", "register", { body: data })
            console.log('response:', response);
            if (response) {
                return response.data
            }
            else {
                return rejectWithValue("error")
            }
        }
        catch (error) {
            console.log('error: ', error);
            return rejectWithValue("error")
        }
    }
)

export const verifyUser = createAsyncThunk(
    "verification/verifyUser",
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().verification;
            if (!token) {
                throw new Error("No token found");
            }
            const response = await useApi("auth", "post", "login", { body: token });
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
