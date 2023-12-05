import { expect, test } from "vitest";
import { getUserManager } from "../src/services/UserManager";

test('getListOfVehicles_TwoVehiclesStored_ObtainListOfVehicles', async () => {
    // Given: the user is logged in
    let email: string = 'edu.jose@gmail.com',
        password: string = 'aS0@28Y?';

    const userManager = getUserManager();
    await userManager.logIn(email, password);

    // And: There are two vehicles registered
    const matricula1: string = "1212XLX",
    nombre1: string = "nave galáctica",
    tipoMotor1: string = "combustion",
    consumo100Km1: number = 5;

    const matricula2: string = "1414XLX",
    nombre2: string = "tractor amarillo",
    tipoMotor2: string = "combustion",
    consumo100Km2: number = 20;

    await userManager.registerVehicle(matricula1, nombre1, tipoMotor1, consumo100Km1);
    await userManager.registerVehicle(matricula2, nombre2, tipoMotor2, consumo100Km2);

    // When: access the list of vehicles
    const listOfVehicles = await userManager.getListOfVehicles();

    // Then: a list of the stored vehicles is obtained
    expect(listOfVehicles.length).toBe(2);
    expect(listOfVehicles[0].matricula).toBe("1212XLX");
    expect(listOfVehicles[1].matricula).toBe("1414XLX");
})

test('getListOfVehicles_UserNotLoggedIn_ThrowUserNotLoggedInException', async () => {
    // Given: the user is not logged in
    const userManager = getUserManager();

    // When: access the list of vehicles
    // Then: An error is thrown
    await expect(() => { userManager.getListOfVehicles() }).rejects.toThrowError('User not logged in');
})