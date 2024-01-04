import { Route, RouteType } from "../model/Route.ts";
import { Transport } from "../model/Transport.ts";
import { obtainCoordsFromName, obtainNameFromCoords, obtainRoute } from "./ORS.ts";
import type L from "leaflet";
import { isLatLngValid } from "./Utils.ts";
import {Coordinates} from "../model/Coordinates.ts";

export async function getRouteFromPlacesNames(origin: string, destiny: string, transport: Transport, type: RouteType = RouteType.Recommended): Promise<Route> {
    const dataOrigin = await obtainCoordsFromName(origin);
    const dataDestiny = await obtainCoordsFromName(destiny);

    const originName = dataOrigin.properties.name;
    const destinyName = dataDestiny.properties.name;

    const r = await obtainRoute(dataOrigin.geometry.coordinates, dataDestiny.geometry.coordinates, transport, type);
    const distance = r.features[0].properties.summary.distance / 1000;
    const duration = r.features[0].properties.summary.duration / 3600;

    let originCoordinates = new Coordinates(dataOrigin.geometry.coordinates[1], dataOrigin.geometry.coordinates[0]);
    let destinationCoordinates = new Coordinates(dataDestiny.geometry.coordinates[1], dataDestiny.geometry.coordinates[0]);

    return new Route(r, originName, destinyName, transport, distance, undefined, originCoordinates, destinationCoordinates, duration);
}

export async function getRouteFromCoords(origin: L.LatLng, destiny: L.LatLng, transport: Transport, type: RouteType = RouteType.Recommended): Promise<Route> {
    if (!isLatLngValid(origin) || !isLatLngValid(destiny)) throw new Error("Invalid coordinates");

    let originName = "";
    let destinyName = "";
    try {
        const dataOrigin = await obtainNameFromCoords(new Coordinates(origin.lat, origin.lng));
        originName = dataOrigin.properties.name;
        const dataDestiny = await obtainNameFromCoords(new Coordinates(destiny.lat, destiny.lng));
        destinyName = dataDestiny.properties.name;
    } catch (err) {
        console.log(err)
    }
    const r = await obtainRoute([origin.lat, origin.lng], [destiny.lat, destiny.lng], transport, type);

    const distance = r.features[0].properties.summary.distance / 1000;
    const duration = r.features[0].properties.summary.duration / 3600;

    return new Route(r, originName, destinyName, transport, distance, undefined, new Coordinates(origin.lng, origin.lat), new Coordinates(destiny.lng, destiny.lat), duration);

}
