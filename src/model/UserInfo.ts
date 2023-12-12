import {Vehicle} from "./Vehicle.ts";

export class UserInfo {
    name: string
    mail: string | null
    userId: string
    vehicles: { [id:string] : Vehicle }
    constructor(userId: string, email: string | null, name : string) {
        this.name = name
        this.mail = email
        this.userId = userId
        this.vehicles = {}
    }

    getDataForDb():Object {
        const vehiclesData: { [id: string]: any } = {};
        for (const [key, vehicle] of Object.entries(this.vehicles)) vehiclesData[key] = vehicle.toJSON();
        return {
            name: this.name,
            vehicles: vehiclesData
        };
    }

    hasVehicle(matricula: string) {
        return !!this.vehicles[matricula];
    }

    addVehicle(v: Vehicle): void {
        if (this.hasVehicle(v.matricula)) throw new Error("Vehicle already stored")
        this.vehicles[v.matricula] = v
    }

    removeVehicle(matricula: string) {
        if (!this.hasVehicle(matricula)) return false
        delete this.vehicles[matricula]
        return true
    }
}