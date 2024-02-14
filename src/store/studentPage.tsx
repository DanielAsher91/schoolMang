import { createSlice } from "@reduxjs/toolkit";
import { StudentButton } from "../types";



const initialState: StudentButton = {
    studentButton:''
}

const studentPageSlice = createSlice({
    name:'selectedButton',
    initialState,
    reducers: {
        setStudentButton(state, action) {
            state.studentButton=action.payload
        }
    }
});

export const studentButtonActions = studentPageSlice.actions;

export default studentPageSlice.reducer;