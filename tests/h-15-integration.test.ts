import { test, vi, expect } from "vitest";
import { getRouteFromPlacesNames } from "../src/services/ORSAdapter";
import { Transport } from "../src/model/Transport";
import { RouteType } from "../src/model/Route";
import { calculateRoutePrice } from "../src/services/RoutePriceCalculator";
import { BycicleCostStartey, FootCostStartey } from "../src/services/CostStrategy";

vi.mock('../src/services/ORS')

vi.mock('../src/services/CostStrategy', () => {
    const BycicleCostStartey = vi.fn()
    BycicleCostStartey.prototype.calculate = vi.fn().mockResolvedValueOnce(1740)

    const FootCostStartey = vi.fn()
    FootCostStartey.prototype.calculate = vi.fn()

    return { BycicleCostStartey, FootCostStartey }
})

const mockDataOrigin = { properties: { name: 'Castellón de la plana' }, geometry: { coordinates: [39.9864, -0.0513] } }
const mockDataDestiny = { properties: { name: 'Valencia, España' }, geometry: { coordinates: [39.4699, -0.3763] } }
const mockDataRoute = { features: [ { properties: { summary: { distance: 70000 } } } ] };


test('calculateRoutePrice_bicycleVehicle_ObtainCost_Integration', async () => {
    
    const ORS = await import('../src/services/ORS');
    
    ORS.obtainCoordsFromName = vi.fn()
        .mockResolvedValueOnce(mockDataOrigin)
        .mockResolvedValueOnce(mockDataDestiny);
    
    ORS.obtainRoute = vi.fn()
        .mockResolvedValueOnce(mockDataRoute);

    const origin = 'Castellón de la plana';
    const destiny = 'Valencia, España';
    const consumptionAt100 = 2200;

    const route = await getRouteFromPlacesNames(origin, destiny, Transport.Bycicle, RouteType.Recommended);
    const cost = await calculateRoutePrice(route, consumptionAt100, new BycicleCostStartey());
    expect(cost).toBeGreaterThan(1738);
    expect(cost).toBeLessThan(1742);
})

test('calculateRoutePrice_emptyRoute_throwInvalidRouteException_Integration', async () => {
    const consumptionAt100 = 2200;

    await expect(calculateRoutePrice(null, consumptionAt100, new FootCostStartey())).rejects.toThrowError('Invalid route');
})