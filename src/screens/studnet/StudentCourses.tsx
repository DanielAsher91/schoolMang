import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { confrimButton, Grade } from "../../types";
import Popup from "../../Popup";
import { Button, Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


type Props = {};

const StudentCourses: React.FC<Props> = (props) => {

    const [showCourses, setShowCourses] = useState<boolean>(false);
    const reduxStudent = useSelector((state: RootState) => state.loggedInStudent)
    const [grades1, setGrades] = useState<Grade[]>([])
    const [showPopUp, setShowPopUp] = useState<boolean>(false);
    const [textOfDB, setTextOfDB] = useState<string>();

    const closePopUpText = () => {
        setShowPopUp(false);
    }

    const confirmButtons: confrimButton[] = [{
        label: "Confirm",
        onClick: closePopUpText
    }]


    const showCoursesHandler = async (event) => {
        event.preventDefault();


        const requestOption = {
            method: "GET",
            headers: { "Content-Type": "application/json", "studentId": reduxStudent.Id.toString() }
        };

        const response = await fetch("http://localhost:8080/student/getGradesByStudent", requestOption);

        console.log(response.status)
        if (response.status === 200) {
            const responseFromDB = await response.json();
            setShowCourses(true);
            const grades: Grade[] = responseFromDB.map((item) => ({
                course: item.course.courseTitle,
                teacher: item.course.courseTeacher.firstName + " " + item.course.courseTeacher.lastName,
                grade: item.studentGrade

            }))
            setGrades(grades);
        }
        // else if (response.status === 100) {
        //     const responseFromDB = await response.json();
        //     setShowCourses(true);
        //     const grades:Grade[] = responseFromDB.map((item) => ({
        //         course: item.courseTitle,
        //         teacher: item.courseTeacher.firstName + " " + item.courseTeacher.lastName,
        //     }))
        // }
        else {
            const responseFromDB = await response.text();
            setTextOfDB(responseFromDB);
            setShowPopUp(true);
        }




    }

    const hideShowCourseHanler = () => {
        setShowCourses(false);
    }

    return (
        <>
            {showPopUp && <Popup context={textOfDB} buttons={confirmButtons} />}

            <Button sx={{ margin: 0.5 }}
                variant="contained"
                onClick={showCoursesHandler}>Show courses</Button>

            {showCourses && <>
                <h2>Registered Courses:</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{
                                    fontWeight: 'bold',
                                  }}>Course Title</TableCell>
                                <TableCell sx={{
                                    fontWeight: 'bold',
                                  }}>Course Teacher</TableCell>
                                <TableCell sx={{
                                    fontWeight: 'bold',
                                  }}>Course Grade</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {grades1.map((grade, index) => (
                                <TableRow key={index}>
                                    <TableCell>{grade.course}</TableCell>
                                    <TableCell>{grade.teacher}</TableCell>
                                    <TableCell>{grade.grade}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

              
                <Button sx={{ margin: 0.5 }}
                variant="contained"
                onClick={hideShowCourseHanler}>Hide</Button>

            </>}

        </>
    )

}

export default StudentCourses;