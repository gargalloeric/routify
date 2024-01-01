import { test, expect } from "vitest";
import { getUserManager } from "../src/services/UserManager";

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