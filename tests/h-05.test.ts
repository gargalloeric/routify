import { expect, test } from "vitest";
import {getUserManager} from "../src/services/UserManager";
import {Coordinates} from "../src/model/Coordinates";


// E01 - Válido
// Given: no hay ningún lugar de interés almacenado en la base de datos.
// When: se intenta almacenar un lugar de interés con las coordenadas “(39.992715699677966, -0.06730591306542232)”, cuyo topónimo existe.
// Then: se crea y se almacena el lugar de interés {“latitude” : “39.992715699677966,”, “longitude” : “-0.06730591306542232”, “place_name”: “Escola Superior de Tecnologia i Ciències Experimentals”}.

test('registerPlaceFromPlaceCoords_UserRegisteredDBAvailablePlaceApiAvailableValidInputs_RegisterPlace', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const placeCoords : Coordinates = new Coordinates(39.992715699677966, -0.06730591306542232);

    // tests methods
    const userManager = getUserManager();
    await userManager.logIn(email, password);
    await getUserManager().deletePlace("Escola Superior de Tecnologia i Ciències Experimentals").catch(() => {});

    const registered = await userManager.registerPlaceFromPlaceCoords(placeCoords);
    expect(registered).toBe(true);
});

// E06 - Inválido
// Given: hay algún lugar de interés almacenado InterestLocations = [ {“latitude” : “39.992715699677966, “longitude” : “-0.06730591306542232”, “place_name”: “Escola Superior de Tecnologia i Ciències Experimentals”}].
// When: se intenta almacenar un lugar de interés ya almacenado “(39.992715699677966, -0.06730591306542232)”
// Then: se lanza la excepción CoordinatesAlreadyStoredException.

test('registerPlaceFromPlaceCoords_UserRegisteredPlaceApiAvailablePlaceAlreadySaved_throwPlaceAlreadySavedException', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const placeCoords : Coordinates  = new Coordinates(39.992715699677966, -0.06730591306542232);
    // tests methods
    const userManager = getUserManager();
    await userManager.logIn(email, password);

    await expect(() => userManager.registerPlaceFromPlaceCoords(placeCoords)).rejects.toThrowError('Place already saved');
});
