import { LatLng } from "leaflet";
import { afterEach, expect, test, vi } from "vitest";
import { getRouteFromCoords } from "../src/services/ORSAdapter";
import { Transport } from "../src/model/Transport";
import { Route, RouteType } from "../src/model/Route";

vi.mock('../src/services/ORS');

afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
})

const mockDataOrigin = {properties: {name: 'Castellón de la Plana'}};
const mockDataDestiny = {properties: {name: 'Valencia'}};
const mockDataRoute = { features: [ { properties: { summary: { distance: 70000 } } } ] };

test('getRoute_ApiOnlineShortestRoute_RouteIsObtained_Integration', async () => {
    
    const ORS = await import('../src/services/ORS');

    ORS.obtainNameFromCoords = vi.fn()
        .mockResolvedValueOnce(mockDataOrigin)
        .mockResolvedValueOnce(mockDataDestiny);

    
    ORS.obtainRoute = vi.fn()
        .mockResolvedValueOnce(mockDataRoute);
    
    let origin: L.LatLng = {lat:-0.037787, lng:39.987142} as LatLng;
    let destiny: L.LatLng = {lat:-0.363258, lng:39.464773} as LatLng;

    let route = await getRouteFromCoords(origin, destiny, Transport.Car, RouteType.Shortest);

    expect(route).toBeInstanceOf(Route);
    expect(route.distance).toBeGreaterThan(30);
    expect(route.distance).toBeLessThan(150);
})

test('getRoute_ApiOnlineShortestRouteInvalidCoords_ThrowInvalidCoordsException_Integration', async () => {
    
    const ORS = await import('../src/services/ORS');

    ORS.obtainNameFromCoords = vi.fn();

    
    ORS.obtainRoute = vi.fn();
    
    let origin: L.LatLng = {lat:-0.037787, lng:39.987142} as LatLng;
    let destiny: L.LatLng = {lat:100, lng:190} as LatLng;

    await expect(getRouteFromCoords(origin, destiny, Transport.Car, RouteType.Shortest)).rejects.toThrowError('Invalid coordinates');
})