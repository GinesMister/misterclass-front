import { Subject } from "./subjectDTO"

export class UserData {
    userId: string
    name: string
    surname: string
    email: string
    subjectsSubscribed!: Array<Subject>
    subjectsCreated!: Array<Subject>

    constructor(userId?: string, name?: string, surname?: string, email?: string) {
        this.userId = userId || ''
        this.name = name || ''
        this.surname = surname || ''
        this.email = email || ''
    }
}