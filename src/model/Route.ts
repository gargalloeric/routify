import {GeoJSON} from "leaflet";
import {Transport} from "./Transport.ts";

export class Route {
    puntos: GeoJSON;
    distance: number;
    transport: Transport;
    constructor(puntos: GeoJSON) {
        this.puntos = puntos;
        this.distance = puntos.features[0].properties.summary.distance / 1000;
        this.transport = Transport[puntos.metadata.profile as keyof  typeof Transport];
    }
    getPuntos(): GeoJSON{
        return this.puntos;
    }
}