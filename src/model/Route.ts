import {Transport} from "./Transport.ts";

export enum RouteType {
    Recommended = 'recommended',
    Fastest = 'fastest',
    Shortest = 'shortest'
}

export class Route {
    geoJSON: JSON;
    distance: number;
    transport: Transport;
    origin: string;
    destiny: string;
    constructor(geoJSON: JSON, origin: string, destiny: string, transport: Transport, distance: number) {
        this.geoJSON = geoJSON;
        this.origin = origin;
        this.destiny = destiny;
        this.distance = distance;
        this.transport = transport;
    }
}