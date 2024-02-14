import { title } from "process";
import { CourseTableInfo } from "../../types";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';



type Props = {
    table: CourseTableInfo
}




const CourseTable: React.FC<Props> = (props) => {



    return (

        <>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">

                    <TableHead>
                        <TableRow >
                            {props.table.titels.map((title, index) => (
                                <TableCell sx={{
                                    fontWeight: 'bold',
                                  }} key={index}>{title}</TableCell>
                            ))}
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
         
                        {props.table.tableCourses.map((course, index) => (
                            <TableRow key={index}>
                                <TableCell>{course.courseId}</TableCell>
                                <TableCell>{course.courseTitle}</TableCell>
                                <TableCell>{course.courseTeacher}</TableCell>
                                <TableCell>
                                    <Button
                                    onClick={() => props.table.onClick(course.courseId, course.courseTitle, course.courseTeacher)}
                                        variant="contained"
                                         >Select</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </>
    )
}

export default CourseTable;