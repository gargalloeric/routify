import { test, expect } from "vitest";
import { getUserManager } from "../src/services/UserManager";

test('deleteVehicle_UserLoggedInVehicleExists_VehicleDeleted', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const matricula: string = "1414XLX",
        nombre: string = "nave galáctica",
        tipoMotor: string = "combustión",
        consumo100Km: number = 5;

    const userManager = getUserManager();
    await userManager.logIn(email, password);
    await userManager.registerVehicle(matricula, nombre, tipoMotor, consumo100Km);

    let result = await userManager.deleteVehicle(matricula);
    expect(result).toBe(true);

    // We can't delete a vehicle that doesn't exists
    result = await userManager.deleteVehicle(matricula);
    expect(result).toBe(false);

})

test('deleteVehicle_UserNotLoggedInVehicleExists_ThrowUserNotLoggedInException', async () => {
    const email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const matricula: string = "1414XLX",
        nombre: string = "nave galáctica",
        tipoMotor: string = "combustión",
        consumo100Km: number = 5;

    const userManager = getUserManager();
    await userManager.logIn(email, password);
    await userManager.registerVehicle(matricula, nombre, tipoMotor, consumo100Km);

    userManager.userInfo = null;
    await expect(userManager.deleteVehicle(matricula)).rejects.toThrowError('User not logged in');

    // We log in again and delete the vehicle
    await userManager.logIn(email, password);
    await userManager.deleteVehicle(matricula).catch(() => {});

})