import {DBService} from "./DBService.ts";
import {databaseFirestore, doc, setDoc} from "./FirebaseUtils.ts";
import {UserInfo} from "../model/UserInfo.ts";

export class FirebaseDBService implements DBService {
    async saveUserInfo(userInfo: UserInfo): Promise<void> {
        await setDoc(doc(databaseFirestore, "users", userInfo.userId), userInfo.getDataForDb());
    }

}