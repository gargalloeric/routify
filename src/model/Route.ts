import {Transport} from "./Transport.ts";
import {GenericElement} from "./GenericElement.ts";

export enum RouteType{
    Recommended = 'recommended',
    Fastest = 'fastest',
    Shortest = 'shortest'
}

export class Route extends GenericElement {
    geoJSON: JSON;
    distance: number;
    transport: Transport;
    origin: string;
    destiny: string;
    name: string | undefined;
    constructor(geoJSON: JSON, origin: string, destiny: string, transport: Transport, distance: number, name?: string) {
        super();
        this.geoJSON = geoJSON;
        this.origin = origin;
        this.destiny = destiny;
        this.distance = distance;
        this.transport = transport;
        this.name = name;
    }

    toJSON(): Object {
        return Object.assign(
            super.toJSON(),
            {
                origin : this.origin,
                destiny : this.destiny,
                distance : this.distance,
                transport : this.transport,
                name : this.name
            });
    }
}