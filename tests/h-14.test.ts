import { expect, test } from "vitest";
import {getUserManager} from "../src/services/UserManager";
import {Transport} from "../src/model/Transport";
import {Route} from "../src/model/Route";
import {getRouteFromPlacesNames} from "../src/services/ORSAdapter";
import {Vehicle} from "../src/model/Vehicle";
import {calculateRoutePriceWithCar} from "../src/services/RoutePriceCalculator";


// E01 -    Válido
// Given:   el usuario esta loggeado
// And:     elige una ruta de X km de distancia
// And:     tiene un vehiculo {“nombre”: “nave galáctica”, “tipo-motor”: “combustión”, “consumo-100-km”: “5”}
// When:    se quiere conocer el precio de la ruta con el coche de combustión “nave galactica”.
// Then:    La api externa devuelve un precio de gasolina de *ej:Y €/ L
// And:     Se calcula y se muestra el precio *ej:7,5€.
test('obtainRouteCost_UserHasVehicleCostApiOnline_ObtainCost', async () => {
    // given - log user
    const email: string = 'edu2.jose@notamail.not', password: string = 'aS0@28Y?';
    const userManager = getUserManager();
    await userManager.logIn(email, password);

    // given - create route +/-100km?
    const origin = 'Castellón de la plana', destiny = 'Valencia, España', transport = Transport.Car;
    const route: Route = await getRouteFromPlacesNames(origin, destiny, transport); // a route between 50 and 100 km

    // given - user has vehicle
    const matricula: string = "1212XLX", nombre: string = "nave galáctica", tipoMotor: string = "combustión", consumo100Km: number = 5;
    await userManager.registerVehicle(matricula, nombre, tipoMotor, consumo100Km).catch(() => {});
    const vehicle: Vehicle = userManager.getUserVehicle(matricula)

    // tests methods
    const price: number = await calculateRoutePriceWithCar(route, vehicle)
    expect(price).toBeLessThan(20)
    expect(price).toBeGreaterThan(1)

    // cleanup - remove user - logOut
    userManager.logOut()
},
    15000) // wait up to 10s - long-running test

// E03 -    Inválido
// Given:   el usuario de la aplicación no ha elegido ninguna ruta.
// When:    se quiere conocer el precio de la ruta con un vehículo de combustión.
// Then:    se muestra la excepción InvalidRouteException.
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
    await expect(() => calculateRoutePriceWithCar(null, vehicle)).rejects.toThrowError('Provide a route')

    // cleanup - remove user - logOut
    userManager.logOut()
})


// Extra - same as E01 but vehicle is electric
test('obtainRouteCost_UserHasVehicleVehicleIsElectricCostApiOnline_ObtainCost', async () => {
        // given - log user
        const email: string = 'edu2.jose@notamail.not', password: string = 'aS0@28Y?';
        const userManager = getUserManager();
        await userManager.logIn(email, password);

        // given - create route +/-100km?
        const origin = 'Castellón de la plana', destiny = 'Valencia, España', transport = Transport.Car;
        const route: Route = await getRouteFromPlacesNames(origin, destiny, transport); // a route between 50 and 100 km

        // given - user has vehicle
        const matricula: string = "1212EEE", nombre: string = "nave eléctrica", tipoMotor: string = "eléctrico", consumo100Km: number = 10;
        await userManager.registerVehicle(matricula, nombre, tipoMotor, consumo100Km).catch(() => {});
        const vehicle: Vehicle = userManager.getUserVehicle(matricula)

        // tests methods
        const price: number = await calculateRoutePriceWithCar(route, vehicle)
        expect(price).toBeLessThan(5)
        expect(price).toBeGreaterThan(0)

        // cleanup - remove user - logOut
        userManager.logOut()
    },
    15000) // wait up to 10s - long-running test