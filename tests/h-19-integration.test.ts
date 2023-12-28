import {afterAll, expect, test, vi} from "vitest";
import {Route} from "../src/model/Route";
import {getRouteFromPlacesNames} from "../src/services/ORSAdapter";
import {Transport} from "../src/model/Transport";
import {getUserManager} from "../src/services/UserManager";
import {UserInfo} from "../src/model/UserInfo";

vi.mock('../src/services/FirebaseAuthService.ts', () => {
    const FirebaseAuthService = vi.fn()
    FirebaseAuthService.prototype.logIn = vi.fn().mockImplementation((email, password) => {
        return new UserInfo("1", email, "Jose")});
    return { FirebaseAuthService }
});

vi.mock('../src/services/ORS');

vi.mock('../src/services/FirebaseDBService.ts', () => {
    const FirebaseDBService = vi.fn();
    FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true);
    FirebaseDBService.prototype.fetchUserInfo = vi.fn().mockResolvedValue(true);
    return { FirebaseDBService }
});

afterAll(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
});

// E01 - Válido
// Given: existe la ruta “Castellón” - “Valencia” almacenada por el usuario.
// When: se intenta eliminar la ruta “Castellón” - “Valencia”.
// Then: se elimina la ruta “Castellón” - “Valencia” de la lista del usuario.

const mockDataOrigin = { properties: { name: 'Castellón de la plana' }, geometry: { coordinates: [39.9864, -0.0513] } }
const mockDataDestiny = { properties: { name: 'Valencia, España' }, geometry: { coordinates: [39.4699, -0.3763] } }
const mockDataRoute = { features: [ { properties: { summary: { distance: 70000 } } } ] };

test('deleteRoute_UserRegisteredDBAvailableRouteSaved_deleteRoute', async () => {
    const ORS = await import('../src/services/ORS');

    ORS.obtainCoordsFromName = vi.fn()
        .mockResolvedValueOnce(mockDataOrigin)
        .mockResolvedValueOnce(mockDataDestiny);

    ORS.obtainRoute = vi.fn()
        .mockResolvedValueOnce(mockDataRoute);


    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';
    const route : Route = await getRouteFromPlacesNames("Castellón de la plana", "Valencia, España", Transport.Car);

    const userManager = getUserManager();
    await userManager.logIn(email, password);

    await userManager.saveRoute(route, "Test Route h-19");

    expect(() => userManager.deleteRoute("Test Route h-19")).not.toThrowError('Route not found');
});

// E02 - Inválido
// Given: no existen rutas almacenadas por el usuario.
// When: se intenta eliminar la ruta “Castellón” - “Valencia”.
// Then: se lanza la excepción “RouteNotFoundException”.

test('deleteRoute_UserAlreadyDoesntHaveTheSameRoute_ThrowRouteNotFoundException', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const userManager = getUserManager();
    await userManager.logIn(email, password);

    expect(() => userManager.deleteRoute("Test Route h-19")).rejects.toThrowError('Route not found');
});