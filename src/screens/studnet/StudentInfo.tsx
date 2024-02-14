import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Typography } from "@mui/material";


type Props = {};


const StudentInfo: React.FC<Props> = (props) => {

    const reduxStudent = useSelector((state:RootState) => state.loggedInStudent)


    return(
        <>
         <Typography variant="subtitle1" gutterBottom>
         Student ID: {reduxStudent.Id}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      First name: {reduxStudent.firstName}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      Last name: {reduxStudent.lastName}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
      Birth date: {reduxStudent.birthDate}
      </Typography>
        
        </>
    )
}
export default StudentInfo;