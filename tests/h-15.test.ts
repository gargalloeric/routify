import { expect, test } from "vitest";
import { getRouteFromPlacesNames } from "../src/services/ORSAdapter";
import { Transport } from "../src/model/Transport";
import { RouteType } from "../src/model/Route";

test('calculateRoutePrice_bicycleVehicle_ObtainCost', async () => {
    const origin = 'Castellón de la plana';
    const destiny = 'Valencia, España';
    const consumptionAt100 = 2200;

    const route = await getRouteFromPlacesNames(origin, destiny, Transport.Bycicle, RouteType.Recommended);

    const cost = calculateRoutePrice(route, consumptionAt100, new BycicleCostStartey());

    expect(cost).toBeCloseTo(1633);
})

test('calculateRoutePrice_emptyRoute_throwInvalidRouteException', () => {
    const consumptionAt100 = 2200;

    expect(calculateRoutePrice(null, consumptionAt100, new FootCostStartey())).toThrowError('Invalid route');
})