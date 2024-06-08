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

    constructor(taskId?: number) {
        this.taskId = taskId
    }

    taskId?: number
    theoryElementId?: number
    title?: string
    deadline?: string // Date
    description?: string

    // TODO Sincronizar con el modelo de back-end
    delivered = false // If the task has been delivered 

    comments?: Array<Comment>
}