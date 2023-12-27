import {expect, test, vi, afterAll} from "vitest";
import {getUserManager} from "../src/services/UserManager";
import {Transport} from "../src/model/Transport";
import {Route} from "../src/model/Route";
import {getRouteFromPlacesNames} from "../src/services/ORSAdapter";
import {Vehicle} from "../src/model/Vehicle";
import {calculateRoutePrice, calculateRoutePriceWithCar} from "../src/services/RoutePriceCalculator";
import {UserInfo} from "../src/model/UserInfo";
import * as GasStationExports from '../src/services/GasStations'
import * as ElectricityPriceExports from '../src/services/ElectricityPriceREE'
import { CombustionCostStrategy, ElectricCostStrategy } from "../src/services/CostStrategy";
import { ListaEESSPrecio } from "../src/services/APITypes";


const mockDataOrigin = { properties: { name: 'Castellón de la plana' }, geometry: { coordinates: [-0.0513, 39.9864] } }
const mockDataDestiny = { properties: { name: 'Valencia, España' }, geometry: { coordinates: [-0.3763, 39.4699] } }
const mockDataRoute = { features: [ { properties: { summary: { distance: 70000 } } } ] };
const mockElectricityPrice = 136.57;
const mockGasStations = [{
        'C.P.': '12005',
        Latitud: '39,981000',
        Localidad: 'CASTELLON DE LA PLANA',
        'Longitud (WGS84)': '-0,034917',
        Municipio: 'Castellón de la Plana/Castelló de la Plana',
        'Precio Gasolina 95 E5': '1,599',
    }] as Array<ListaEESSPrecio>;

const mockVehicle1 = { matricula: "1212XLX", nombre: "nave galáctica", tipoMotor: "combustión", consumo100Km: 5 }
const mockVehicle2 = { matricula: "1414XLX", nombre: "tractor amarillo", tipoMotor: "combustión", consumo100Km: 20 }
const mockVehicle3 = { matricula: "1212EEE", nombre: "nave eléctrica", tipoMotor: "eléctrico", consumo100Km: 10 }

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

vi.mock('../src/services/ORS')


afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
})


test('obtainRouteCost_UserHasVehicleCostApiOnline_ObtainCost', async () => {
    // given - log user
    const email: string = 'edu2.jose@notamail.not', password: string = 'aS0@28Y?';
    const userManager = getUserManager();
    await userManager.logIn(email, password);

    // mock ors api
    const ORS = await import('../src/services/ORS');
    ORS.obtainCoordsFromName = vi.fn().mockResolvedValueOnce(mockDataOrigin).mockResolvedValueOnce(mockDataDestiny);
    ORS.obtainRoute = vi.fn().mockResolvedValueOnce(mockDataRoute);

    // given - create route +/-100km?
    const origin = 'Castellón de la plana', destiny = 'Valencia, España', transport = Transport.Car;
    const route: Route = await getRouteFromPlacesNames(origin, destiny, transport); // a route between 50 and 100 km

    // given - user has vehicle
    const matricula: string = "1212XLX", nombre: string = "nave galáctica", tipoMotor: string = "combustión", consumo100Km: number = 5;
    await userManager.registerVehicle(matricula, nombre, tipoMotor, consumo100Km).catch(() => {});
    const vehicle: Vehicle = userManager.getUserVehicle(matricula)

    // mock prices api
    vi.spyOn(GasStationExports, 'getGasStations').mockResolvedValueOnce(mockGasStations);
    ORS.obtainCoordsFromName = vi.fn().mockResolvedValueOnce(mockDataOrigin);

    // tests methods
    const price: number = await calculateRoutePrice(route, vehicle.consumo100Km, new CombustionCostStrategy());
    expect(price).toBeLessThan(20)
    expect(price).toBeGreaterThan(1)

    // cleanup - remove user - logOut
    userManager.logOut()
},
    15000) // wait up to 10s - long-running test


test('obtainRouteCost_NoRouteSelected_ThrowsInvalidRouteException', async () => {
    // given - log user
    const email: string = 'edu2.jose@notamail.not', password: string = 'aS0@28Y?';
    const userManager = getUserManager();
    await userManager.logIn(email, password);

    // given - user has vehicle
    const matricula: string = "1212XLX", nombre: string = "nave galáctica", tipoMotor: string = "combustión", consumo100Km: number = 5;
    await userManager.registerVehicle(matricula, nombre, tipoMotor, consumo100Km).catch(() => {});
    const vehicle: Vehicle = userManager.getUserVehicle(matricula)

    // tests methods
    await expect(() => calculateRoutePrice(null, vehicle.consumo100Km, new CombustionCostStrategy())).rejects.toThrowError('Invalid route')

    // cleanup - remove user - logOut
    userManager.logOut()
})


test('obtainRouteCost_UserHasVehicleVehicleIsElectricCostApiOnline_ObtainCost', async () => {
        // given - log user
        const email: string = 'edu2.jose@notamail.not', password: string = 'aS0@28Y?';
        const userManager = getUserManager();
        await userManager.logIn(email, password);

        // mock ors api
        const ORS = await import('../src/services/ORS');
        ORS.obtainCoordsFromName = vi.fn().mockResolvedValueOnce(mockDataOrigin).mockResolvedValueOnce(mockDataDestiny);
        ORS.obtainRoute = vi.fn().mockResolvedValueOnce(mockDataRoute);

        // given - create route +/-100km?
        const origin = 'Castellón de la plana', destiny = 'Valencia, España', transport = Transport.Car;
        const route: Route = await getRouteFromPlacesNames(origin, destiny, transport); // a route between 50 and 100 km

        // given - user has vehicle
        const matricula: string = "1212EEE", nombre: string = "nave eléctrica", tipoMotor: string = "eléctrico", consumo100Km: number = 10;
        await userManager.registerVehicle(matricula, nombre, tipoMotor, consumo100Km).catch(() => {});
        const vehicle: Vehicle = userManager.getUserVehicle(matricula)

        // mock prices api
        vi.spyOn(ElectricityPriceExports, 'getElectricityPrice').mockResolvedValueOnce(mockElectricityPrice);

        // tests methods
        const price: number = await calculateRoutePrice(route, vehicle.consumo100Km, new ElectricCostStrategy())
        expect(price).toBeLessThan(5)
        expect(price).toBeGreaterThan(0)

        // cleanup - remove user - logOut
        userManager.logOut()
    },
    15000) // wait up to 10s - long-running test