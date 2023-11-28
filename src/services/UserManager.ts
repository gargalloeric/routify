import {UserInfo} from "../model/UserInfo.ts";
import {AuthService} from "./AuthService.ts";
import {DBService} from "./DBService.ts";
import {FirebaseAuthService} from "./FirebaseAuthService.ts";
import {FirebaseDBService} from "./FirebaseDBService.ts";
import {firebaseAuth, signInWithEmailAndPassword} from "./FirebaseUtils.ts";
import {validateLogInInfo, validateRegistrationInfo} from "./Validators.ts";


export class UserManager {

    userInfo : UserInfo | null;
    private _authService: AuthService;
    private _dbService: DBService;

    constructor() {
        this.userInfo = null  // maybe change on login¿?
        this._authService = new FirebaseAuthService()
        this._dbService = new FirebaseDBService()
    }
    set authService(value: AuthService) {
        this._authService = value;
    }
    set dbService(value: DBService) {
        this._dbService = value;
    }

    isLoggedIn() : boolean {
        return !!this.userInfo;
    }

    async register(name: string, email: string, password: string, repPassword: string): Promise<string> {
        const validationMessage = validateRegistrationInfo(name, email, password, repPassword)
        if (validationMessage) throw new Error(validationMessage)

        this.userInfo = await this._authService.register(name, email, password)

        await this._dbService.saveUserInfo(this.userInfo)

        if (this.userInfo.mail) return this.userInfo.mail
        else throw new Error("Unexpected error: user registered without mail")
    }

    async logIn(email: string, password: string): Promise<string> {
        const validationMessage = validateLogInInfo(email, password)
        if (validationMessage) throw new Error(validationMessage)

        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
            .catch(() => {throw new Error("Incorrect logIn info")});

        // TODO LOGIN - bbdd obtain user info

        this.userInfo = new UserInfo(userCredential.user, "tmp-name")

        if (this.userInfo.mail) return this.userInfo.mail
        else throw Error("Unexpected error - user has no mail - auth failed¿?")
    }

    async deleteAccount(): Promise<void> {
        if (this.userInfo) {
            await this._dbService.deleteUser(this.userInfo)
            await this._authService.deleteSignedInUser(this.userInfo)
            this.userInfo = null

        } else throw Error("Can't delete account if user is not logged")
    }
}

let instance: UserManager;

export function getUserManager(): UserManager {
    if (!instance) instance = new UserManager()
    return instance;
}