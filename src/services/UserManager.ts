import {UserInfo} from "../model/UserInfo.ts";
import {databaseFirestore, doc, setDoc} from "./FirebaseUtils.ts";
import {validateRegistrationInfo} from "./Validators.ts";
import {AuthService} from "./AuthService.ts";
import {FirebaseAuthService} from "./FirebaseAuthService.ts";

export class UserManager {

    userInfo : UserInfo | null;
    private _authService: AuthService;

    constructor() {
        this.userInfo = null  // maybe change on login¿?
        this._authService = new FirebaseAuthService()
    }

    set authService(value: AuthService) {
        this._authService = value;
    }

    isLoggedIn() : boolean {
        if (this.userInfo) return true
        return false
    }

    async register(name: string, email: string, password: string, repPassword: string): Promise<string> {
        validateRegistrationInfo(name, email, password, repPassword)

        this.userInfo = await this._authService.register(name, email, password)

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