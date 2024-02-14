import { useRef, useState } from "react";
import ReactDOM from "react-dom";

import '.././Popup.css';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { selectedCourseActions } from "../../store/selectedCourse";
import Popup from "../../Popup";
import { confrimButton, CourseInfo, CourseTableInfo, ReduxCourse, SelectedCourse, StudnetInfo, WelcomeLoggedInStudent } from "../../types";
import CourseTable from "./CourseTable";
import { frontPageActions } from "../../store/frontPage";
import MyInfo from "./MyInfo";
import { studentButtonActions } from "../../store/studentPage";
import { loggedInStudentActions } from "../../store/loggedInStudent";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


type Props = {};

type Student = {
    firstName: string,
    lastName: string
}

type WrongResponceFromDB = {
    popUp: boolean,
    context: string
}





const StudentScreen: React.FC<Props> = (props) => {

    const selectedStudentButtun = useSelector((state: RootState) => state.studentPage.studentButton)
    const reduxStudent = useSelector((state: RootState) => state.loggedInStudent)
    const [student, setStudent] = useState<WelcomeLoggedInStudent | null>(null);

    const [welcomeName, setWelcomeName] = useState<Student>({ firstName: '', lastName: '' });

    const dispatch = useDispatch();

    const backHandlerButton = () => {
        dispatch(studentButtonActions.setStudentButton(''));
    }

    const myInfoButtonHandler = () => {
        dispatch(studentButtonActions.setStudentButton('MYINFO'));
    }

    const addCourseButtonHandler = () => {
        dispatch(studentButtonActions.setStudentButton('ADDCOURSE'));
    }

    const selectedCourse = useSelector((state: RootState) => state.selectedCourse)

    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [firstAddClicked, setFirstAddClicked] = useState<boolean>(false);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [courses, setCourses] = useState<ReduxCourse[]>([]);
    const [showText, setShowText] = useState<boolean>(false);
    const [studentInfo, setStudentInfo] = useState<CourseInfo>() ////////I Stopped here!
    const [popupForTextDB, setPopupForTextDB] = useState<WrongResponceFromDB>({ popUp: false, context: '' });

    const [textOfDB, setTextOfDB] = useState<string>();

    const studentIdRef = useRef<HTMLInputElement>(null);

    const [studentId, setStudentId] = useState<string>();


    // dispatch(frontPageActions.setRole(''))






    const loginHnadler = async (event) => {
        event.preventDefault();



        const studentIdInput = studentIdRef.current.value;

        setStudentId(studentIdInput); //To save the ref inside a const

        const dataToSend = {};

        const requestOption = {
            method: 'GET',
            headers: { "Content-Type": "application/json", "studentId": studentIdInput },
            // body: JSON.stringify(dataToSend)
        }

        const response = await fetch("http://localhost:8080/student/getStudent", requestOption)
        if (!response.ok) {
            const wrongResponse = await response.text();
            setPopupForTextDB({ popUp: true, context: wrongResponse })


        }
        else {
            const responseFromDB = await response.json();
            setStudent(responseFromDB);
            dispatch(loggedInStudentActions.setId(responseFromDB.studentId))
            dispatch(loggedInStudentActions.setFirstName(responseFromDB.firstName))
            dispatch(loggedInStudentActions.setLastName(responseFromDB.lastName))
            dispatch(loggedInStudentActions.setBirthDate(responseFromDB.birthDate))

            console.log(JSON.stringify(responseFromDB));


            const firstNameFromDB = responseFromDB.firstName;
            const lastNameFromDB = responseFromDB.lastName;
            setWelcomeName({ firstName: firstNameFromDB, lastName: lastNameFromDB })
            setLoggedIn(true)
        }





    }

    const firstAddHandler = async (event) => {
        event.preventDefault();

        setFirstAddClicked(true);
        addCourseButtonHandler();

        const requestOption = {
            method: 'Get',
            headers: { "Content-Type": "application/json" }
        }

        const response = await fetch("http://localhost:8080/student/getAllCourses")
        console.log("RESPONSE: " + response)
        const responseFromDB = await response.json();
        console.log("FROM DB : " + responseFromDB.at(0).courseTeacher.firstName);




        const newCourse: ReduxCourse[] = responseFromDB.map((item) => ({
            courseId: item.courseId,
            courseTitle: item.courseTitle,
            courseTeacher: item.courseTeacher?.firstName + " " + item.courseTeacher?.lastName
        }))
        setCourses(newCourse);



    }

    const selectcourseHandlr = (courseIdSelected: number, courseTitle: string, courseTeacher: string) => {

        dispatch(selectedCourseActions.setCourseId(courseIdSelected));
        dispatch(selectedCourseActions.setCourseTitle(courseTitle));
        // dispatch(selectedCourseActions.setCourseTeacher(courseTeacher));

        setIsSelected(true);

    }

    const myInfoHandler = async (event) => {
        event.preventDefault();
        myInfoButtonHandler();
    }




    const addCourseHandler = async (event) => {
        event.preventDefault();


        const requstedCourseId = selectedCourse.courseId;
        let stringCourseId = requstedCourseId.toString();

        const dataToSend = {}



        const requestOption = {
            method: 'POST',
            headers: { "Content-Type": "application/json", "studentId": studentId, "courseId": stringCourseId },
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch("http://localhost:8080/student/addCourseToStudent", requestOption);
        const responseFromDB = await response.text();
        if (response.ok) {
            setTextOfDB("Course Added successfully")
            setShowText(true)
            setIsSelected(false);
        }
        else {
            setTextOfDB(responseFromDB);
            setShowText(true)
            setIsSelected(false);
        }



    }

    const popUpNoHandler = () => {
        setIsSelected(false);
    }

    const closePopUpText = () => {
        setShowText(false)
    }




    const yesNoButtons: confrimButton[] = [{
        label: "Yes",
        onClick: addCourseHandler
    },
    {
        label: "No",
        onClick: popUpNoHandler
    }
    ]

    const confirmButtons: confrimButton[] = [{
        label: "Confirm",
        onClick: closePopUpText
    }]

    const contextForPopup: string = "Do you want to add this course?"



    const courseTableInfo1: CourseTableInfo = {
        titels: ["Course ID", "Course Title", "Course Teacher"],
        tableCourses: courses,
        onClick: selectcourseHandlr
    }

    const closeWrongPopUp = () => {
        setPopupForTextDB({ popUp: false, context: '' })
    }

    const closeWrongPopup: confrimButton[] = [{
        label: 'Confirm',
        onClick: closeWrongPopUp
    }]







    return (
        <>




            {popupForTextDB.popUp && (
                <Popup context={popupForTextDB.context} buttons={closeWrongPopup} />
            )}
            {!loggedIn && (<>
                <TextField
                    sx={{ margin: 2 }}
                    id="standard-multiline-flexible"
                    label="Student ID"
                    inputRef={studentIdRef}
                    multiline
                    maxRows={4}
                    variant="standard"
                />

                <Button sx={{ margin: 3 }}
                    variant="contained"
                    onClick={loginHnadler} >Login</Button>
            </>)}

            {loggedIn && (
                <>
                    <Typography variant="h5" gutterBottom>
                        Welcome {welcomeName.firstName} {welcomeName.lastName}
                    </Typography>
                    {selectedStudentButtun === '' && <>
                        <Button sx={{ margin: 0.5 }}
                            variant="contained"
                            onClick={firstAddHandler} >Add Course</Button>
                            <Button sx={{ margin: 0.5 }}  
                            variant="contained"
                            onClick={myInfoHandler} >My Info</Button>
                    </>}
                    {selectedStudentButtun === 'MYINFO' && <MyInfo />}
                    {selectedStudentButtun === 'ADDCOURSE' && <>
                        <CourseTable table={courseTableInfo1} />
                        <Button sx={{ margin: 0.5 }}  
                            variant="contained"
                            onClick={backHandlerButton} >Back</Button>
                        {/* <button onClick={backHandlerButton}>Back</button> */}
                        {isSelected && (
                            <Popup context={contextForPopup} buttons={yesNoButtons} />
                        )}
                        {
                            showText && (
                                <Popup context={textOfDB} buttons={confirmButtons} />
                            )}
                    </>}


                </>
            )}

        </>
    )
}

export default StudentScreen;