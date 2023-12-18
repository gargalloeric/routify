import {UserInfo} from "../model/UserInfo.ts";
import {AuthService} from "./AuthService.ts";
import {DBService} from "./DBService.ts";
import {FirebaseAuthService} from "./FirebaseAuthService.ts";
import {FirebaseDBService} from "./FirebaseDBService.ts";
import {validateLogInInfo, validateRegistrationInfo, validateVehicleInfo} from "./Validators.ts";
import {Vehicle} from "../model/Vehicle.ts";
import {Route} from "../model/Route.ts";


export class UserManager {

    userInfo : UserInfo | null;
    private _authService: AuthService;
    private _dbService: DBService;

    constructor() {
        this.userInfo = null  // maybe change on login¿?
        this._authService = new FirebaseAuthService()
        this._dbService = new FirebaseDBService()
    }
    public set authService(value: AuthService) {
        this._authService = value;
    }
    public set dbService(value: DBService) {
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

        this.userInfo = await this._authService.logIn(email, password)

        await this._dbService.fetchUserInfo(this.userInfo)

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

    async registerVehicle(matricula: string, nombre: string, tipoMotor: string, consumo100Km: number): Promise<boolean> {
        if (this.userInfo && this.isLoggedIn()) {
            const validationMessage = validateVehicleInfo(matricula, nombre, tipoMotor, consumo100Km)
            if (validationMessage) throw new Error(validationMessage)

            const v: Vehicle = new Vehicle(matricula, nombre, tipoMotor, consumo100Km)

            this.userInfo.addVehicle(v)

            await this._dbService.saveUserInfo(this.userInfo)
            return true

        } else throw new Error("User must be logged in to register a vehicle")
    }

    async deleteVehicle(matricula: string) {
        if (this.userInfo && this.isLoggedIn()) {
            this.userInfo.removeVehicle(matricula)
            await this._dbService.saveUserInfo(this.userInfo)
        } else throw new Error("User must be logged in to delete a vehicle")
    }

    getListOfVehicles() {
        if (this.userInfo && this.isLoggedIn()) {
            return this.userInfo.vehicles
        } else throw new Error("User must be logged in to list vehicles");
    }

    getUserVehicle(matricula: string) {
        if (this.userInfo) return this.userInfo.getVehicle(matricula);
        else throw new Error("User must be logged in to fetch a vehicle");
    }

    async saveRoute(route: Route, name: string) : Promise<boolean>{
        if (this.userInfo && this.isLoggedIn()) {
            route.name = name;
            this.userInfo.addRoute(route);

            await this._dbService.saveUserInfo(this.userInfo)
            return true

        } else throw new Error("User must be logged in to save a route")
    }
    async deleteRoute(name: string){
        if (this.userInfo && this.isLoggedIn()) {
            this.userInfo.removeRoute(name);
            await this._dbService.saveUserInfo(this.userInfo);
        } else throw new Error("User must be logged in to delete a vehicle")
    }

    logOut() { // TODO following stories...
        this.userInfo = null;
    }

    getListOfRoutes() {
        throw new Error("Not implemented yet");
    }
}

let instance: UserManager;

export function getUserManager(): UserManager {
    if (!instance) instance = new UserManager()
    return instance;
}