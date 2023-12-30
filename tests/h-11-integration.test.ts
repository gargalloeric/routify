import { expect, test, vi } from "vitest";
import { getUserManager } from "../src/services/UserManager";
import { UserInfo } from "../src/model/UserInfo";
import { validateLogInInfo, validateVehicleInfo, validatePassword } from "../src/services/Validators";
import { FirebaseAuthService } from "../src/services/FirebaseAuthService";
import { FirebaseDBService } from "../src/services/FirebaseDBService.ts";

vi.mock('../src/services/Validators.ts', () => ({
    validateLogInInfo: vi.fn().mockReturnValueOnce(null),
    validateVehicleInfo: vi.fn().mockReturnValueOnce(null),
}))

vi.mock('../src/services/FirebaseAuthService.ts', () => {
    const FirebaseAuthService = vi.fn()
    FirebaseAuthService.prototype.logIn = vi.fn().mockImplementation((email, password) => {
        return new UserInfo('1', email, '');
    })

    return { FirebaseAuthService }
})

vi.mock('../src/model/UserInfo.ts', () => {
    const UserInfo = vi.fn()
    UserInfo.prototype.mail = vi.fn().mockReturnValue('edu.jose@gmail.com')
    UserInfo.prototype.addVehicle = vi.fn()
    UserInfo.prototype.hasVehicle = vi.fn().mockResolvedValueOnce(false)
    UserInfo.prototype.removeVehicle = vi.fn().mockReturnValueOnce(true).mockReturnValueOnce(false).mockReturnValueOnce(true)

    return { UserInfo }
})

vi.mock('../src/services/FirebaseDBService.ts', () => {
    const FirebaseDBService = vi.fn()
    FirebaseDBService.prototype.fetchUserInfo = vi.fn()
    FirebaseDBService.prototype.saveUserInfo = vi.fn()

    return { FirebaseDBService }
})

test('deleteVehicle_UserLoggedInVehicleExists_VehicleDeleted_Integration', async () => {    
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

test('deleteVehicle_UserNotLoggedInVehicleExists_ThrowUserNotLoggedInException_Integration', async () => {
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
    let result = await userManager.deleteVehicle(matricula);
    expect(result).toBe(true);

})