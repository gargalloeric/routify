import { expect, test } from "vitest";
import {getUserManager} from "../src/services/UserManager";
import L, {latLng} from "leaflet";


// E01 - Válido
// Given: no hay ningún lugar de interés almacenado en la base de datos.
// When: se intenta almacenar un lugar de interés con las coordenadas “(39.99447958251366, -0.07022543179411124)”, cuyo topónimo existe.
// Then: se crea y se almacena el lugar de interés {“latitude” : “39.99447958251366”, “longitude” : “-0.07022543179411124”, “place_name”: “Castellón de la Plana”}.

test('registerPlaceFromPlaceCoords_UserRegisteredDBAvailablePlaceApiAvailableValidInputs_RegisterPlace', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const placeCoords : L.LatLng = [39.99447958251366, -0.07022543179411124];

    // tests methods
    const userManager = getUserManager();
    await userManager.logIn(email, password);


    const registered = await userManager.registerPlaceFromPlaceCoords(placeCoords);
    expect(registered).toBe(true);
    await getUserManager().deletePlaceCoords(placeCoords);
})
