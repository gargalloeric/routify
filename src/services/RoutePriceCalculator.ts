import { Route } from "../model/Route.ts";
import { ICostStrategy } from "./CostStrategy.ts";
import { ListaEESSPrecio } from "./APITypes.ts";

export async function calculateRoutePrice(route: Route | null, consumptionAt100: number, cost: ICostStrategy) {
    if (!route) throw new Error("Invalid route");

    return cost.calculate(route, consumptionAt100);
}

export function filterGasStationsByDistance(list: Array<ListaEESSPrecio>, latOrigin: number, lonOrigin: number, maxDist: number) {
    return list.filter((gasStation) => {
        const latGasStation = parseFloat(gasStation['Latitud'].replace(',', '.'));
        const lonGasStation = parseFloat(gasStation['Longitud (WGS84)'].replace(',', '.'));
        const distance = calculateDistance(latOrigin, lonOrigin, latGasStation, lonGasStation);
        return distance <= maxDist;
    });
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const earthRadius = 6371; // Earth radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c; // Distance in kilometers
    return distance;
}

export function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}
