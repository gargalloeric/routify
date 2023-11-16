export class UserManager { // Singleton

    constructor() {
        // TODO
    }

    register(name, email, password, repPassword): string { // returns the mail of the user
        // TODO
        throw new Error("Not Implemented");
    }
    logIn(email, password): string{ // returns the mail of the user
        throw new Error("Not Implemented");
    }
}

let instance: UserManager;

export function getUserManager(): UserManager {
    if (!instance) instance = new UserManager()
    return instance;
}