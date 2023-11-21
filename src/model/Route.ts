import {GeoJSON} from "leaflet";

export class Route {
    puntos: GeoJSON;
    distance: number = 0;
    constructor(puntos: GeoJSON) {
        this.puntos = puntos;
    }
    getPuntos(): GeoJSON{
        return this.puntos;
    }
}