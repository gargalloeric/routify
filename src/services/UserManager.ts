import {UserInfo} from "../model/UserInfo.ts";
import {AuthService} from "./AuthService.ts";
import {DBService} from "./DBService.ts";
import {validateRegistrationInfo} from "./Validators.ts";
import {FirebaseAuthService} from "./FirebaseAuthService.ts";
import {FirebaseDBService} from "./FirebaseDBService.ts";


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
        validateRegistrationInfo(name, email, password, repPassword)

        this.userInfo = await this._authService.register(name, email, password)

        await this._dbService.saveUserInfo(this.userInfo)

        if (this.userInfo.mail) return this.userInfo.mail
        else throw new Error("Unexpected error: user registered without mail")
    }
}

let instance: UserManager;

export function getUserManager(): UserManager {
    if (!instance) instance = new UserManager()
    return instance;
}