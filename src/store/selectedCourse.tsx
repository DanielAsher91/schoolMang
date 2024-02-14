import { createSlice } from "@reduxjs/toolkit";
import { ReduxCourse } from "../types";



const initialState:ReduxCourse ={
    courseId: null,
    courseTitle: '',
    courseTeacher: '',
   
    
};

const selectedCourseSlice = createSlice({
    name:'selectedCourse',
    initialState,
    reducers: {
        setCourseId(state, action) {
            state.courseId = action.payload;
            },
            setCourseTitle(state, action) {
                state.courseTitle = action.payload;
            },
            setCourseTeacher(state, action) {
                state.courseTeacher = action.payload;
            }
            
    }
});

export const selectedCourseActions = selectedCourseSlice.actions;

export default selectedCourseSlice.reducer;