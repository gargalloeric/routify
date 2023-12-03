import {afterAll, expect, test, vi} from "vitest";
import {getUserManager} from "../src/services/UserManager";


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

test('logInUser_ValidInputs_logInUser', async () => {
    let email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    let mail = await getUserManager().logIn(email, password)
    expect(mail).toBe(email);
})

test('logInUser_InvalidPassword_notLogInUser', async () => {
    let email: string = 'inexistente.jose@gmail.com',
        password: string = 'S438w?'

    await expect(() => getUserManager().logIn(email, password)).rejects.toThrowError('Password not valid')
})