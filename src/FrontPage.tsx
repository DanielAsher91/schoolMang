import { useSelector } from "react-redux";
import { RootState } from "./store";
import Header from "./Header";
import AdminScreen from "./screens/AdminScreen";
import StudentScreen from "./screens/studnet/StudnetScreen";
import TeacherScreen from "./screens/teacher/TeacherScreen";


type Props = {};


const FrontPage:React.FC<Props> = (props) => {

    const selectedRole = useSelector((state:RootState) => state.fronPage.role);

   return(
    <>
    <Header/>
    <br/>
    <br/>
    <br/>
    {selectedRole === 'ADMIN' && <AdminScreen/>}
    {selectedRole === 'STUDENT' && <StudentScreen/>}
    {selectedRole === 'TEACHER' && <TeacherScreen/>}

    </>
   )

}

export default FrontPage;