export class UserInfo {
    name: string
    mail: string | null
    userId: string
    constructor(userId: string, email: string | null, name : string) {
        this.name = name
        this.mail = email
        this.userId = userId
    }

    getDataForDb():Object {
        return {
            name: this.name
        };
    }
}