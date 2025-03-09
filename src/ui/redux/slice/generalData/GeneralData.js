import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useApi } from "../../../hooks/apiHooks";

export const unseenMessageCount = createAsyncThunk(
    "fetch/unseenMessage", async (data, { rejectWithValue }) => {
        // console.log('data: ', data);
        try {
            const response = await useApi("chat", "post", "unseenMessage", {
                body: data,
            });
            if (response.success) {
                return { data: response.data, senderId: data.senderId }
            }
            else {
                return rejectWithValue("error")
            }
        } catch (error) {
            console.log('error: ', error);
            return rejectWithValue("error")
        }
    }
)

const initialState = {
    navbarHeight: 0,
    // callingLoginComponent:false
    unseenMessage: [],
    messageStatus: "idle",
    error: null
}

const generaldata = createSlice({
    name: "generaldata",
    initialState,
    reducers: {
        setNavbarHeight(state, action) {
            state.navbarHeight = action.payload
        },
        resetUnseenMessage(state, action) {
            state.unseenMessage = []
            state.messageStatus = "idle"
            state.error = null
        },
        // setCallingLoginComponent(state,action){
        //     state.callingLoginComponent = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(unseenMessageCount.fulfilled, (state, action) => {
            state.unseenMessage = action.payload
            state.messageStatus = "successfully"
            state.error = null;
        }).addCase(unseenMessageCount.pending, (state, action) => {
            state.messageStatus = "pending"
        }).addCase(unseenMessageCount.rejected, (state, action) => {
            state.messageStatus = "failed"
            state.error = "error"
        })
    }
})

// export const { setNavbarHeight, setCallingLoginComponent } = generaldata.actions
export const { setNavbarHeight, resetUnseenMessage } = generaldata.actions

export default generaldata