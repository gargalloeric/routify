import { afterEach, expect, test, vi } from "vitest";
import { Transport } from "../src/model/Transport";
import { Route } from "../src/model/Route";
import { getRouteFromPlacesNames } from "../src/services/ORSAdapter";

vi.mock('../src/services/ORS')

afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
})

const mockDataOrigin = { properties: { name: 'Castellón de la plana' }, geometry: { coordinates: [39.9864, -0.0513] } }
const mockDataDestiny = { properties: { name: 'Valencia, España' }, geometry: { coordinates: [39.4699, -0.3763] } }
const mockDataRoute = { features: [ { properties: { summary: { distance: 70000 } } } ] };

test('getRoute_ApiOnline_routeIsObtained_Integration', async () => {

    const ORS = await import('../src/services/ORS');

    ORS.obtainCoordsFromName = vi.fn()
        .mockResolvedValueOnce(mockDataOrigin)
        .mockResolvedValueOnce(mockDataDestiny);
    
    ORS.obtainRoute = vi.fn()
        .mockResolvedValueOnce(mockDataRoute);

    const origin = 'Castellón de la plana';
    const destiny = 'Valencia, España';
    const transport = Transport.Car;

    const route: Route = await getRouteFromPlacesNames(origin, destiny, transport);
    expect(route).toBeInstanceOf(Route);
    expect(route.distance).toBeLessThan(1000);
    expect(route.distance).toBeGreaterThan(30);
})


test('getRoute_ApiOnlineAndPlaceNameNotValid_ThrownPlaceNameNotValidException_Integration', async () => {

    const ORS = await import('../src/services/ORS');

    ORS.obtainCoordsFromName = vi.fn()
        .mockResolvedValueOnce(mockDataOrigin)
        .mockRejectedValueOnce(new Error('Place name not valid'));

    const origin = 'Castellón de la plana';
    const destiny = 'jldhkjha';
    const transport = Transport.Car;

    await expect(() => getRouteFromPlacesNames(origin, destiny, transport)).rejects.toThrowError('Place name not valid');
})