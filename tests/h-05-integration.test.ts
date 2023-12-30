import {afterAll, expect, test, vi} from "vitest";
import {getUserManager} from "../src/services/UserManager";
import {Coordinates} from "../src/model/Coordinates";
import {UserInfo} from "../src/model/UserInfo";
import {Route} from "../src/model/Route";
import {Transport} from "../src/model/Transport";
import {Place} from "../src/model/Place";

vi.mock('../src/services/FirebaseAuthService.ts', () => {
    const FirebaseAuthService = vi.fn()
    FirebaseAuthService.prototype.logIn = vi.fn().mockImplementation((email, password) => {
        return new UserInfo("1", email, "Jose")});
    return { FirebaseAuthService }
});

vi.mock('../src/services/ORS');

vi.mock('../src/services/FirebaseDBService.ts', () => {
    const FirebaseDBService = vi.fn()
    FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true)
    FirebaseDBService.prototype.fetchUserInfo = vi.fn().mockImplementation((userInfo : UserInfo) => {
        userInfo.places["Castellón de la Plana"] = new Place(
            "Castellón de la Plana",
            new Coordinates(39.992715699677966, -0.06730591306542232)
        );
        userInfo.places["Escola Superior de Tecnologia i Ciències Experimentals"] = new Place(
            "Escola Superior de Tecnologia i Ciències Experimentals",
            new Coordinates(39.992715699677966, -0.06730591306542232)
        );
    });
    return { FirebaseDBService }
});

afterAll(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
});

const mockDataOrigin = { properties: { name: 'Escola Superior de Tecnologia i Ciències Experimentals' }, geometry: { coordinates: [39.992715699677966, -0.06730591306542232] } }

// E01 - Válido
// Given: no hay ningún lugar de interés almacenado en la base de datos.
// When: se intenta almacenar un lugar de interés con las coordenadas “(39.992715699677966, -0.06730591306542232)”, cuyo topónimo existe.
// Then: se crea y se almacena el lugar de interés {“latitude” : “39.992715699677966,”, “longitude” : “-0.06730591306542232”, “place_name”: “Escola Superior de Tecnologia i Ciències Experimentals”}.

test('registerPlaceFromPlaceCoords_UserRegisteredDBAvailablePlaceApiAvailableValidInputs_RegisterPlace', async () => {
    const ORS = await import('../src/services/ORS');

    ORS.obtainNameFromCoords = vi.fn()
        .mockResolvedValueOnce(mockDataOrigin);

    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const placeCoords : Coordinates = new Coordinates(39.992715699677966, -0.06730591306542232);

    // tests methods
    const userManager = getUserManager();
    await userManager.logIn(email, password);
    await getUserManager().deletePlace("Escola Superior de Tecnologia i Ciències Experimentals");

    const registered = await userManager.registerPlaceFromPlaceCoords(placeCoords);
    expect(registered).toBe(true);
    vi.doUnmock('../src/services/FirebaseDBService.ts');
});

// E06 - Inválido
// Given: hay algún lugar de interés almacenado InterestLocations = [ {“latitude” : “39.992715699677966, “longitude” : “-0.06730591306542232”, “place_name”: “Escola Superior de Tecnologia i Ciències Experimentals”}].
// When: se intenta almacenar un lugar de interés ya almacenado “(39.992715699677966, -0.06730591306542232)”
// Then: se lanza la excepción CoordinatesAlreadyStoredException.

test('registerPlaceFromPlaceCoords_UserRegisteredPlaceApiAvailablePlaceAlreadySaved_throwPlaceAlreadySavedException', async () => {
    const ORS = await import('../src/services/ORS');
    ORS.obtainNameFromCoords = vi.fn()
        .mockResolvedValueOnce(mockDataOrigin);

    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const placeCoords : Coordinates  = new Coordinates(39.992715699677966, -0.06730591306542232);
    // tests methods
    const userManager = getUserManager();
    await userManager.logIn(email, password);

    await expect(() => userManager.registerPlaceFromPlaceCoords(placeCoords)).rejects.toThrowError('Place already saved');
});
