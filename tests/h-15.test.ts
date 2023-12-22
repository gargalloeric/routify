import { expect, test } from "vitest";
import { getRouteFromPlacesNames } from "../src/services/ORSAdapter";
import { Transport } from "../src/model/Transport";
import { Route, RouteType } from "../src/model/Route";

test('calculateRoutePrice_bicycleVehicle_ObtainCost', async () => {
    const origin = 'Castellón de la plana';
    const destiny = 'Valencia, España';
    const vehile = new Bycicle('mi bicicleta', 2200);

    const route = await getRouteFromPlacesNames(origin, destiny, Transport.Bycicle, RouteType.Recommended);

    const cost = calculateRoutePrice(route, vehile, new BycicleCostStartey());

    expect(cost).toBeCloseTo(1633);
})

test('calculateRoutePrice_emptyRoute_throwInvalidRouteException', () => {
    const vehicle = new OnFoot('walking', 2200);    

    expect(calculateRoutePrice(null, vehicle, new FootCostStartey())).toThrowError('Invalid route');
})