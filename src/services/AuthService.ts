import {UserInfo} from "../model/UserInfo.ts";

export interface AuthService {
    register(name: string, email: string, password: string):  Promise<UserInfo>;
    deleteSignedInUser(userInfo: UserInfo): Promise<void>;
    logIn(email: string, password: string): Promise<UserInfo | null>;
}