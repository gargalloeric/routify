// no - ponedlo en un paquete modelo o algo asi
import { Route } from "../model/Route.ts";
import {Transport} from "../model/Transport.ts";
import { obtainCoordsFromName, obtainRoute } from "./ORS.ts";

export async function getRouteFromPlacesNames(origin: string, destiny: string, transport: Transport): Promise<Route> {
        const coordsOrigin = await obtainCoordsFromName(origin);
        const coordsDestiny = await obtainCoordsFromName(destiny);

        const r = await obtainRoute(coordsOrigin, coordsDestiny, transport);
        return new Route(r);
}

export async function getRouteFromCoords(origin: L.LatLngExpression, destiny: L.LatLngExpression, transport: Transport): Promise<Route> {
    const r = await obtainRoute(origin, destiny, transport);
    return new Route(r);
}
