import { configureStore } from "@reduxjs/toolkit"
import frontPageReducer from './frontPage'
import frontPage from "./frontPage";
import selectedCourse from "./selectedCourse";
import selectedCourseReducer from "./selectedCourse";
import studentPageReducer from "./studentPage"
import teacherScreenReducer from "./teacherScreen"
import loggedInStudentReducer from "./loggedInStudent"

const store = configureStore({
    reducer: {
       fronPage: frontPageReducer,
       selectedCourse: selectedCourseReducer,
       studentPage: studentPageReducer,
       teacherScreen: teacherScreenReducer,
       loggedInStudent: loggedInStudentReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;