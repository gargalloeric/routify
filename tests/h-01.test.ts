import { expect, test } from "vitest";
import {UserManager} from "../src/services/UserManager";

test('registerUser_ValidInputs_RegisterUser', () => {
    let name: string = 'Jose',
        email: string = 'jose@gmail.com',
        password: string = 'aS0@28Y?',
        repPassword: string = 'aS0@28Y?'

    let userManager: UserManager = UserManager.getManager()
    userManager.register(name, email, password, repPassword)
})

test('registerUser_InvalidPassword_ThrowPasswordNotValidException', () => {
    let name: string = 'Jose',
        email: string = 'jose@gmail.com',
        password: string = 'S438w',
        repPassword: string = 'S438w'

    let userManager: UserManager = UserManager.getManager()
    expect(() => userManager.register(name, email, password, repPassword)).toThrowError('password not valid')
})
