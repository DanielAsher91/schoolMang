import { createSlice } from "@reduxjs/toolkit"
import { WelcomeLoggedInStudent } from "../types"


const initialState: WelcomeLoggedInStudent = {
    Id: null,
    firstName: '',
    lastName:'',
    birthDate: ''
}

const loggedInStudentSlice = createSlice({
    name:'loggedInStudent',
    initialState,
    reducers: {
        setId: (state, action) => {
            state.Id = action.payload;
        },
        setLastName(state, action) {
            state.lastName = action.payload;
        }
        ,
        setFirstName(state, action) {
            state.firstName = action.payload;
        }
        ,
        setBirthDate(state, action) {
            state.birthDate = action.payload;
        }
    }
});

export const loggedInStudentActions = loggedInStudentSlice.actions;

export default loggedInStudentSlice.reducer;