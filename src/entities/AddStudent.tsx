import { type } from "os";
import { useRef, useState } from "react";
import { confrimButton } from "../types";
import Popup from "../Popup";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';





type Props = {

}

const AddStudent:React.FC<Props> = (props) => {

  const [clicked, setClicked] = useState(false);

  const [checked, setChecked] = useState(false);

    const firstNameRef = useRef<HTMLInputElement>();
    const lastNameRef = useRef<HTMLInputElement>();
    const birthDateRef = useRef<HTMLInputElement>();
    const IDRef = useRef<HTMLInputElement>();
    const [textOfDB, setTextOfDB] = useState<string>(); 
    const [showPopUp, setShowPopUp] = useState<boolean>(false);

    const handleClick = () => {
      setClicked(true);
  
      // Reset clicked state after a short delay (e.g., 500ms)
    
    };

    const closePopUpText = () => {
        setShowPopUp(false);
      }


    const confirmButtons: confrimButton[] = [{
        label: "Confirm",
        onClick: closePopUpText
    }]

    const [arrive, setArrive] = useState<boolean>(false)
    const [dateFromDB, setDataFromDB] = useState<string>('')

   

    

    const addSudentHandler = async (event) => {
     

        event.preventDefault();
        handleClick()
        console.log(firstNameRef)

        const dataToSend = {
            studentId: IDRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            birthDate: birthDateRef.current.value
            }

            // console.log(JSON.stringify(dataToSend))
        
            const requestOption = {
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(dataToSend)
            }
            
            const response = await fetch ("http://localhost:8080/admin/addStudent", requestOption)
            // const responseFromDB = await response.json();

            if(response.status === 200) {
                setTextOfDB("Student added successfully")
                setShowPopUp(true);
              }
              else {
                const responseFromDB = await response.text();
                setTextOfDB(responseFromDB);
                setShowPopUp(true);
                }
            // setArrive(true);
            
            // setDataFromDB(responseFromDB);
           
        
            // console.log(JSON.stringify(responseFromDB))
    }
    

    return(

        <>

<div>
        <TextField
        sx={{margin:2}}
          id="standard-multiline-flexible"
          label="First Name"
          inputRef={firstNameRef}
          multiline
          maxRows={4}
          variant="standard"
        />
         <TextField
         sx={{margin:2}}
          id="standard-multiline-flexible"
          label="Last Name"
          multiline
          inputRef={lastNameRef}
          maxRows={4}
          variant="standard"
        />
         <TextField 
         type="date"
         sx={{margin:2, marginTop:4}}
          id="standard-multiline-flexible"
          inputRef={birthDateRef}
          maxRows={4}
          variant="standard"
        />
         <TextField
         sx={{margin:2}}
          id="standard-multiline-flexible"
          label="ID"
          inputRef={IDRef}
          multiline
          maxRows={4}
          variant="standard"
          
        />
        <div>
        <Button 
          variant="contained"
          onClick={addSudentHandler} >Add Student</Button>
    </div>

        
        </div>
          
        
        
      
        
        
          

            {showPopUp && <Popup context={textOfDB} buttons={confirmButtons}/>} 

        </>
    )

}

export default AddStudent;