import {User} from 'firebase/auth'

export class UserInfo {
    name: string
    mail: string | null
    userId: string
    constructor(user : User, name : string) {
        this.name = name
        this.mail = user.email
        this.userId = user.uid
    }
}