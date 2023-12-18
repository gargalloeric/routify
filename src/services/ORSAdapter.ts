import { Route, RouteType } from "../model/Route.ts";
import { Transport } from "../model/Transport.ts";
import { obtainCoordsFromName, obtainNameFromCoords, obtainRoute } from "./ORS.ts";
import type L from "leaflet";
import { isLatLngValid } from "./Utils.ts";

export async function getRouteFromPlacesNames(origin: string, destiny: string, transport: Transport, type: RouteType = RouteType.Recommended): Promise<Route> {
    const dataOrigin = await obtainCoordsFromName(origin);
    const dataDestiny = await obtainCoordsFromName(destiny);

    const originName = dataOrigin.properties.name;
    const destinyName = dataDestiny.properties.name;

    const r = await obtainRoute(dataOrigin.geometry.coordinates, dataDestiny.geometry.coordinates, transport, type);
    const distance = r.features[0].properties.summary.distance / 1000;
    return new Route(r, originName, destinyName, transport, distance);
}

export async function getRouteFromCoords(origin: L.LatLng, destiny: L.LatLng, transport: Transport, type: RouteType = RouteType.Recommended): Promise<Route> {
    if (!isLatLngValid(origin) || !isLatLngValid(destiny)) throw new Error("Invalid coordinates");

    let originName = "";
    let destinyName = "";
    try {
        const dataOrigin = await obtainNameFromCoords(origin);
        originName = dataOrigin.properties.name;
        const dataDestiny = await obtainNameFromCoords(destiny);
        destinyName = dataDestiny.properties.name;
    } catch (err) {
        console.log(err)
    }
    const r = await obtainRoute([origin.lat, origin.lng], [destiny.lat, destiny.lng], transport, type);
    const distance = r.features[0].properties.summary.distance / 1000;
    return new Route(r, originName, destinyName, transport, distance);

}
