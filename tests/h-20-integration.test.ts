import {expect, test, vi, afterAll} from "vitest";
import {getUserManager} from "../src/services/UserManager";
import {UserInfo} from "../src/model/UserInfo";


vi.mock('../src/services/FirebaseAuthService.ts', () => {
    const FirebaseAuthService = vi.fn()
    FirebaseAuthService.prototype.logIn = vi.fn().mockImplementation((email, password) => {
        return new UserInfo("1", email, "") });
    return { FirebaseAuthService }
})

vi.mock('../src/services/FirebaseDBService.ts', () => {
    const FirebaseDBService = vi.fn()
    FirebaseDBService.prototype.fetchUserInfo = vi.fn()
    FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true)
    return { FirebaseDBService }
})

afterAll(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
});

// E01 - Inválido
// Given: el elemento está marcado como favorito
// When: se intenta marcar como favorito
// Then: se lanza la excepción AlreadyFavouriteException
test('markVehicleAsFavourite_UserHasVehicleAlreadyMarked_throwAlreadyFavouriteException', async () => {
    // Given: the user is logged in
    let email: string = 'edu2.jose@notamail.not',
        password: string = 'aS0@28Y?';

    const userManager = getUserManager();
    await userManager.logIn(email, password);

    // Given user has vehicle
    const matricula1: string = "1212XLX", nombre1: string = "nave galáctica", tipoMotor1: string = "combustión", consumo100Km1: number = 5;
    await userManager.registerVehicle(matricula1, nombre1, tipoMotor1, consumo100Km1).catch(() => {});
    // Given vehicle is marked
    await userManager.markVehicleAsFavourite(matricula1).catch(() => {})

    // Try to mark - throw error
    await expect(() => userManager.markVehicleAsFavourite(matricula1)).rejects.toThrowError('already marked as favourite');
});

// E02 - Válido
// Given: el elemento no está marcado como favorito
// When: se intenta marcar como favorito
// Then: se marca como favorito

test('markVehicleAsFavourite_UserHasVehicleNotMarked_markVehicleAsFavourite', async () => {
    // Given: the user is logged in
    let email: string = 'edu2.jose@notamail.not',
        password: string = 'aS0@28Y?';

    const userManager = getUserManager();
    await userManager.logIn(email, password);

    // Given user has vehicle
    const matricula2: string = "1414XLX", nombre2: string = "tractor amarillo", tipoMotor2: string = "combustión", consumo100Km2: number = 20;
    await userManager.registerVehicle(matricula2, nombre2, tipoMotor2, consumo100Km2).catch(() => {});
    // Given vehicle is not marked
    await userManager.unmarkVehicleAsFavourite(matricula2).catch(() => {});

    // Try to mark - mark
    const marked = await userManager.markVehicleAsFavourite(matricula2);
    expect(marked).toBe(true);
});