import {Route} from "../model/Route.ts";
import {Vehicle} from "../model/Vehicle.ts";
import {obtainCoordsFromName} from "./ORS.ts";


const GAS_PRICE_URL = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/";

export async function calculateRoutePriceWithCar(route: Route, vehicle: Vehicle): Promise<number> {
    if (!vehicle || !route) throw new Error("Provide a route and a vehicle")

    const dataOrigin = await obtainCoordsFromName(route.origin);
    const latOrigin = dataOrigin.geometry.coordinates[1];
    const lonOrigin = dataOrigin.geometry.coordinates[0];

    const target = new URL(GAS_PRICE_URL);
    const resp = await fetch(target.toString())
    const {ListaEESSPrecio} = await resp.json();

    let nearbyGasStations = filterGasStationsByDistance(ListaEESSPrecio, latOrigin, lonOrigin, 10);
    if (!nearbyGasStations) nearbyGasStations = filterGasStationsByDistance(ListaEESSPrecio, latOrigin, lonOrigin, 20);
    if (!nearbyGasStations) nearbyGasStations = filterGasStationsByDistance(ListaEESSPrecio, latOrigin, lonOrigin, 50);

    const sortedGasStations = nearbyGasStations.sort((a, b) => {
        const distanceA = calculateDistance(latOrigin, lonOrigin, parseFloat(a['Latitud'].replace(',', '.')), parseFloat(a['Longitud (WGS84)'].replace(',', '.')));
        const distanceB = calculateDistance(latOrigin, lonOrigin, parseFloat(b['Latitud'].replace(',', '.')), parseFloat(b['Longitud (WGS84)'].replace(',', '.')));
        return distanceA - distanceB;
    });

    const nearestGasStation = sortedGasStations[0]
    const nearestFuelPrice = parseFloat(nearestGasStation['Precio Gasolina 95 E5'].replace(',', '.'))

    const routeCost = parseFloat(((route.distance / 100) * vehicle.consumo100Km * nearestFuelPrice).toFixed(2));
    return routeCost;
}


function filterGasStationsByDistance(list, latOrigin, lonOrigin, maxDist) {
    return list.filter((gasStation) => {
        const latGasStation = parseFloat(gasStation['Latitud'].replace(',', '.'));
        const lonGasStation = parseFloat(gasStation['Longitud (WGS84)'].replace(',', '.'));
        const distance = calculateDistance(latOrigin, lonOrigin, latGasStation, lonGasStation);
        return distance <= maxDist;
    });
}


function calculateDistance(lat1, lon1, lat2, lon2) {
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


function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
