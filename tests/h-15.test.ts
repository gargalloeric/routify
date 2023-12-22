import { expect, test } from "vitest";
import { getRouteFromPlacesNames } from "../src/services/ORSAdapter";
import { Transport } from "../src/model/Transport";
import { Route, RouteType } from "../src/model/Route";

test('obtainRouteCost_bicycleVehicle_ObtainCost', async () => {
    const origin = 'Castellón de la plana';
    const destiny = 'Valencia, España';
    const consumptionAt100 = 2200;

    const route = await getRouteFromPlacesNames(origin, destiny, Transport.Bycicle, RouteType.Recommended);

    const cost = calculateRoutePrice(route, consumptionAt100, new BycicleCostStartey());

    expect(cost).toBeCloseTo(1633);
})

test('obtainRouteCost_emptyRoute_throwInvalidRouteException', () => {
    const consumptionAt100 = 2200;

    const cost = calculateRoutePrice(null, consumptionAt100, new FootCostStartey());
    

    expect(emptyRoute.getCost(consumptionAt100)).toThrowError('Invalid route');
})