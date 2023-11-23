import { expect, test } from "vitest";
import {UserManager, getUserManager} from "../src/services/UserManager";

test('logInUser_ValidInputs_logInUser', async () => {
    let email: string = 'jose@gmail.com',
        password: string = 'aS0@28Y?';

    let mail = await getUserManager().logIn(email, password)
    expect(mail).toBe(email);
})

test('logInUser_InvalidPassword_notLogInUser', async () => {
    let email: string = 'jose@gmail.com',
        password: string = 'S438w'

    await expect(() => getUserManager().logIn(email, password)).rejects.toThrowError('Password not valid')
})