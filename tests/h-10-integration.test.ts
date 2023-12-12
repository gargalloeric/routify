import { afterEach, test, vi, expect } from "vitest";
import { getUserManager, UserManager } from "../src/services/UserManager";
import { UserInfo } from "../src/model/UserInfo";


const mockVehicle1 = { matricula: "1212XLX", nombre: "nave galáctica", tipoMotor: "combustión", consumo100Km: 5 }    
const mockVehicle2 = { matricula: "1414XLX", nombre: "tractor amarillo", tipoMotor: "combustión", consumo100Km: 20 }

vi.mock('../src/services/FirebaseAuthService.ts', () => {
    const mockUser = { email: 'edu2.jose@notamail.not', password: 'aS0@28Y?' }
    const FirebaseAuthService = vi.fn()
    FirebaseAuthService.prototype.logIn = vi.fn().mockImplementation(() => new UserInfo("1", mockUser.email, ""));
    return { FirebaseAuthService }
})

vi.mock('../src/services/FirebaseDBService.ts', () => {
    const mockUser = { email: 'edu2.jose@notamail.not', password: 'aS0@28Y?' }
    const FirebaseDBService = vi.fn()
    FirebaseDBService.prototype.saveUserInfo = vi.fn().mockResolvedValue(true)
    FirebaseDBService.prototype.fetchUserInfo = vi.fn()
    return { FirebaseDBService }
})

afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
})

test('getListOfVehicles_TwoVehiclesStored_ObtainListOfVehicles_Integration', async () => {

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
    await userManager.registerVehicle(matricula1, nombre1, tipoMotor1, consumo100Km1);
    await userManager.registerVehicle(matricula2, nombre2, tipoMotor2, consumo100Km2);

    // When: access the list of vehicles
    const listOfVehicles = userManager.getListOfVehicles();

    // Then: a list of the stored vehicles is obtained
    expect(Object.keys(listOfVehicles).length).toBe(2);
    expect(listOfVehicles['1212XLX']).toBeDefined();
    expect(listOfVehicles['1414XLX']).toBeDefined();
})

test('getListOfVehicles_UserNotLoggedIn_ThrowUserNotLoggedInException_Integration', () => {
    // Given: the user is not logged in
    const userManager = getUserManager();
    userManager.userInfo = null;

    // When: access the list of vehicles
    // Then: An error is thrown
    expect(() => { userManager.getListOfVehicles() }).toThrowError('User must be logged in to list vehicles');
})