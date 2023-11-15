import { expect, test } from "vitest";
import {UserManager} from "../src/services/UserManager";

test('logInUser_ValidInputs_logInUser', () => {
    let email: string = 'jose@gmail.com',
        password: string = 'aS0@28Y?'

    let userManager: UserManager = UserManager.getManager()
    userManager.logIn(email, password)
})

test('logInUser_InvalidPassword_notLogInUser', () => {
    let email: string = 'jose@gmail.com',
        password: string = 'S438w'

    let userManager: UserManager = UserManager.getManager()
    expect(() => userManager.logIn(email, password)).toThrowError('password not valid')
})