import { expect, test } from "vitest";
import {UserManager, getUserManager} from "../src/services/UserManager";

test('registerUser_ValidInputs_RegisterUser', async () => {
    const name: string = 'Jose',
        email: string = 'jose@gmail.com',
        password: string = 'aS0@28Y?',
        repPassword: string = 'aS0@28Y?'
    let mail = await getUserManager().register(name, email, password, repPassword)
    expect(mail).toBe(email)
})

test('registerUser_InvalidPassword_ThrowPasswordNotValidException', async () => {
    let name: string = 'Jose',
        email: string = 'jose@gmail.com',
        password: string = 'S438w',
        repPassword: string = 'S438w'

    await expect(() => getUserManager().register(name, email, password, repPassword)).rejects.toThrowError('Password not valid')
})
