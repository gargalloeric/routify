import {afterAll, expect, test, vi} from "vitest";
import { getUserManager } from "../src/services/UserManager";
import {Route} from "../src/model/Route";
import {getRouteFromPlacesNames} from "../src/services/ORSAdapter";
import {Transport} from "../src/model/Transport";
import {UserInfo} from "../src/model/UserInfo";


vi.mock('../src/services/ORS')

const mockDataOrigin1 = { properties: { name: 'Castellón de la plana' }, geometry: { coordinates: [39.9864, -0.0513] } }
const mockDataDestiny1 = { properties: { name: 'Valencia, España' }, geometry: { coordinates: [39.4699, -0.3763] } }
const mockDataRoute1 = { features: [ { properties: { summary: { distance: 70000 } } } ] };

const mockDataOrigin2 = { properties: { name: 'Madrid' }, geometry: { coordinates: [39.9864, -0.0513] } }
const mockDataDestiny2 = { properties: { name: 'Valencia, España' }, geometry: { coordinates: [39.4699, -0.3763] } }
const mockDataRoute2 = { features: [ { properties: { summary: { distance: 500000 } } } ] };

vi.mock('../src/services/FirebaseAuthService.ts', () => {
    const mockUser = { email: 'edu.jose@gmail.com', password: 'aS0@28Y?' }
    const FirebaseAuthService = vi.fn()
    FirebaseAuthService.prototype.logIn = vi.fn().mockImplementation(() => new UserInfo("1", mockUser.email, ""));
    return { FirebaseAuthService }
})

vi.mock('../src/services/FirebaseDBService.ts', () => {
    const mockUser = { email: 'edu.jose@gmail.com', password: 'aS0@28Y?' }
    const FirebaseDBService = vi.fn()
    FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true)
    FirebaseDBService.prototype.fetchUserInfo = vi.fn()
    return { FirebaseDBService }
})

afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
})


test('getListOfRoutes_TwoRoutesStored_ObtainListOfRoutes', async () => {
    // Given: the user is logged in
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const userManager = getUserManager();
    await userManager.logIn(email, password);

    // TODO mock ORS¿?
    const ORS = await import('../src/services/ORS');

    ORS.obtainCoordsFromName = vi.fn()
        .mockResolvedValueOnce(mockDataOrigin1)
        .mockResolvedValueOnce(mockDataDestiny1)
        .mockResolvedValueOnce(mockDataOrigin2)
        .mockResolvedValueOnce(mockDataDestiny2);

    ORS.obtainRoute = vi.fn()
        .mockResolvedValueOnce(mockDataRoute1)
        .mockResolvedValueOnce(mockDataRoute2);

    // Given: has a route
    const route1 : Route = await getRouteFromPlacesNames("Valencia, España", "Castellón de la Plana", Transport.Car);
    const route2 : Route = await getRouteFromPlacesNames("Madrid", "Valencia, España", Transport.Car);

    // TODO mock UserManager
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