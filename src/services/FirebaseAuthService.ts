import {UserInfo} from "../model/UserInfo.ts";
import {createUserWithEmailAndPassword, deleteUser, firebaseAuth, signInWithEmailAndPassword} from "./FirebaseUtils.ts";
import {AuthService} from "./AuthService.ts";

export class FirebaseAuthService implements AuthService {
    async register(name: string, email: string, password: string): Promise<UserInfo> {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
            .catch(() => {
                throw new Error("User was already registered or mail is invalid")
            })
        return new UserInfo(userCredential.user.uid, userCredential.user.email, name)
    }

    async deleteSignedInUser(): Promise<void> {
        const user = firebaseAuth.currentUser;
        if (user) await deleteUser(user).catch((error) => {
                throw new Error(`Unable to delete user, auth_msg: ${error.message}`)
        })
    }

    async logIn(email: string, password: string): Promise<UserInfo> {
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password)
            .catch(() => {throw new Error("Incorrect logIn info")});
        return new UserInfo(userCredential.user.uid, userCredential.user.email, "")
    }

}