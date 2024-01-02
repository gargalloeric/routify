import {DBService} from "./DBService.ts";
import {databaseFirestore, doc, getDoc, setDoc} from "./FirebaseUtils.ts";
import {UserInfo} from "../model/UserInfo.ts";
import {deleteDoc} from "firebase/firestore";
import {Vehicle} from "../model/Vehicle.ts";
import {Route} from "../model/Route.ts";
import {Place} from "../model/Place.ts";
import {Coordinates} from "../model/Coordinates.ts";

export class FirebaseDBService implements DBService {
    async saveUserInfo(userInfo: UserInfo): Promise<void> {
        const data = userInfo.getDataForDb();
        await setDoc(doc(databaseFirestore, "users", userInfo.userId), data);
    }

    async deleteUser(userInfo: UserInfo): Promise<void> {
        await deleteDoc(doc(databaseFirestore, "users", userInfo.userId));
    }

    async fetchUserInfo(userInfo: UserInfo): Promise<void> {
        const docRef = doc(databaseFirestore, "users", userInfo.userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            userInfo.name = docSnap.get('name');

            const vehiclesData: { [id: string]: Vehicle } = docSnap.get('vehicles');
            if (vehiclesData) {
                userInfo.vehicles = {};
                Object.keys(vehiclesData).forEach((id) => {
                    userInfo.vehicles[id] = new Vehicle(
                        vehiclesData[id].matricula,
                        vehiclesData[id].nombre,
                        vehiclesData[id].tipoMotor,
                        vehiclesData[id].consumo100Km
                    );
                    if (vehiclesData[id].isFav) userInfo.vehicles[id].markAsFav();
                });
            }

            const routesData:  { [id: string]: Route } = docSnap.get('routes');
            if (routesData) {
                userInfo.routes = {};
                Object.keys(routesData).forEach((id) => {
                    userInfo.routes[id] = new Route(
                        routesData[id].geoJSON,
                        routesData[id].origin,
                        routesData[id].destiny,
                        routesData[id].transport,
                        routesData[id].distance,
                        routesData[id].name
                    );
                });
            }

            const placesData:  { [id: string]: Place } = docSnap.get('places');
            if (placesData) {
                userInfo.places = {};
                Object.keys(placesData).forEach((id) => {
                    userInfo.places[id] = new Place(
                        placesData[id].name,
                        new Coordinates(placesData[id].coords.lat, placesData[id].coords.lon)
                    )
                });
            }

            userInfo.defaultVehicle= docSnap.get('defaultVehicle');

            return;
        }
        throw new Error("Unable to find user in DB");
    }

}