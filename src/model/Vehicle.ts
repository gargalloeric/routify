export class Vehicle {
    matricula: string
    nombre: string
    tipoMotor: string
    consumo100Km: number
    constructor(matricula: string, nombre: string, tipoMotor: string, consumo100Km: number) {
        this.matricula = matricula
        this.nombre = nombre
        this.tipoMotor = tipoMotor
        this.consumo100Km = consumo100Km
    }

    toJSON(): Object {
        return {
            matricula: this.matricula,
            nombre: this.nombre,
            tipoMotor: this.tipoMotor,
            consumo100Km: this.consumo100Km
        };
    }
}