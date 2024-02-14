export type Student = {
    id: number,
    studnetId: number,
    firstName: string,
    lastName: string,
    birthDate: string
}

export type WelcomeLoggedInStudent = {
    Id: number,
    firstName: string,
    lastName: string,
    birthDate: string
    
}


export type Role = {
    role: string
}

export type StudentButton = {
    studentButton: string
}

export type ReduxCourse = {
    courseId: number,
    courseTitle: string,
    courseTeacher: string
}

export type SelectedCourse = {
    courseId: number,
    courseTitle: string,
    courseTeacher: string,
    onClick: (event: any) => void
}

export type confrimButton = {
    label: string,
    onClick: (event: any) => void
}

export type CourseInfo = {
    courseId: number,
    courseTitle: string,
    courseTeacher: string,

}
export type Grade = {
    course: string,
    // course: CourseInfo,
    teacher: string,
    grade: number
}

export type AppBarButton = {
    title: string,
    onClick: (event: any) => void
}



export type CourseTableInfo = {
    titels: string[],
    tableCourses: ReduxCourse[],
    onClick: (courseId: number, courseTitle: string, courseTeacher: string) => void
}

export type Teacher = {
    teacherId: number,
    firstName: string,
    lastName: string
}

export type StudnetInfo = {
    studentId: number,
    firstName: string,
    lastName: string,
    birthDate: string,
    studentCourses: CourseInfo[]
}

export type WrongResponceFromDB = {
    popUp: boolean,
    context: string
}

