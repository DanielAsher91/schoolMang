import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../store";
import { frontPageActions } from "../store/frontPage";
import { confrimButton } from "../types";
import Popup from "../Popup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
type Props = {};


const AddTeacherToCourse:React.FC<Props> = (props) => {

    const teacherIdRef = useRef<HTMLInputElement>();
    const courseIdRef = useRef<HTMLInputElement>();

    const [textOfDB, setTextOfDB] = useState<string>(); 
    const [showPopUp, setShowPopUp] = useState<boolean>(false);

    const closePopUpText = () => {
      setShowPopUp(false);
    }
    
   

    const confirmButtons: confrimButton[] = [{
      label: "Confirm",
      onClick: closePopUpText
  }]

    const [responeFromDataBase, setResponeFromDataBase] = useState<string|number>('')

   

    const addTeacherToCourse = async(event) => {
        event.preventDefault();
       
         const teacherId = teacherIdRef.current.value;
    const courseId = courseIdRef.current.value;

        const dataToSend = {

        }

        const requestOption = {
            method: 'Post',
            headers: {"Content-Type":"application/json", "teacherId": teacherId, "courseId": courseId},
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch ("http://localhost:8080/admin/addTeacherToCourse", requestOption)
        if(response.status === 200) {
            const responseFromDB = await response.text();
            setTextOfDB(responseFromDB);
            setShowPopUp(true);
          }
          else {
            const responseFromDB = await response.text();
            setTextOfDB(responseFromDB);
            setShowPopUp(true);
            }
        // const responseFromDB = await response.text();

       
        // console.log(JSON.stringify(responseFromDB))
        // setResponeFromDataBase(responseFromDB);
        



    };

    return(
        <>
    
        <TextField
        sx={{margin:2}}
          id="standard-multiline-flexible"
          label="Teacher ID"
          inputRef={teacherIdRef}
          multiline
          maxRows={4}
          variant="standard"
        />
         <TextField
         sx={{margin:2}}
          id="standard-multiline-flexible"
          label="Course ID"
          multiline
          inputRef={courseIdRef}
          maxRows={4}
          variant="standard"
        />

        
        <Button sx={{margin:3}}
          variant="contained"
          onClick={addTeacherToCourse} >Add</Button>
      
     

        {/* <label>Teacher ID</label>
            <input
            type="number"
            ref={teacherIdRef}
            placeholder="Enter teacher ID"
            /> 
            <label>Course ID</label>
            <input
            type="number"
            ref={courseIdRef}
            placeholder="Enter course ID"
            />   */}

            {/* <button
            onClick={addTeacherToCourse}
            >Add</button> */}
            {showPopUp && <Popup context={textOfDB} buttons={confirmButtons}/>}
            
 


        
        </>
    )
}

export default AddTeacherToCourse;