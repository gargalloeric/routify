import { expect, test, vi, afterAll } from "vitest";
import {getUserManager} from "../src/services/UserManager";
import {UserInfo} from "../src/model/UserInfo";


vi.mock('../src/services/FirebaseAuthService.ts', () => {
    const FirebaseAuthService = vi.fn()
    FirebaseAuthService.prototype.logIn = vi.fn().mockImplementation((email, password) => {
        return new UserInfo("1", email, "") });
    return { FirebaseAuthService }
})

vi.mock('../src/services/FirebaseDBService.ts', () => {
    const FirebaseDBService = vi.fn()
    FirebaseDBService.prototype.fetchUserInfo = vi.fn()
    return { FirebaseDBService }
})

afterAll(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
});


test('logOutUser_UserLoggedIn_logOutUser', async () => {
    let email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    await getUserManager().logIn(email, password)
    expect(() => getUserManager().logOut()).not.toThrowError('')
})

test('logOutUser_NoUserIsLoggedIn_throwUserNotLoggedInException', async () => {
    expect(() => getUserManager().logOut()).toThrowError('User must be logged in to log out')
})