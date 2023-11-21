import { Transport } from "../model/Transport";

const BASE_URL = "https://api.openrouteservice.org";

const URL_GEOCODE_SEARCH = "/geocode/search?";
const SEARCH_RESULT_LIMIT = 1;

const URL_DIRECTIONS = "/v2/directions/";

export async function obtainCoordsFromName(placeName: string): Promise<L.LatLngExpression> {
    const target = new URL(URL_GEOCODE_SEARCH, BASE_URL);
    const resp = await fetch(target.toString() + new URLSearchParams({
        api_key: import.meta.env.VITE_ORS_API,
        text: placeName,
        size: SEARCH_RESULT_LIMIT.toString()
    }))
    
   
    const data = await resp.json();
    if (data.features.length == 0) {
        throw new Error("Place name not valid");
    }

    const {coordinates} = data.features[0].geometry;
    return coordinates;


}

export async function obtainRoute(start: L.LatLngExpression, end: L.LatLngExpression, transport: Transport): Promise<L.GeoJSON> {
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