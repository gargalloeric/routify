import {Coordinates} from "./Coordinates.ts";
import {GenericElement} from "./GenericElement.ts";

export class Place extends GenericElement{

    name: string;
    coords: Coordinates;

    constructor(name: string, coords: Coordinates) {
        super();
        this.name = name;
        this.coords = coords;
    }

    toJSON(): Object {
        return Object.assign(
            super.toJSON(),
            {
                name: this.name,
                coords: this.coords.toJSON()
            });
    }
}