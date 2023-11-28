import {UserInfo} from "../model/UserInfo.ts";
import {createUserWithEmailAndPassword, deleteUser, firebaseAuth} from "./FirebaseUtils.ts";
import {AuthService} from "./AuthService.ts";

export class FirebaseAuthService implements AuthService {
    async register(name: string, email: string, password: string): Promise<UserInfo> {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
            .catch(() => {
                throw new Error("User was already registered or mail is invalid")
            })
        return new UserInfo(userCredential.user, name)
    }

    async deleteSignedInUser(): Promise<void> {
        const user = firebaseAuth.currentUser;
        if (user) await deleteUser(user).catch((error) => {
                throw new Error(`Unable to delete user, auth_msg: ${error.message}`)
        })
    }
}