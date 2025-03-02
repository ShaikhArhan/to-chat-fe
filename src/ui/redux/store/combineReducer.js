import { combineReducers } from "@reduxjs/toolkit";
import todoFetchSlice from "../slice/todo/fetch";
import todoAddSlice from "../slice/todo/add";
import generaldata from "../slice/generalData/GeneralData";
import todoDeleteSlice from "../slice/todo/delete";
import todoEditSlice from "../slice/todo/edit";
import searchFetchSlice from "../slice/search/fetch";
import profileFetchSlice from "../slice/profile/profile";
import loginSlice from "../slice/auth/login";
import registerSlice from "../slice/auth/register";
import userFetchSlice from "../slice/user/fetch";
import verificationSlice from "../slice/auth/verification";

export const rootReducer = combineReducers({
    [generaldata.name]: generaldata.reducer,
    [verificationSlice.name]: verificationSlice.reducer,
    [todoFetchSlice.name]: todoFetchSlice.reducer,
    [todoAddSlice.name]: todoAddSlice.reducer,
    [todoDeleteSlice.name]: todoDeleteSlice.reducer,
    [todoEditSlice.name]: todoEditSlice.reducer,
    [searchFetchSlice.name]: searchFetchSlice.reducer,
    [profileFetchSlice.name]: profileFetchSlice.reducer,
    [loginSlice.name]: loginSlice.reducer,
    [registerSlice.name]: registerSlice.reducer,
    [userFetchSlice.name]: userFetchSlice.reducer
})