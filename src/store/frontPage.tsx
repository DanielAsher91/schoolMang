import { createSlice } from "@reduxjs/toolkit";
import { Role } from "../types";



const initialState: Role = {
    role:''
}


const frontPageSlice = createSlice({
    name:'selectedTab',
    initialState,
    reducers: {
        setRole(state, action) {
            state.role = action.payload
        }
    }
});

export const frontPageActions = frontPageSlice.actions;

export default frontPageSlice.reducer;