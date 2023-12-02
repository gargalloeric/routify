import {expect, test, beforeAll, vi} from "vitest";
import {getUserManager, UserManager} from "../src/services/UserManager";
import {UserInfo} from "../src/model/UserInfo";


vi.mock('../src/services/FirebaseAuthService.ts', () => {
    const FirebaseAuthService = vi.fn()
    FirebaseAuthService.prototype.register = vi.fn().mockImplementation((name, email, password) => {
        return new UserInfo("1", email, name) });
    return { FirebaseAuthService }
})

vi.mock('../src/services/FirebaseDBService.ts', () => {
    const FirebaseDBService = vi.fn()
    FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true)
    return { FirebaseDBService }
})

test('registerUser_ValidInputs_RegisterUser', async () => {
    const name: string = 'Jose',
        email: string = 'fake.jose@notamail.not',
        password: string = 'aS0@28Y?',
        repPassword: string = 'aS0@28Y?'

    const mail = await getUserManager().register(name, email, password, repPassword)
    expect(mail).toBe(email)
})

test('registerUser_InvalidPassword_ThrowPasswordNotValidException', async () => {
    let name: string = 'Jose',
        email: string = 'jose@gmail.com',
        password: string = 'S438w',
        repPassword: string = 'S438w'

    await expect(() => getUserManager().register(name, email, password, repPassword)).rejects.toThrowError('Password not valid')
})
