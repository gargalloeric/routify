import {Coordinates} from "./Coordinates.ts";

export class Place {

    name: string;
    coords: Coordinates;

    constructor(name: string, coords: Coordinates) {
        this.name = name;
        this.coords = coords;
    }

    toJSON(): Object {
        return {
            name: this.name,
            coords: this.coords.toJSON()
        };
    }
}