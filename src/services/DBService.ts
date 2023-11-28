import {UserInfo} from "../model/UserInfo.ts";

export interface DBService {
    saveUserInfo(userInfo: UserInfo): Promise<void>;
}