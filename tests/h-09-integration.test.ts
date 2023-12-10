import {afterAll, afterEach, expect, test, vi} from "vitest";
import {getUserManager} from "../src/services/UserManager";
import {UserInfo} from "../src/model/UserInfo";
import {Vehicle} from "../src/model/Vehicle";


// E01 - Válido
// Given: el usuario está logueado
// And: hay conexión con la bbdd
// And: no hay ningún vehículo con los datos {matricula: 1212XLX, nombre: nave galáctica, tipo-motor: combustión, consumo-100-km: 5} almacenado.
//     When: se intenta almacenar un vehículo con los datos matricula ‘1212XLX’, nombre ‘nave galáctica’, tipo de motor ‘combustión’ y consumo a los 100 kilómetros ‘5’.
// Then: se crea y se almacena el vehículo {matricula: 1212XLX, nombre: nave galáctica, tipo-motor: combustión, consumo-100-km: 5}

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


test('registerVehicle_UserRegisteredDBAvailableValidInputs_RegisterVehicle', async () => {
    vi.mock('../src/services/FirebaseDBService.ts', () => {
        const FirebaseDBService = vi.fn()
        FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true)
        FirebaseDBService.prototype.fetchUserInfo = vi.fn().mockResolvedValue(true)
        return { FirebaseDBService }
    });
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const matricula: string = "1212XLX",
        nombre: string = "nave galáctica",
        tipoMotor: string = "combustión",
        consumo100Km: number = 5;

    // tests methods
    const userManager = getUserManager();
    await userManager.logIn(email, password);
    const registered = await userManager.registerVehicle(matricula, nombre, tipoMotor, consumo100Km);
    expect(registered).toBe(true);

    // delete what is done
    await getUserManager().deleteVehicle(matricula);
    vi.doUnmock('../src/services/FirebaseDBService.ts');
});

// E03 - Inválido
// Given: el usuario está logueado
// And: hay conexión con la bbdd
// And: hay ya un vehículo con los datos {matricula: 1313XLX, nombre: nave galáctica 2, tipo-motor: combustión, consumo-100-km: 5} almacenado.
//     When: se intenta almacenar un vehículo ya almacenado con los datos matricula ‘1313XLX’, nombre ‘nave galáctica’, tipo de motor ‘combustión’ y consumo a los 100 kilómetros ‘5’.
// Then: se lanza la excepción VehicleAlreadyStoredException.

test('registerVehicle_UserAlreadyHasVehicle_ThrowVehicleAlreadyStoredException', async () => {
    vi.mock('../src/services/FirebaseDBService.ts', () => {
        const FirebaseDBService = vi.fn()
        FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true)
        FirebaseDBService.prototype.fetchUserInfo = vi.fn().mockImplementation((userInfo : UserInfo) => {
            userInfo.vehicles["1313XLX"] = new Vehicle(
                "1313XLX",
                "nave galáctica 2",
                "combustión",
                5
            );
        })
        return { FirebaseDBService }
    });
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const matricula: string = "1313XLX",
        nombre: string = "nave galáctica 2",
        tipoMotor: string = "combustión",
        consumo100Km: number = 5;

    // tests methods
    const userManager = getUserManager();
    await userManager.logIn(email, password);
    await expect(() => userManager.registerVehicle(matricula, nombre, tipoMotor, consumo100Km)).rejects.toThrowError('Vehicle already stored');
});
