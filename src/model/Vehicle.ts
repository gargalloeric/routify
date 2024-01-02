import {GenericElement} from "./GenericElement.ts";

export class Vehicle extends GenericElement{
    matricula: string
    nombre: string
    tipoMotor: string // combustión | eléctrico
    consumo100Km: number
    constructor(matricula: string, nombre: string, tipoMotor: string, consumo100Km: number) {
        super();
        this.matricula = matricula
        this.nombre = nombre
        this.tipoMotor = tipoMotor
        this.consumo100Km = consumo100Km
    }

    toJSON(): Object {
        return Object.assign(
            super.toJSON(),
            {
                matricula: this.matricula,
                nombre: this.nombre,
                tipoMotor: this.tipoMotor,
                consumo100Km: this.consumo100Km
            });
    }
}