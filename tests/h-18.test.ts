import { expect, test } from "vitest";
import { getUserManager } from "../src/services/UserManager";
import {Route} from "../src/model/Route";
import {getRouteFromPlacesNames} from "../src/services/ORSAdapter";
import {Transport} from "../src/model/Transport";

test('getListOfRoutes_TwoRoutesStored_ObtainListOfRoutes', async () => {
    // Given: the user is logged in
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const userManager = getUserManager();
    await userManager.logIn(email, password);

    // Given: has a route
    const route1 : Route = await getRouteFromPlacesNames("Valencia, España", "Castellón de la Plana", Transport.Car);
    const route2 : Route = await getRouteFromPlacesNames("Madrid", "Valencia, España", Transport.Car);

    await userManager.saveRoute(route1, "Test Route 2")
        .catch((err) => {}); // route already saved
    await userManager.saveRoute(route2, "Test Route 3")
        .catch((err) => {}); // route already saved

    // When: access the list of routes
    const listOfRoutes = userManager.getListOfRoutes();

    // Then: a list of the stored routes is obtained
    expect(Object.keys(listOfRoutes).length).toBe(2);
    expect(listOfRoutes['Test Route 2']).toBeDefined();
})

test('getListOfRoutes_UserNotLoggedIn_ThrowUserNotLoggedInException', () => {
    // Given: the user is not logged in
    const userManager = getUserManager();
    userManager.logOut();

    // When: access the list of routes
    // Then: An error is thrown
    expect(() => { userManager.getListOfRoutes() }).toThrowError('User must be logged in to list routes');
})