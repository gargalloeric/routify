import { expect, test } from "vitest";
import { getUserManager } from "../src/services/UserManager";

test('getListOfPlaces_UserHasTwoPlacesStoredDBAvailable_ObtainListOfPlaces', async () => {
    // Given: the user is logged in
    let email: string = 'edu2.jose@notamail.not',
        password: string = 'aS0@28Y?';

    const userManager = getUserManager();
    await userManager.logIn(email, password);

    // And: There are two places stored
    const nombre1: string = "Castellón de la Plana",
        nombre2: string = "Universidad Jaume I";

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