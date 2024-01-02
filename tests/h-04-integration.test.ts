import { test, expect, vi } from "vitest";
import { getUserManager } from "../src/services/UserManager";
import { validateRegistrationInfo, validateLogInInfo } from "../src/services/Validators";
import { FirebaseAuthService } from "../src/services/FirebaseAuthService";
import { UserInfo } from "../src/model/UserInfo";


vi.mock('../src/services/Validators', () => ({
    validateRegistrationInfo: vi.fn().mockReturnValueOnce(null),
    validateLogInInfo: vi.fn().mockReturnValueOnce(null)
}))

vi.mock('../src/services/FirebaseAuthService', () => {
    const FirebaseAuthService = vi.fn()
    FirebaseAuthService.prototype.register = vi.fn().mockImplementation((name, email, password, repassword) => {
        return new UserInfo('9', email, '');
    })
    FirebaseAuthService.prototype.logIn = vi.fn().mockImplementationOnce((email, password) => {
        return new UserInfo('1', email, '');
    }).mockRejectedValueOnce(new Error('Incorrect logIn info'))
    FirebaseAuthService.prototype.deleteSignedInUser = vi.fn()

    return { FirebaseAuthService }
})

vi.mock('../src/services/FirebaseDBService.ts', () => {
    const FirebaseDBService = vi.fn()
    FirebaseDBService.prototype.fetchUserInfo = vi.fn()
    FirebaseDBService.prototype.saveUserInfo = vi.fn()
    FirebaseDBService.prototype.deleteUser = vi.fn()

    return { FirebaseDBService }
})

test('deleteAccount_UserLoggedIn_AccountDeleted', async () => {
    const name: string = 'Paco';
    const email: string = 'paco@gmail.com';
    const password: string = 'aS0@28Y?';
    const repPassword: string = 'aS0@28Y?';

    await getUserManager().register(name, email, password, repPassword);
    await getUserManager().logIn(email, password);

    let ok = await getUserManager().deleteAccount();

    expect(ok).toBe(true);
    await expect(getUserManager().logIn(email, password)).rejects.toThrow('Incorrect logIn info');
})

test('deleteAccount_UserNotLoggedIn_ThrowUserNotLoggedInException', async () => {
    await expect(getUserManager().deleteAccount()).rejects.toThrow('User not logged in');
})