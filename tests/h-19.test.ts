import {expect, test} from "vitest";
import {Route} from "../src/model/Route";
import {getRouteFromPlacesNames} from "../src/services/ORSAdapter";
import {Transport} from "../src/model/Transport";
import {getUserManager} from "../src/services/UserManager";

// E01 - Válido
// Given: existe la ruta “Castellón” - “Valencia” almacenada por el usuario.
// When: se intenta eliminar la ruta “Castellón” - “Valencia”.
// Then: se elimina la ruta “Castellón” - “Valencia” de la lista del usuario.
test('deleteRoute_UserRegisteredDBAvailableRouteSaved_deleteRoute', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';
    const route : Route = await getRouteFromPlacesNames("Castellon", "Valencia, España", Transport.Car);

    const userManager = getUserManager();
    await userManager.logIn(email, password);

    await userManager.saveRoute(route, "Test Route h-19");

    expect(() => userManager.deleteRoute("Test Route h-19")).not.toThrowError('Route not found');
});