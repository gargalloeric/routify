import { expect, test } from "vitest";
import { Route, RouteType } from "../src/model/Route";
import { Transport } from "../src/model/Transport";
import { getRouteFromCoords } from "../src/services/ORSAdapter";
import L, { LatLng } from 'leaflet';

test('getRoute_ApiOnlineShortestRoute_RouteIsObtained', async () => {
    let origin: L.LatLng = {lat:-0.037787, lng:39.987142} as LatLng;
    let destiny: L.LatLng = {lat:-0.363258, lng:39.464773} as LatLng;

    let route = await getRouteFromCoords(origin, destiny, Transport.Car, RouteType.Shortest);
    
    expect(route).toBeInstanceOf(Route);
    expect(route.distance).toBeGreaterThan(30);
    expect(route.distance).toBeLessThan(150);
})

test('getRoute_ApiOnlineShortestRouteInvalidCoords_ThrowInvalidCoordsException', async () => {
    let origin: L.LatLng = {lat:-0.037787, lng:39.987142} as LatLng;
    let destiny: L.LatLng = {lat:100, lng:190} as LatLng;

    await expect(getRouteFromCoords(origin, destiny, Transport.Car, RouteType.Shortest)).rejects.toThrowError('Invalid coordinates');
})