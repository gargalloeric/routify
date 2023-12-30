import { expect, test, afterAll, vi } from "vitest";
import { getUserManager } from "../src/services/UserManager";
import {UserInfo} from "../src/model/UserInfo";


vi.mock('../src/services/ORS');

vi.mock('../src/services/FirebaseAuthService.ts', () => {
    const FirebaseAuthService = vi.fn()
    FirebaseAuthService.prototype.logIn = vi.fn().mockImplementation((email, password) => {
        return new UserInfo("1", email, "Jose Edu")});
    return { FirebaseAuthService }
});

vi.mock('../src/services/FirebaseDBService.ts', () => {
    const FirebaseDBService = vi.fn()
    FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true)
    FirebaseDBService.prototype.fetchUserInfo = vi.fn()
    return { FirebaseDBService }
});

afterAll(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
});


test('getListOfPlaces_UserHasTwoPlacesStoredDBAvailable_ObtainListOfPlaces', async () => {
    // Given: the user is logged in
    let email: string = 'edu2.jose@notamail.not',
        password: string = 'aS0@28Y?';

    const userManager = getUserManager();
    await userManager.logIn(email, password);

    // And: There are two places stored
    const nombre1: string = "Castellón de la Plana",
        nombre2: string = "Universidad Jaume I";

    // mock ors to allow register
    const ORS = await import('../src/services/ORS');
    ORS.obtainCoordsFromName = vi.fn()
        .mockResolvedValueOnce(
            { properties: { name: 'Castellón de la plana' }, geometry: { coordinates: [39.9864, -0.0513] }} )
        .mockResolvedValueOnce(
            { properties: { name: 'Universidad Jaume I' }, geometry: { coordinates: [39.9864, -0.0513] }} )

    // Try to register the places if they don't exist
    await userManager.registerPlaceFromPlaceName(nombre1).catch(() => {});
    await userManager.registerPlaceFromPlaceName(nombre2).catch(() => {});

    // When: access the list of places
    const listOfPlaces = userManager.getListOfPlaces();

    // Then: a list of the stored places is obtained
    expect(Object.keys(listOfPlaces).length).toBe(2);
    expect(listOfPlaces[nombre1]).toBeDefined();
    expect(listOfPlaces[nombre2]).toBeDefined();
})

test('getListOfPlaces_UserNotLoggedIn_ThrowUserNotLoggedInException', () => {
    // Given: the user is not logged in
    const userManager = getUserManager();
    userManager.logOut();

    // When: access the list of places
    // Then: An error is thrown
    expect(() => { userManager.getListOfPlaces() }).toThrowError('User must be logged in to list places');
})