import { expect, test } from "vitest";
import {getUserManager} from "../src/services/UserManager";
import {Coordinates} from "../src/model/Coordinates";

// E01 - Válido
// Given: el usuario {nombre:”Jose”, email:”edu.jose@gmail.com”, password:”aS0@28Y?”} está logueado y existen lugares de interés almacenados [{“latitude” : ”39.987142”, “longitude” : “-0.037787
//“place_name”: “Castellón de la Plana”}, {“latitude” : ”39.994391421789956”, “longitude” : “-0.06987714539675184”, “place_name”: “Universidad Jaume I”}].
// When: se intenta eliminar el lugar de interés “Castellón de la Plana”.
// Then: se elimina de los lugares de interés {“latitude” : ”39.994391421789956”, “longitude” : “-0.06987714539675184”, “place_name”: “Castellón de la Plana”}.

test('deletePlace_UserRegisteredDBAvailablePlaceApiAvailableValidInputs_deletePlace', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    // tests methods
    const userManager = getUserManager();
    await userManager.logIn(email, password);

    expect(() => getUserManager().deletePlace("Castellón de la Plana")).not.toThrowError('Place not found');

});

// E02 - Inválido
// Given: el usuario {nombre:”Jose”, email:”edu.jose@gmail.com”, password:”aS0@28Y?”} está logueado y no existen lugares de interés almacenados.
// When: se intenta eliminar el lugar de interés “Castellón de la Plana”.
// Then: se lanza la excepción “InterestPlaceNotFoundException”.


test('deletePlace_UserRegisteredDBAvailablePlaceApiAvailableNoPlacesOnDB_ThrowPlaceNotFoundException', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    // tests methods
    const userManager = getUserManager();
    await userManager.logIn(email, password);

    expect(() => getUserManager().deletePlace("Castellón de la Plana")).rejects.toThrowError('Place not found');

    await userManager.registerPlaceFromPlaceName("Castellón de la Plana");
});

