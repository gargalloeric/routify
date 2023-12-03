// no - ponedlo en un paquete modelo o algo asi
import { Route } from "../model/Route.ts";
import {Transport} from "../model/Transport.ts";
import { obtainCoordsFromName, obtainNameFromCoords, obtainRoute } from "./ORS.ts";
import L from "leaflet";

export async function getRouteFromPlacesNames(origin: string, destiny: string, transport: Transport): Promise<Route> {
        const dataOrigin = await obtainCoordsFromName(origin);
        const dataDestiny = await obtainCoordsFromName(destiny);

        const originName = dataOrigin.properties.name;
        const destinyName =  dataDestiny.properties.name;

        const r = await obtainRoute(dataOrigin.geometry.coordinates, dataDestiny.geometry.coordinates, transport);
        return new Route(r, originName, destinyName);
}

export async function getRouteFromCoords(origin: L.LatLng, destiny: L.LatLng, transport: Transport): Promise<Route> {
    let originName = "";
    let destinyName = "";
    try {
        const dataOrigin =  await obtainNameFromCoords(origin);
        originName = dataOrigin.properties.name;
        const dataDestiny = await obtainNameFromCoords(destiny);
        destinyName = dataDestiny.properties.name;

    } catch (err) {
        console.log(err)
    }
    const r = await obtainRoute([origin.lat, origin.lng], [destiny.lat, destiny.lng], transport);
    return new Route(r, originName, destinyName);
}
