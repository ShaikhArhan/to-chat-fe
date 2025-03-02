import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navbarHeight: 0,
    // callingLoginComponent:false
}

const generaldata = createSlice({
    name: "generaldata",
    initialState,
    reducers: {
        setNavbarHeight(state, action) {
            state.navbarHeight = action.payload
        },
        // setCallingLoginComponent(state,action){
        //     state.callingLoginComponent = action.payload
        // }
    }
})

// export const { setNavbarHeight, setCallingLoginComponent } = generaldata.actions
export const { setNavbarHeight } = generaldata.actions

export default generaldata