import { expect, test } from "vitest";
import { getUserManager } from "../src/services/UserManager";

test('getListOfVehicles_TwoVehiclesStored_ObtainListOfVehicles', async () => {
    // Given: the user is logged in
    let email: string = 'edu2.jose@notamail.not',
        password: string = 'aS0@28Y?';

    const userManager = getUserManager();
    await userManager.logIn(email, password);

    // And: There are two vehicles registered
    const matricula1: string = "1212XLX",
    nombre1: string = "nave galáctica",
    tipoMotor1: string = "combustión",
    consumo100Km1: number = 5;

    const matricula2: string = "1414XLX",
    nombre2: string = "tractor amarillo",
    tipoMotor2: string = "combustión",
    consumo100Km2: number = 20;

    // Try to register the vehicles if they don't exist
    await userManager.registerVehicle(matricula1, nombre1, tipoMotor1, consumo100Km1).catch(() => console.log('Already registered'));
    await userManager.registerVehicle(matricula2, nombre2, tipoMotor2, consumo100Km2).catch(() => console.log('Already registered'));

    // When: access the list of vehicles
    const listOfVehicles = userManager.getListOfVehicles();

    // Then: a list of the stored vehicles is obtained
    expect(Object.keys(listOfVehicles).length).toBe(2);
    expect(listOfVehicles['1212XLX']).toBeDefined();
    expect(listOfVehicles['1414XLX']).toBeDefined();
})

test('getListOfVehicles_UserNotLoggedIn_ThrowUserNotLoggedInException', () => {
    // Given: the user is not logged in
    const userManager = getUserManager();
    userManager.userInfo = null;

    // When: access the list of vehicles
    // Then: An error is thrown
    expect(() => { userManager.getListOfVehicles() }).toThrowError('User must be logged in to list vehicles');
})