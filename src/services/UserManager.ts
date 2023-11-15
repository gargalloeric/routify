export class UserManager { // Singleton

    private static userManager: UserManager;

    private constructor() {
        // TODO
    }

    static getManager(): UserManager {
        if (!this.userManager) this.userManager = new UserManager()
        return this.userManager;
    }

    register(name, email, password, repPassword) {
        // TODO
        throw new Error("Not Implemented")
    }
    logIn(email, password){
        // TODO
        throw new Error("Not Implemented")
    }

}