import { expect, test } from "vitest";
import { getUserManager } from "../src/services/UserManager";

test('getListOfRoutes_TwoRoutesStored_ObtainListOfRoutes', async () => {
    // Given: the user is logged in
    let email: string = 'edu2.jose@notamail.not',
        password: string = 'aS0@28Y?';

    const userManager = getUserManager();
    await userManager.logIn(email, password);

    // TODO And: There are two routes registered
    // const matricula1: string = "1212XLX",
    // nombre1: string = "nave galáctica",
    // tipoMotor1: string = "combustión",
    // consumo100Km1: number = 5;
    //
    // const matricula2: string = "1414XLX",
    // nombre2: string = "tractor amarillo",
    // tipoMotor2: string = "combustión",
    // consumo100Km2: number = 20;
    //
    // const matricula3: string = "1212EEE",
    //     nombre3: string = "nave eléctrica",
    //     tipoMotor3: string = "eléctrico",
    //     consumo100Km3: number = 10;

    // TODO Try to register the routes if they don't exist
    // await userManager.registerVehicle(matricula1, nombre1, tipoMotor1, consumo100Km1).catch(() => console.log('Vehicle already registered'));
    // await userManager.registerVehicle(matricula2, nombre2, tipoMotor2, consumo100Km2).catch(() => console.log('Vehicle already registered'));
    // await userManager.registerVehicle(matricula3, nombre3, tipoMotor3, consumo100Km3).catch(() => console.log('Vehicle already registered'));

    // When: access the list of routes
    const listOfRoutes = userManager.getListOfRoutes();

    // Then: a list of the stored vehicles is obtained
    expect(Object.keys(listOfRoutes).length).toBe(2);
    expect(listOfRoutes['1212XLX']).toBeDefined();
    expect(listOfRoutes['1414XLX']).toBeDefined();
})

test('getListOfRoutes_UserNotLoggedIn_ThrowUserNotLoggedInException', () => {
    // Given: the user is not logged in
    const userManager = getUserManager();
    userManager.logOut();

    // When: access the list of vehicles
    // Then: An error is thrown
    expect(() => { userManager.getListOfRoutes() }).toThrowError('User must be logged in to list routes');
})