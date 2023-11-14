import { expect, test } from "vitest";
import {RouteManager} from "../src/services/RouteManager";
import {Transport} from "../src/model/Transport";

test('getRoute_ApiOnline_routeIsObtained', () => {
    let origin = 'Castellón',
        destiny = 'Valencia',
        transport = Transport.Car

    let routeManager = RouteManager.getRouteManager()
    expect(() => routeManager.getRouteFromPlacesNames(origin, destiny, transport)).not.toThrowError()
})


