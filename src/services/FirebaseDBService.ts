import {DBService} from "./DBService.ts";
import {databaseFirestore, doc, getDoc, setDoc} from "./FirebaseUtils.ts";
import {UserInfo} from "../model/UserInfo.ts";
import {deleteDoc} from "firebase/firestore";
import {Vehicle} from "../model/Vehicle.ts";

export class FirebaseDBService implements DBService {
    async saveUserInfo(userInfo: UserInfo): Promise<void> {
        await setDoc(doc(databaseFirestore, "users", userInfo.userId), userInfo.getDataForDb());
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
                });
            }

            return;
        }
        throw new Error("Unable to find user in DB");
    }

}