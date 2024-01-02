import {expect, test} from "vitest";
import {getUserManager} from "../src/services/UserManager";
import {Vehicle} from "../src/model/Vehicle";

// E01 - Inválido
// Given: el vehículo/modo de transporte está marcado como por defecto.
// When: se intenta marcar como por defecto.
// Then: se lanza la excepción AlreadyDefaultException.

test('defaultVehicle_UserRegisteredDBAvailableVehicleAlreadyDefault_ThrowVehicleAlreadyDefaultException', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const matricula: string = "1111XLX",
        nombre: string = "nave galáctica",
        tipoMotor: string = "combustión",
        consumo100Km: number = 5;

    // tests methods
    const userManager = getUserManager()
    await userManager.logIn(email, password);
    await getUserManager().deleteVehicle(matricula).catch(() => {})
    await userManager.registerVehicle(matricula, nombre, tipoMotor, consumo100Km).catch(() => {})
    await userManager.setDefaultVehicle(matricula).catch(() => {});

    await expect(userManager.setDefaultVehicle(matricula)).rejects.toThrowError("Vehicle is already default");

    // delete what is done
    await getUserManager().deleteVehicle(matricula).catch(() => {})
});

// E02 - Válido
// Given: el vehículo/modo de transporte no está marcado como por defecto
// When: se intenta marcar como por defecto.
// Then: se marca como por defecto.
// And: el vehículo/modo de transporte que estaba marcado por defecto deja de estarlo.

test('defaultVehicle_UserRegisteredDBAvailableVehicleNotDefault_DefaultVehicle', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const matricula: string = "1111XXX",
        nombre: string = "nave galáctica",
        tipoMotor: string = "combustión",
        consumo100Km: number = 5;

    // tests methods
    const userManager = getUserManager()
    await userManager.logIn(email, password);
    await getUserManager().deleteVehicle(matricula).catch(() => {})
    await userManager.registerVehicle(matricula, nombre, tipoMotor, consumo100Km).catch(() => {})

    await expect(() => userManager.setDefaultVehicle(matricula)).not.toThrowError();

    // delete what is done
    await getUserManager().deleteVehicle(matricula).catch(() => {})
});