import {UserInfo} from "../model/UserInfo.ts";
import {AuthService} from "./AuthService.ts";
import {DBService} from "./DBService.ts";
import {FirebaseAuthService} from "./FirebaseAuthService.ts";
import {FirebaseDBService} from "./FirebaseDBService.ts";
import {validateLogInInfo, validateRegistrationInfo, validateVehicleInfo} from "./Validators.ts";
import {Vehicle} from "../model/Vehicle.ts";
import {Route} from "../model/Route.ts";
import {obtainCoordsFromName, obtainNameFromCoords} from "./ORS.ts";
import {Coordinates} from "../model/Coordinates.ts";
import {Place} from "../model/Place.ts";
import {GenericElement} from "../model/GenericElement.ts";


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

    // -----------------------------------------------------------------------------------------------------------------
    // SESSION/ACCOUNT MANAGEMENT
    // -----------------------------------------------------------------------------------------------------------------

    isLoggedIn() : boolean {
        return !!this.userInfo;
    }

    logOut() {
        if (this.userInfo) {
            this.userInfo = null;
        } else throw Error("User must be logged in to log out")
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

        if (!this.userInfo.defaultVehicle)
            await this.setDefaultVehicle("driving-car");

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

    // -----------------------------------------------------------------------------------------------------------------
    // VEHICLE MANAGEMENT
    // -----------------------------------------------------------------------------------------------------------------

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

    async deleteVehicle(matricula: string): Promise<boolean> {
        if (this.userInfo && this.isLoggedIn()) {
            const res = this.userInfo.removeVehicle(matricula)
            await this._dbService.saveUserInfo(this.userInfo)
            return res;
        } else throw new Error("User not logged in")
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

    // -----------------------------------------------------------------------------------------------------------------
    // ROUTE MANAGEMENT
    // -----------------------------------------------------------------------------------------------------------------

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

    getListOfRoutes() {
        if (this.userInfo && this.isLoggedIn()) {
            return this.userInfo.routes;
        } else throw new Error("User must be logged in to list routes");
    }

    // -----------------------------------------------------------------------------------------------------------------
    // INTEREST PLACES MANAGEMENT
    // -----------------------------------------------------------------------------------------------------------------

    async registerPlaceFromPlaceName(placeName: string): Promise<boolean> {
        if (this.userInfo && this.isLoggedIn()) {
            // get coords
            const dataOrigin = await obtainCoordsFromName(placeName)
            const latOrigin = dataOrigin.geometry.coordinates[1];
            const lonOrigin = dataOrigin.geometry.coordinates[0];
            const coords: Coordinates = new Coordinates(latOrigin, lonOrigin);
            const place: Place = new Place(placeName, coords);
            // save to userInfo
            this.userInfo.addPlace(place);
            // save to db
            await this._dbService.saveUserInfo(this.userInfo)
            return true

        } else throw new Error("User must be logged in to save a route")
    }

    async registerPlaceFromPlaceCoords(coords: Coordinates){
        if (this.userInfo && this.isLoggedIn()) {
            // get coords
            const dataOrigin = await obtainNameFromCoords(coords.reverse());
            const name = dataOrigin.properties.name;
            const place: Place = new Place(name, coords);
            this.userInfo.addPlace(place);
            // save to db
            await this._dbService.saveUserInfo(this.userInfo)
            return true

        } else throw new Error("User must be logged in to save a route")
    }

    async deletePlace(placeName: string): Promise<void> {
        if (this.userInfo && this.isLoggedIn()) {
            if (this.userInfo.removePlace(placeName))
                await this._dbService.saveUserInfo(this.userInfo);
            else throw new Error("Place not found");
        } else throw new Error("User must be logged in to delete a place")
    }

    getListOfPlaces() {
        if (this.userInfo && this.isLoggedIn()) {
            return this.userInfo.places;
        } else throw new Error("User must be logged in to list places");
    }

    async setDefaultVehicle(matricula : string){
        if (this.userInfo && this.isLoggedIn()) {
            this.userInfo.setDefaultVehicle(matricula);
            await this._dbService.saveUserInfo(this.userInfo);
        }
    }

    getDefaultVehicle(){
        if (this.userInfo && this.isLoggedIn()) {
            return this.userInfo.defaultVehicle;
        } else throw new Error("User must be logged in to list places");
    }

    // -----------------------------------------------------------------------------------------------------------------
    // FAVOURITE ELEMENTS MANAGEMENT
    // -----------------------------------------------------------------------------------------------------------------

    async markElementAsFavourite(element: GenericElement): Promise<boolean> {
        if (this.userInfo && this.isLoggedIn()) {
            if (element.markAsFav()) {
                await this._dbService.saveUserInfo(this.userInfo)
                return true

            } else throw Error("Element already marked as favourite")
        } else throw new Error("User must be logged in to mark elements as favourite");
    }

    async unmarkElementAsFavourite(element: GenericElement): Promise<boolean> {
        if (this.userInfo && this.isLoggedIn()) {
            if (element.unmarkAsFav()) {
                await this._dbService.saveUserInfo(this.userInfo)
                return true

            } else throw Error("Element already marked as not favourite")
        } else throw new Error("User must be logged in to mark elements as favourite");
    }

    async markVehicleAsFavourite(matricula: string): Promise<boolean> {
        if (this.userInfo && this.isLoggedIn()) {
            return await this.markElementAsFavourite(this.userInfo.getVehicle(matricula))
        } else throw new Error("User must be logged in to mark elements as favourite");
    }
     async unmarkVehicleAsFavourite(matricula: string): Promise<boolean> {
        if (this.userInfo && this.isLoggedIn()) {
            return await this.unmarkElementAsFavourite(this.userInfo.getVehicle(matricula))
        } else throw new Error("User must be logged in to mark elements as favourite");
    }

    async markPlaceAsFavourite(name: string): Promise<boolean> {
        if (this.userInfo && this.isLoggedIn()) {
            return await this.markElementAsFavourite(this.userInfo.getPlace(name))
        } else throw new Error("User must be logged in to mark elements as favourite");
    }
    async unmarkPlaceAsFavourite(name: string): Promise<boolean> {
        if (this.userInfo && this.isLoggedIn()) {
            return await this.unmarkElementAsFavourite(this.userInfo.getPlace(name))
        } else throw new Error("User must be logged in to mark elements as favourite");
    }

    async markRouteAsFavourite(name: string): Promise<boolean> {
        if (this.userInfo && this.isLoggedIn()) {
            return await this.markElementAsFavourite(this.userInfo.getRoute(name))
        } else throw new Error("User must be logged in to mark elements as favourite");
    }
    async unmarkRouteAsFavourite(name: string): Promise<boolean> {
        if (this.userInfo && this.isLoggedIn()) {
            return await this.unmarkElementAsFavourite(this.userInfo.getRoute(name))
        } else throw new Error("User must be logged in to mark elements as favourite");
    }
}

let instance: UserManager;

export function getUserManager(): UserManager {
    if (!instance) instance = new UserManager()
    return instance;
}