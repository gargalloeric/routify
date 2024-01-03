import { expect, test } from "vitest";
import {UserManager, getUserManager} from "../src/services/UserManager";

test('logOutUser_UserLoggedIn_logOutUser', async () => {
    let email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    await getUserManager().logIn(email, password)
    expect(() => getUserManager().logOut()).not.toThrowError('')
})

test('logOutUser_NoUserIsLoggedIn_throwUserNotLoggedInException', async () => {
    expect(() => getUserManager().logOut()).toThrowError('User must be logged in to log out')
})