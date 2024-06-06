import { UserData } from "./userDataDTO"

export class Subject {
    subjectId?: number
    accessCode?: string
    name?: string
    color?: string
    teacher?: UserData
    teacherId?: string

    units?: Array<Unit>
}

export class Comment {
    commentId?: number
    message?: string
    date?: Date
    sender?: UserData
}

export class Unit {
    constructor(title?: string) {
        this.title = title
    }

    unitId?: number
    title?: string

    theoryElements?: Array<TheoryElement>

    tasks?: Array<Task>
}

export class TheoryElement {
    theoryElementId?: number
    title?: string
    description?: string
    comments?: Array<Comment>
}

export class Task {
    theoryElementId?: number
    title?: string
    deadline?: Date
    description?: string
    comments?: Array<Comment>
}