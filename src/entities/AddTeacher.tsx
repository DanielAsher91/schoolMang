import { useRef, useState } from "react";
import { confrimButton } from "../types";
import Popup from "../Popup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


type Props = {};

const AddTeacher:React.FC<Props> = (props) => {

    const firstNameRef = useRef<HTMLInputElement>();
    const lastNameRef = useRef<HTMLInputElement>();
    const IDRef = useRef<HTMLInputElement>();
    const [textOfDB, setTextOfDB] = useState<string>(); 
    const [showPopUp, setShowPopUp] = useState<boolean>(false);

    const closePopUpText = () => {
        setShowPopUp(false);
      }


    const confirmButtons: confrimButton[] = [{
        label: "Confirm",
        onClick: closePopUpText
    }]

    const addTeacherHandler = async (event) => {

        event.preventDefault();

        const dataToSend = {
            teacherId: IDRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            
            }

            console.log(JSON.stringify(dataToSend))
        
            const requestOption = {
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(dataToSend)
            }

            const response = await fetch ("http://localhost:8080/admin/addTeacher", requestOption)
            

            if(response.status === 200) {
                setTextOfDB("Teacher added successfully")
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
          label="ID"
          inputRef={IDRef}
          multiline
          maxRows={4}
          variant="standard"
        />
         <TextField
         sx={{margin:2}}
          id="standard-multiline-flexible"
          label="First name"
          multiline
          inputRef={firstNameRef}
          maxRows={4}
          variant="standard"
        />
         
         <TextField
         sx={{margin:2}}
          id="standard-multiline-flexible"
          label="Last name"
          inputRef={lastNameRef}
          multiline
          maxRows={4}
          variant="standard"
          />

        <div>
        <Button 
          variant="contained"
          onClick={addTeacherHandler} >Add Teacher</Button>
        </div>
            
            {showPopUp && <Popup context={textOfDB} buttons={confirmButtons}/>}
        </>
    )
}

export default AddTeacher;