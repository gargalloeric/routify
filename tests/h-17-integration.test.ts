import {afterAll, expect, test, vi} from "vitest";
import {getUserManager} from "../src/services/UserManager";
import {getRouteFromPlacesNames} from "../src/services/ORSAdapter";
import {Transport} from "../src/model/Transport";
import {Route} from "../src/model/Route";
import {UserInfo} from "../src/model/UserInfo";

vi.mock('../src/services/FirebaseAuthService.ts', () => {
    const FirebaseAuthService = vi.fn()
    FirebaseAuthService.prototype.logIn = vi.fn().mockImplementation((email, password) => {
        return new UserInfo("1", email, "Jose")});
    return { FirebaseAuthService }
});

afterAll(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
});


// E01 - Válido
// Given: No hay rutas guardadas en la base de datos.
// When: se quiere guardar una ruta de Castellón a Valencia para visualizarla más adelante.
// Then: se almacena la ruta asociada al usuario en la base de datos.

test('saveRoute_UserRegisteredDBAvailableRouteNotSaved_SaveRoute', async () => {
    vi.mock('../src/services/FirebaseDBService.ts', () => {
        const FirebaseDBService = vi.fn()
        FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true)
        FirebaseDBService.prototype.fetchUserInfo = vi.fn().mockResolvedValue(true)
        return { FirebaseDBService }
    });
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';
    const route : Route = await getRouteFromPlacesNames("Madrid", "Valencia, España", Transport.Car);

    // tests methods
    const userManager = getUserManager();
    await userManager.logIn(email, password);

    const registered = await userManager.saveRoute(route, "Test Route");
    expect(registered).toBe(true);

    // delete what is done
    await userManager.deleteRoute("Test Route");
    vi.doUnmock('../src/services/FirebaseDBService.ts');
});

// E02 - Inválido
// Given: el usuario de la aplicación ha elegido una ruta entre Castellón y Valencia, y la ruta estaba guardada previamente.
// When: se quiere guardar la ruta para visualizarla más adelante.
// Then: se muestra la excepción RouteAlreadySaved.

test('saveRoute_UserAlreadyHasTheSameRoute_ThrowAlreadySavedException', async () => {
    vi.mock('../src/services/FirebaseDBService.ts', () => {
        const FirebaseDBService = vi.fn()
        FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true)
        FirebaseDBService.prototype.fetchUserInfo = vi.fn().mockImplementation((userInfo : UserInfo) => {
            userInfo.routes["Test Route 2"] = new Route(
                undefined,
                "Madrid",
                "Valencia, España",
                Transport.Car,
                2000,
                "Test Route 2"
            );
        })
        return { FirebaseDBService }
    });
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const route : Route = await getRouteFromPlacesNames("Madrid", "Valencia, España", Transport.Car);

    // tests methods
    const userManager = getUserManager();
    await userManager.logIn(email, password);
    await expect(() => userManager.saveRoute(route, "Test Route 2")).rejects.toThrowError('Route already saved');
});
