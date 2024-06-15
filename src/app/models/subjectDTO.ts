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
    constructor(theoryElementId?: number) {
        this.theoryElementId = theoryElementId
    }

    theoryElementId?: number
    title?: string
    description?: string
    filename?: string

    comments?: Array<Comment>
}

export class Task {

    constructor(taskId?: number) {
        this.taskId = taskId
    }

    taskId?: number
    theoryElementId?: number
    title?: string
    deadline?: string // DateTime
    description?: string
    filename?: string

    isDelivered = false // ONLY CLIENT If the task has been delivered
    deliveries?: Array<Delivery>

    comments?: Array<Comment>
}

export class Delivery {
    deliveryId?: number
    delivererId?: string
    deliveryDate?: string // DateTime
    mark? : number

    filename?: string
}