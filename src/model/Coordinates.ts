export class Coordinates {

    lat: number;
    lon: number;

    constructor(lat: number, lon: number) {
        this.lat = lat;
        this.lon = lon;
    }


    toJSON() {
        return {
            lat: this.lat,
            lon: this.lon
        };
    }
}