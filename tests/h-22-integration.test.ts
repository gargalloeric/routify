import { test, expect, vi } from "vitest";
import { getUserManager } from "../src/services/UserManager";
import { RouteType } from "../src/model/Route";
import { validateLogInInfo } from "../src/services/Validators";
import { FirebaseAuthService } from "../src/services/FirebaseAuthService";
import { UserInfo } from "../src/model/UserInfo";
import { FirebaseDBService } from "../src/services/FirebaseDBService.ts";

vi.mock('../src/services/Validators.ts', () => ({
    validateLogInInfo: vi.fn().mockReturnValueOnce(null),
}))

vi.mock('../src/services/FirebaseAuthService.ts', () => {
    const FirebaseAuthService = vi.fn()
    FirebaseAuthService.prototype.logIn = vi.fn().mockImplementation((email, password) => {
        return new UserInfo('1', email, '');
    })

    return { FirebaseAuthService }
})

vi.mock('../src/services/FirebaseDBService.ts', () => {
    const FirebaseDBService = vi.fn()
    FirebaseDBService.prototype.fetchUserInfo = vi.fn()
    FirebaseDBService.prototype.saveUserInfo = vi.fn()

    return { FirebaseDBService }
})

test('setDefaultTypeOfRoute_UserIsLoggedInAndRouteTypeShortest_DefaultTypeOfRouteIsSet', async () => {
    const email: string = 'edu.jose@gmail.com';
    const password: string = 'aS0@28Y?';
    const userManager = getUserManager();
    const typeOfRoute = RouteType.Shortest

    await userManager.logIn(email, password);
    let ok = await userManager.setDefaultTypeOfRoute(typeOfRoute);
    expect(ok).toBe(true);

    expect(userManager.userInfo?.defaultTypeOfRoute as RouteType).toBe(RouteType.Shortest);
})

test('setDefaultTypeOfRoute_UserIsNotLoggedInAndRouteTypeShortest_ThrowUserNotLoggedInException', async () => {
    const userManager = getUserManager();
    userManager.userInfo = null;
    const typeOfRoute = RouteType.Shortest

    await expect(userManager.setDefaultTypeOfRoute(typeOfRoute)).rejects.toThrowError('User not logged in');
})