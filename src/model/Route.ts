import {Transport} from "./Transport.ts";
import {GenericElement} from "./GenericElement.ts";
import {Coordinates} from "./Coordinates.ts";

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
    originCords: Coordinates;
    destiny: string;
    destinyCords: Coordinates;
    name: string | undefined;
    duration: number
    constructor(geoJSON: JSON, origin: string, destiny: string, transport: Transport, distance: number, name?: string, originCords? : Coordinates, destinyCords?: Coordinates,  duration? : number) {
        super();
        this.geoJSON = geoJSON;
        this.origin = origin;
        this.destiny = destiny;
        this.distance = distance;
        this.transport = transport;
        this.name = name;
        this.originCords = originCords ?? new Coordinates(0,0);
        this.destinyCords = destinyCords ?? new Coordinates(0, 0);
        this.duration = duration ?? 0;
    }

    toJSON(): Object {
        return Object.assign(
            super.toJSON(),
            {
                origin : this.origin,
                destiny : this.destiny,
                distance : this.distance,
                transport : this.transport,
                name : this.name,
                originCords:  this.originCords.toJSON(),
                destinyCords: this.destinyCords.toJSON(),
                duration: this.duration
            });
    }
}