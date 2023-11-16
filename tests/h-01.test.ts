import { expect, test } from "vitest";
import {UserManager, getUserManager} from "../src/services/UserManager";

test('registerUser_ValidInputs_RegisterUser', () => {
    const name: string = 'Jose',
        email: string = 'jose@gmail.com',
        password: string = 'aS0@28Y?',
        repPassword: string = 'aS0@28Y?'

    expect(getUserManager().register(name, email, password, repPassword)).toBe(email)
})

test('registerUser_InvalidPassword_ThrowPasswordNotValidException', () => {
    let name: string = 'Jose',
        email: string = 'jose@gmail.com',
        password: string = 'S438w',
        repPassword: string = 'S438w'

    expect(() => getUserManager().register(name, email, password, repPassword)).toThrowError('password not valid')
})
