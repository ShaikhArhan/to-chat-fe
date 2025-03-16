import { createAsyncThunk } from "@reduxjs/toolkit";
import { useApi } from "../../../hooks/apiHooks";

export const fetch = createAsyncThunk(
    'search/fetch', async ({userId, searchData}, { rejectWithValue }) => {
        try {
            // console.log('searchData: ', searchData);            
            // const data = JSON.parse(localStorage.getItem("todoList"));
            // const filteredData = data.filter(item =>
            //     item.message.toLowerCase().trim().split(" ").some(word => searchData.toLowerCase().trim().split(" ").some(searchWord => word.includes(searchWord)))
            // );            
            const todoList = await useApi("todo", "post", "getByMessage", {
                body: { userId:userId, message: searchData?.trim() },
            })
            // console.log('todoList: ', todoList);
            return todoList.data;
        } catch (error) {
            console.log("error", error.message);
            return rejectWithValue("Error fetching search results");
        }
    }
)