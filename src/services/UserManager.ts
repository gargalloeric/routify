import {UserInfo} from "../model/UserInfo.ts";
import {firebaseAuth, createUserWithEmailAndPassword, databaseFirestore, doc, setDoc} from "./FirebaseUtils.ts";
import {validateRegistrationInfo} from "./Validators.ts";

export class UserManager { // Singleton

    userInfo : UserInfo | null;

    constructor() {
        this.userInfo = null  // maybe change on login¿?
    }

    async register(name: string, email: string, password: string, repPassword: string): Promise<string> {
        validateRegistrationInfo(name, email, password, repPassword)

        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
            .catch(() => {throw new Error("User was already registered or mail is invalid")})

        this.userInfo = new UserInfo(userCredential.user, name)

        await setDoc(doc(databaseFirestore, "users", this.userInfo.userId), this.userInfo.getDataForDb()); // TODO refactor in separate file¿?

        if (this.userInfo.mail) return this.userInfo.mail
        else throw new Error("Unexpected error: user registered without mail")
    }
}

let instance: UserManager;

export function getUserManager(): UserManager {
    if (!instance) instance = new UserManager()
    return instance;
}