import { expect, test } from "vitest";
import {UserManager, getUserManager} from "../src/services/UserManager";

test('logInUser_ValidInputs_logInUser', () => {
    let email: string = 'jose@gmail.com',
        password: string = 'aS0@28Y?';

    let userManager: UserManager = getUserManager();
    expect(userManager.logIn(email, password)).toBe(email);
})

test('logInUser_InvalidPassword_notLogInUser', () => {
    let email: string = 'jose@gmail.com',
        password: string = 'S438w'

    let userManager: UserManager = getUserManager();
    expect(() => userManager.logIn(email, password)).toThrowError('password not valid')
})