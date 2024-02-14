import { useState } from "react"
import AddStudent from "../entities/AddStudent";
import AddCourse from "../entities/AddCourse";
import AddTeacher from "../entities/AddTeacher";
import Header from "../Header";
import AddTeacherToCourse from "../entities/AddTeacherToCourse";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from "@mui/material";


type Props = {}

const AdminScreen: React.FC<Props> = (props) => {

    const [actionName, setActionName] = useState<string>('');

    const addStudnetHandler = () => {
        setActionName('STUDENT')
        console.log(actionName)
    }
    const addCourseHandler = () => {
        setActionName('COURSE')
    }
    const addTeacherHandler = () => {
        setActionName('TEACHER')
    }
    const addTeacherToCourse = () => {
        setActionName('Teacher->Course')
    }
   

    return(
        <>
        
        <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button onClick={addStudnetHandler}>Add Student</Button>
      <Button onClick={addCourseHandler}>Add Course</Button>
      <Button onClick={addTeacherHandler}>Add Teacher</Button>
      <Button onClick={addTeacherToCourse}>Add teacher to course</Button>
    </ButtonGroup>
        
    
       
        
        <section>
        {actionName === 'STUDENT' && <AddStudent/>}
        {actionName === 'COURSE' && <AddCourse/>}
        {actionName === 'TEACHER' && <AddTeacher/>}
        {actionName === 'Teacher->Course' && <AddTeacherToCourse/>}
        

        </section>

        
       
        
        
         </>
    )
}

export default AdminScreen;