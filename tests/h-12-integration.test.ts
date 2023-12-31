import {afterAll, expect, test, vi} from "vitest";
import {getUserManager} from "../src/services/UserManager";
import {Vehicle} from "../src/model/Vehicle";
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
// Given: hay un vehículo con los datos {“nombre”: “nave galáctica”, “tipo-motor”: “combustión”, “consumo-100-km”: “5”} almacenado
// When: se intenta modificar el tipo de motor del vehículo con el nombre ‘nave galáctica’ a eléctrico
// Then: se modifican y se guardan los cambios sobre el vehículo con nombre ‘nave galáctica’, que pasan a ser {“nombre”: “nave galáctica”, “tipo-motor”: “eléctrico”, “consumo-100-km”: “5”}
test('updateVehicle_UserRegisteredDBAvailableValidInputs_UpdateVehicle', async () => {
    vi.mock('../src/services/FirebaseDBService.ts', () => {
        const FirebaseDBService = vi.fn()
        FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true)
        FirebaseDBService.prototype.fetchUserInfo = vi.fn().mockImplementation((userInfo : UserInfo) => {
            userInfo.vehicles["1313XLX"] = new Vehicle(
                "1313XLJ",
                "nave galáctica",
                "combustión",
                5
            );
        })
        return { FirebaseDBService }
    });
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const matricula: string = "1212XLJ",
        nombre: string = "nave galáctica",
        tipoMotor: string = "combustión",
        consumo100Km: number = 5;

    // tests methods
    const userManager = getUserManager()
    await userManager.logIn(email, password);
    await getUserManager().deleteVehicle(matricula).catch(() => {})
    await userManager.registerVehicle(matricula, nombre, tipoMotor, consumo100Km).catch(() => {});

    const vehicle : Vehicle = userManager.getUserVehicle(matricula);
    expect(() => userManager.updateUserVehicle(new Vehicle(vehicle.matricula, vehicle.nombre, "eléctrico", vehicle.consumo100Km))).not.toThrowError('Invalid Vehicle');

    // delete what is done
    await getUserManager().deleteVehicle(matricula).catch(() => {})
    vi.doUnmock('../src/services/FirebaseDBService.ts');
});

// E03 - Inválido
// Given: hay un vehículo con los datos {“nombre”: “nave galáctica”, “tipo-motor”: “combustión”, “consumo-100-km”: “5”} almacenado
// When: se intenta modificar el tipo de motor del vehículo con el nombre ‘vehículo inexistente’ a eléctrico
// Then: se lanza la excepción InvalidVehicleException.

test('updateVehicle_UserRegisteredDBAvailableInValidInputs_ThrowInvalidVehicle', async () => {
    vi.mock('../src/services/FirebaseDBService.ts', () => {
        const FirebaseDBService = vi.fn()
        FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true)
        FirebaseDBService.prototype.fetchUserInfo = vi.fn().mockImplementation((userInfo : UserInfo) => {
            userInfo.vehicles["1313XLX"] = new Vehicle(
                "1313XLJ",
                "nave galáctica",
                "combustión",
                5
            );
        })
        return { FirebaseDBService }
    });
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const matricula: string = "1212XXJ",
        nombre: string = "nave galáctica",
        tipoMotor: string = "combustión",
        consumo100Km: number = 5;

    // tests methods
    const userManager = getUserManager()
    await userManager.logIn(email, password);
    await getUserManager().deleteVehicle(matricula).catch(() => {})
    await userManager.registerVehicle(matricula, nombre, tipoMotor, consumo100Km).catch(() => {});

    await expect(userManager.updateUserVehicle(new Vehicle("1212XXX", "vehiculo inexistente", "eléctrico", consumo100Km))).rejects.toThrowError('Invalid Vehicle');

    // delete what is done
    await getUserManager().deleteVehicle(matricula).catch(() => {})
});
