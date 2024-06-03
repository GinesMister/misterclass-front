import { UserData } from "./userDataDTO"

export class Subject {
    subjectId?: string
    accessCode?: string
    name?: string
    color?: string
    teacher?: UserData
    teacherId?: string

    units?: Array<{
        unitId: number,
        title: string,
        subtitile: string,

        TheoryElements: Array<{
            theoryElementId: number,
            title: string,
            description: string,
            comments: Array<Comment>
        }>

        Tasks: Array<{
            taskId: number,
            title: string,
            description: string,
            comments: Array<Comment>
        }>
    }>
}

class Comment {
    commentId?: number
    message?: string
    date?: Date
    sender?: UserData
}