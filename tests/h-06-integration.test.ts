import { expect, test, afterAll, vi} from "vitest";
import {getUserManager} from "../src/services/UserManager";
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

// E01 - Válido
// Given: no hay ningún lugar de interés almacenado en la base de datos.
// When: se intenta almacenar un lugar de interés con el topónimo “Castellón de la Pana”, cuyas coordenadas son válidas.
// Then: se crea y se almacena el lugar de interés {“latitude” : ”39.985221675763185”, “longitude” : “-0.04995146905318167”, “place_name”: “Castellón de la Plana”}.

test('registerPlaceFromPlaceName_UserRegisteredDBAvailablePlaceApiAvailableValidInputs_RegisterPlace', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const placeName = "Castellón de la Plana";

    // mock ors
    const ORS = await import('../src/services/ORS');
    ORS.obtainCoordsFromName = vi.fn().mockResolvedValueOnce(
        { properties: { name: 'Castellón de la plana' }, geometry: { coordinates: [39.9864, -0.0513] }} )

    // tests methods
    const userManager = getUserManager()
    await userManager.logIn(email, password);
    await getUserManager().deletePlace(placeName)

    const registered = await userManager.registerPlaceFromPlaceName(placeName)
    expect(registered).toBe(true)
})

// E02 - Inválido
// Given: no hay ningún lugar de interés almacenado en la base de datos.
// When: se intenta almacenar un lugar de interés con el topónimo “ewgsgbds”.
// Then: se lanza la excepción PlaceNameNotFoundException.

test('registerPlaceFromPlaceName_UserRegisteredPlaceApiAvailablePlaceNameNotValid_throwPlaceNameNotFoundException', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const placeName: string = "ewgsgbds";

    // mock ors
    const ORS = await import('../src/services/ORS');
    ORS.obtainCoordsFromName = vi.fn().mockImplementationOnce(() => {throw Error('Place name not valid')})

    // tests methods
    const userManager = getUserManager()
    await userManager.logIn(email, password);

    await expect(() => userManager.registerPlaceFromPlaceName(placeName)).rejects.toThrowError('Place name not valid')
})
