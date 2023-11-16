import { expect, test } from "vitest";
import {RouteManager} from "../src/services/RouteManager";
import {Transport} from "../src/model/Transport";
import { Route } from "../src/model/Route";

test('getRoute_ApiOnline_routeIsObtained', () => {
    const origin = 'Castellón',
        destiny = 'Valencia',
        transport = Transport.Car;

    const routeManager = RouteManager.getManager();
    let route: Route;
    expect(() => route = routeManager.getRouteFromPlacesNames(origin, destiny, transport)).not.toThrowError();
    expect(() => route.distance).toBeLessThan(1000);
    expect(() => route.distance).toBeGreaterThan(30);

})

test("getRoute_ApiOnlineAndPlaceNameNotValid_ThorwPlaceNotValidException", () => {
    const origin = 'Castellón',
        destiny = 'jldhkjha',
        transport = Transport.Car;

    const routeManager = RouteManager.getManager();
    
    expect(() => routeManager.getRouteFromPlacesNames(origin, destiny, transport)).toThrowError('Place name not valid');

})
