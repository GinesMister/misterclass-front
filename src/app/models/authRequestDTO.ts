export class AuthRequest {
    userId: string
    name!: string
    surname!: string
    email!: string
    password: string
    exists: boolean

    constructor(userId: string, password: string, exists: boolean = true) {
        this.userId = userId;
        this.password = password;
        this.exists = exists;
    }
}