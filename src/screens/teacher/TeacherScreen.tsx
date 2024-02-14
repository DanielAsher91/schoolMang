import { useRef, useState } from "react";
import { confrimButton, StudnetInfo, Teacher, WrongResponceFromDB } from "../../types";
import Popup from "../../Popup";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { teacherButtonActions } from "../../store/teacherScreen";
import { Button, TextField } from "@mui/material";


type Props = {};

type WelcomeTeacher = {
    firstName: string,
    lastName: string
}

const TeacherScreen: React.FC<Props> = (props) => {

    const selectedButtun = useSelector((state: RootState) => state.teacherScreen.studentButton)
    const dispatch = useDispatch();
    const [teacherId, setTeacherId] = useState<string>();
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const teacherIdRef = useRef<HTMLInputElement>(null);
    const studnetIdRef = useRef<HTMLInputElement>(null);
    const courseIdRef = useRef<HTMLInputElement>(null);
    const gradeRef = useRef<HTMLInputElement>(null);
    const [teacher, setTeacher] = useState<Teacher | null>(null);
    const [popupForTextDB, setPopupForTextDB] = useState<WrongResponceFromDB>({ popUp: false, context: '' });
    const [welcomeName, setWelcomeName] = useState<WelcomeTeacher>({ firstName: '', lastName: '' });
    const [addGrade, setAddGrade] = useState<boolean>(false);

    const loginHnadler = async (event) => {
        event.preventDefault();




        const teacherIdInput = teacherIdRef.current.value;

        setTeacherId(teacherIdInput); //To save the ref inside a const



        const requestOption = {
            method: 'GET',
            headers: { "Content-Type": "application/json", "teacherId": teacherIdInput },

        }

        const response = await fetch("http://localhost:8080/teacher/getTeacher", requestOption)
        if (!response.ok) {

            const wrongResponse = await response.text();
            console.log("From here" + wrongResponse);
            setPopupForTextDB({ popUp: true, context: wrongResponse })


        }
        else {
            const responseFromDB = await response.json();
            setTeacher(responseFromDB);

            console.log("From the else " + JSON.stringify(responseFromDB.teacherId));


            const firstNameFromDB = responseFromDB.firstName;
            const lastNameFromDB = responseFromDB.lastName;
            setWelcomeName({ firstName: firstNameFromDB, lastName: lastNameFromDB })
            setLoggedIn(true)
        }
    }

    const closeWrongPopUp = () => {
        setPopupForTextDB({ popUp: false, context: '' })
    }

    const closeWrongPopup: confrimButton[] = [{
        label: 'Confirm',
        onClick: closeWrongPopUp
    }]

    const addGradeFirstHandelr = () => {
        dispatch(teacherButtonActions.setStudentButton('ADDGRADE'))
        console.log("teacherId : " + teacherId)
    }

    const setGradeToStudent = async (event) => {
        event.preventDefault();
        console.log("teacherId : " + teacherId)
        const studentId = studnetIdRef.current.value;
        // const courseId = courseIdRef.current.value;
        const grade = gradeRef.current.value;


        const requestOption = {
            method: 'GET',
            headers: { "Content-type": "application/json", "studentId": studentId, "teacherId": teacherId, "gradeScore": grade }
            // "courseId": courseId
        }

        const response = await fetch("http://localhost:8080/teacher/setGradeToStudent", requestOption)
        const responseFromDB = await response.json();
        console.log(responseFromDB);


    }



    return (
        <>

            {popupForTextDB.popUp && (
                <Popup context={popupForTextDB.context} buttons={closeWrongPopup} />
            )}
            {!loggedIn && (<><label>Teacher ID</label>
                <input
                    type="number"
                    ref={teacherIdRef}
                    placeholder="Enter ID"
                />
                <button onClick={loginHnadler}>Login</button></>)}
            {loggedIn && (
                <>
                    <h3>Welcome {welcomeName.firstName} {welcomeName.lastName}</h3>
                    {selectedButtun === '' &&
                        <>
                            <button onClick={addGradeFirstHandelr}>Add Grade</button>
                        </>}
                    {selectedButtun === 'ADDGRADE' &&
                        <>
                            <TextField
                                id="standard-multiline-flexible"
                                label="Student ID"
                                inputRef={studnetIdRef}
                                multiline
                                maxRows={4}
                                variant="standard"
                                sx={{ margin: 0.5}}
                            />
                            <TextField
                                id="standard-multiline-flexible"
                                label="Grade"
                                inputRef={gradeRef}
                                multiline
                                maxRows={4}
                                variant="standard"
                                sx={{ margin: 0.5}}
                            />
                            <Button sx={{margin: 1.5}}  
                            variant="contained"
                            onClick={setGradeToStudent} >Set Grade</Button>
                            {/* <button onClick={setGradeToStudent}>
                                Set Grade
                            </button> */}
                        </>}

                </>
            )}


        </>
    )
}

export default TeacherScreen;