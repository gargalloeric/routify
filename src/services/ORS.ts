import { Transport } from "../model/Transport";
import L from "leaflet";

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

export async function obtainNameFromCoords(coords: L.LatLng): Promise<JSON> {

    const { lat, lng } = coords
    const target = new URL(URL_GEOCODE_REVERSE, BASE_URL);
    const resp = await fetch(target.toString() + new URLSearchParams({
        api_key: import.meta.env.VITE_ORS_API,
        'point.lon': lng.toString(),
        'point.lat': lat.toString(),
        size: SEARCH_RESULT_LIMIT.toString()
    }));

    const data = await resp.json();
    if (data.features.length === 0) {
        throw new Error("Place name not known");
    }

    return data.features[0];
}

export async function obtainRoute(start: L.LatLngExpression, end: L.LatLngExpression, transport: Transport): Promise<JSON> {
    const target = new URL(URL_DIRECTIONS + transport, BASE_URL);
    const resp = await fetch(target.toString()+ "?" + new URLSearchParams({
        api_key: import.meta.env.VITE_ORS_API,
        start: start.toString(),
        end: end.toString()
    }));

    if (resp.ok) {
        const route = await resp.json();

        return route
    }

    throw new Error("Unable to obtain a route");
}