import { expect, test } from "vitest";
import { getRouteFromPlacesNames } from "../src/services/ORSAdapter";
import {Transport} from "../src/model/Transport";
import { Route } from "../src/model/Route";

test('getRoute_ApiOnline_routeIsObtained', async () => {
    const origin = 'Castellón de la plana',
        destiny = 'Valencia, España',
        transport = Transport.Car;

    const route: Route = await getRouteFromPlacesNames(origin, destiny, transport);
    expect(route.distance).toBeLessThan(1000);
    expect(route.distance).toBeGreaterThan(30);

})

test("getRoute_ApiOnlineAndPlaceNameNotValid_ThorwPlaceNotValidException", async () => {
    const origin = 'Castellón',
        destiny = 'jldhkjha',
        transport = Transport.Car;

    await expect(() => getRouteFromPlacesNames(origin, destiny, transport)).rejects.toThrowError('Place name not valid');
})
