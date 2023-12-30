import { Transport } from "../model/Transport";
import { RouteType } from "../model/Route";
import L from "leaflet";
import {Coordinates} from "../model/Coordinates.ts";

const BASE_URL = "https://api.openrouteservice.org";

const URL_GEOCODE_SEARCH = "/geocode/search?";
const URL_GEOCODE_REVERSE = "/geocode/reverse?";
const SEARCH_RESULT_LIMIT = 1;

const URL_DIRECTIONS = "/v2/directions/";

export async function obtainCoordsFromName(placeName: string): Promise<JSON> {
    const target = new URL(URL_GEOCODE_SEARCH, BASE_URL);
    const resp = await fetch(target.toString() + new URLSearchParams({
        api_key: import.meta.env.VITE_ORS_API,
        text: placeName,
        size: SEARCH_RESULT_LIMIT.toString()
    }))
    
   
    const data = await resp.json();
    if (data.features.length === 0) {
        throw new Error("Place name not valid");
    }

    return data.features[0];


}

export async function obtainNameFromCoords(coords: Coordinates): Promise<JSON> {
    const lat = coords.lat,
        lng = coords.lon;
    const target = new URL(URL_GEOCODE_REVERSE, BASE_URL);
    const resp = await fetch(target.toString() + new URLSearchParams({
        api_key: import.meta.env.VITE_ORS_API,
        'point.lon': "" + lat,
        'point.lat': "" + lng,
        size: SEARCH_RESULT_LIMIT.toString()
    }));

    const data = await resp.json();
    if (data.features.length === 0) {
        throw new Error("Place name not known");
    }

    return data.features[0];
}

export async function obtainRoute(start: L.LatLngExpression, end: L.LatLngExpression, transport: Transport, type: RouteType = RouteType.Recommended): Promise<JSON> {
    const target = new URL(URL_DIRECTIONS + transport + "/geojson", BASE_URL);
    const resp = await fetch(target.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': import.meta.env.VITE_ORS_API,
        },
        body: JSON.stringify({
            'coordinates': [start, end],
            'preference': type,
        })
    });

    if (resp.ok) {
        const route = await resp.json();

        return route
    }

    throw new Error("Unable to obtain a route");
}