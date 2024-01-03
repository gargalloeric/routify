import { test, expect } from "vitest";
import { getUserManager } from "../src/services/UserManager";
import { RouteType } from "../src/model/Route";

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