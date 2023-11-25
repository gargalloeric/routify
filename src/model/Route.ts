import {Transport} from "./Transport.ts";

export class Route {
    geoJSON: L.GeoJSON;
    distance: number;
    transport: Transport;
    constructor(geoJSON: L.GeoJSON) {
        this.geoJSON = geoJSON;
        this.distance = geoJSON.features[0].properties.summary.distance / 1000;
        this.transport = Transport[geoJSON.metadata.profile as keyof  typeof Transport];
    }
}