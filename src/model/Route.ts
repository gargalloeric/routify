import {GeoJSON} from "leaflet";

export class Route {
    puntos: GeoJSON;
    distance: number;
    constructor(puntos: GeoJSON) {
        this.puntos = puntos;
        this.distance = puntos.features[0].properties.summary.distance / 1000;
    }
    getPuntos(): GeoJSON{
        return this.puntos;
    }
}