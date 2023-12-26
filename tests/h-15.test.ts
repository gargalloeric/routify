import { expect, test } from "vitest";
import { getRouteFromPlacesNames } from "../src/services/ORSAdapter";
import { Transport } from "../src/model/Transport";
import { RouteType } from "../src/model/Route";
import { calculateRoutePrice } from "../src/services/RoutePriceCalculator";
import { BycicleCostStartey, FootCostStartey } from "../src/services/CostStrategy";

test('calculateRoutePrice_bicycleVehicle_ObtainCost', async () => {
    const origin = 'Castellón de la plana';
    const destiny = 'Valencia, España';
    const consumptionAt100 = 2200;

    const route = await getRouteFromPlacesNames(origin, destiny, Transport.Bycicle, RouteType.Recommended);
    const cost = await calculateRoutePrice(route, consumptionAt100, new BycicleCostStartey());

    expect(cost).toBeGreaterThan(1738);
    expect(cost).toBeLessThan(1742);
})

test('calculateRoutePrice_emptyRoute_throwInvalidRouteException', async () => {
    const consumptionAt100 = 2200;

    await expect(calculateRoutePrice(null, consumptionAt100, new FootCostStartey())).rejects.toThrowError('Invalid route');
})