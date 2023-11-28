import {DBService} from "./DBService.ts";
import {databaseFirestore, doc, setDoc} from "./FirebaseUtils.ts";
import {UserInfo} from "../model/UserInfo.ts";
import {deleteDoc} from "firebase/firestore";

export class FirebaseDBService implements DBService {
    async saveUserInfo(userInfo: UserInfo): Promise<void> {
        await setDoc(doc(databaseFirestore, "users", userInfo.userId), userInfo.getDataForDb());
    }

    async deleteUser(userInfo: UserInfo): Promise<void> {
        await deleteDoc(doc(databaseFirestore, "users", userInfo.userId));
    }

}