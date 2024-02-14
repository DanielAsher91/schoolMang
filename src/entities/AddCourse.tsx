import React, { useRef, useState } from "react";
import { frontPageActions } from "../store/frontPage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Popup from "../Popup";
import { confrimButton } from "../types";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


type Props = {};

const AddCourse:React.FC<Props> = (props) => {

   

    
    const courseTitleref = useRef<HTMLInputElement>();
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

    const addCourseHandler = async (event) => {
        event.preventDefault();

       const dataToSend = {
            courseId: courseIdRef.current.value,
            courseTitle: courseTitleref.current.value
            
        }
        
        

        const requestOption = {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(dataToSend)
        
        }
        

        const response = await fetch ("http://localhost:8080/admin/addCourse", requestOption)
        
        if(response.status === 200) {
          setTextOfDB("Course added successfully")
          setShowPopUp(true);
        }
        else {
          const responseFromDB = await response.text();
          setTextOfDB(responseFromDB);
          setShowPopUp(true);
          }
    }
  
    return(
        <>  
        <TextField
        sx={{margin:2}}
          id="standard-multiline-flexible"
          label="Course ID"
          inputRef={courseIdRef}
          multiline
          maxRows={4}
          variant="standard"
        />
         <TextField
         sx={{margin:2}}
          id="standard-multiline-flexible"
          label="Course title"
          multiline
          inputRef={courseTitleref}
          maxRows={4}
          variant="standard"
        />

<div>
        <Button 
          variant="contained"
          onClick={addCourseHandler} >Add Course</Button>
    </div>

            
      {showPopUp && <Popup context={textOfDB} buttons={confirmButtons}/>}
      
        </>
    )
}
export default AddCourse;