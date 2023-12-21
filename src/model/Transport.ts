export enum Transport {
    Car = 'driving-car',
    Foot = 'foot-walking',
    Bycicle = 'cycling-regular'
}

export function getSpanishName(transport: Transport): string {
    let spValue = ''
    switch (transport) {
        case Transport.Car:
            spValue = "Con coche"
            break;
        case Transport.Foot:
            spValue = "A pie"
            break;
        case Transport.Bycicle:
            spValue = "Con bicicleta"
            break;
    }
    return spValue;
}