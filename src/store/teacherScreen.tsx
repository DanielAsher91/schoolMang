import { createSlice } from "@reduxjs/toolkit";
import { StudentButton } from "../types";



const initialState: StudentButton = {
    studentButton:''
}

const teacherScreenSlice = createSlice({
    name:'selectedButton',
    initialState,
    reducers: {
        setStudentButton(state, action) {
            state.studentButton=action.payload
        }
    }
});

export const teacherButtonActions = teacherScreenSlice.actions;

export default teacherScreenSlice.reducer;