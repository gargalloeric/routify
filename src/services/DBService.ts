import {UserInfo} from "../model/UserInfo.ts";

export interface DBService {
    saveUserInfo(userInfo: UserInfo): Promise<void>;
    deleteUser(userInfo: UserInfo): Promise<void>;
    fetchUserInfo(userInfo: UserInfo): Promise<void>;
}