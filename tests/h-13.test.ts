import { expect, test } from "vitest";
import {RouteManager} from "../src/services/RouteManager";
import {Transport} from "../src/model/Transport";

test('getRoute_ApiOnline_routeIsObtained', () => {
    let origin = 'Castellón',
        destiny = 'Valencia',
        transport = Transport.Car

    let routeManager = RouteManager.getManager()
    expect(() => routeManager.getRouteFromPlacesNames(origin, destiny, transport)).not.toThrowError()
})

test("getRoute_ApiOnlineAndPlaceNameNotValid_ThorwPlaceNotValidException", () => {
    let origin = 'Castellón',
        destiny = 'jldhkjha',
        transport = Transport.Car 

    let routeManager = RouteManager.getManager()
    
    expect(() => routeManager.getRouteFromPlacesNames(origin, destiny, transport)).toThrowError('Place name not valid')

})
