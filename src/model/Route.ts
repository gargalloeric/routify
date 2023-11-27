import {Transport} from "./Transport.ts";

export class Route {
    geoJSON: L.GeoJSON;
    distance: number;
    transport: Transport;
    origin: string;
    destiny: string;
    constructor(geoJSON: L.GeoJSON, origin: string, destiny: string) {
        this.geoJSON = geoJSON;
        this.origin = origin;
        this.destiny = destiny;
        this.distance = geoJSON.features[0].properties.summary.distance / 1000;
        this.transport = Transport[geoJSON.metadata.profile as keyof  typeof Transport];
    }
}