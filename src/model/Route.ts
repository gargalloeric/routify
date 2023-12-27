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
    name: string;
    constructor(geoJSON: JSON, origin: string, destiny: string, transport: Transport, distance: number, name?: string) {
        this.geoJSON = geoJSON;
        this.origin = origin;
        this.destiny = destiny;
        this.distance = distance;
        this.transport = transport;
        this.name = name ?? `${origin} -> ${destiny}`;
    }

    toJSON(): Object {
        return {
            origin : this.origin,
            destiny : this.destiny,
            distance : this.distance,
            transport : this.transport,
            name : this.name
        };
    }
}