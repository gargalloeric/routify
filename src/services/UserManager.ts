import {UserInfo} from "../model/UserInfo.ts";
import {firebaseAuth, createUserWithEmailAndPassword} from "./FirebaseUtils.ts";
import {validateRegistrationInfo} from "./Validators.ts";

export class UserManager { // Singleton

    userInfo : UserInfo | null;

    constructor() {
        this.userInfo = null  // maybe change on login¿?
    }

    async register(name: string, email: string, password: string, repPassword: string): Promise<string> { // returns the mail of the user
        // validate values
        validateRegistrationInfo(name, email, password, repPassword)
        // create user (in auth + bbdd) // TODO bbdd register user
        // assign values to userInfo
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`ERROR [UserManager] Code: ${errorCode}, Message: ${errorMessage}`)
                throw new Error("User was already registered or mail is invalid") // User is already registered or invalid mail
            });
        this.userInfo = new UserInfo(userCredential.user, name)
        if (this.userInfo.mail) return this.userInfo.mail
        else return "No mail¿?"
    }
}

let instance: UserManager;

export function getUserManager(): UserManager {
    if (!instance) instance = new UserManager()
    return instance;
}