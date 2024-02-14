import { useState } from "react";
import { Grade, Student, StudnetInfo, WelcomeLoggedInStudent } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import StudentInfo from "./StudentInfo";
import StudentCourses from "./StudentCourses";


type Props = {
   
}

const MyInfo: React.FC<Props> = (props) => {

   return(
        <>
        <StudentInfo/>
        <br/>
        <StudentCourses/>
        </>
        
    )
}

export default MyInfo;