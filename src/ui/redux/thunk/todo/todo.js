import { createAsyncThunk } from "@reduxjs/toolkit";
import { useApi } from "../../../hooks/apiHooks";

export const fetch = createAsyncThunk(
    "todo/fetch", async (id) => {        
        const todoList = await useApi("todo", "post", "get",{
            body: { userId: id }
        })
        if (todoList) {            
            return todoList.data
        }        
    }
)
export const add = createAsyncThunk(

    "todo/add", async (data) => {
        console.log(' todo/add -data: ', data);        
        const todoList = await useApi("todo", "post", "add", {
            body: data,
        });

        return todoList.data
    }
)

export const edit = createAsyncThunk(
    "todo/edit", async (data) => {        
        const todoList = await useApi("todo", "put", "edit", {
            params: {
                id: data.id,
            },
            body: data,
        });
        return todoList.data
    }
)

export const deleted = createAsyncThunk(
    "todo/deleted", async (id) => {        
        const todoList = await useApi("todo", "deleted", "delete", {
            params: {
                id: id,
            },
        });
        console.log('todo/deleted -newItems: ', newItems);
        return todoList.data
    }
)