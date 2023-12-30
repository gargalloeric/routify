import { Route } from "../model/Route";
import { getElectricityPrice } from "./ElectricityPriceREE";
import { getGasStations } from "./GasStations";
import { obtainCoordsFromName } from "./ORS";
import { filterGasStationsByDistance, calculateDistance } from "./RoutePriceCalculator";

export interface ICostStrategy {
    calculate(route: Route, consumptionAt100: number): number | Promise<number>
}

export class BycicleCostStartey implements ICostStrategy {
    calculate(route: Route, consumptionAt100: number): number {
        return (route.distance / 100) * consumptionAt100;
    }
}

export class FootCostStartey implements ICostStrategy {
    calculate(route: Route, consumptionAt100: number): number {
        return (route.distance / 100) * consumptionAt100;
    }
}

export class CombustionCostStrategy implements ICostStrategy {
    async calculate(route: Route, consumptionAt100: number): Promise<number> {
        const dataOrigin = await obtainCoordsFromName(route.origin);
        const latOrigin = dataOrigin.geometry.coordinates[1];
        const lonOrigin = dataOrigin.geometry.coordinates[0];

        const gasStations = await getGasStations();

        let nearbyGasStations = filterGasStationsByDistance(gasStations, latOrigin, lonOrigin, 10);
        if (!nearbyGasStations) nearbyGasStations = filterGasStationsByDistance(gasStations, latOrigin, lonOrigin, 20);
        if (!nearbyGasStations) nearbyGasStations = filterGasStationsByDistance(gasStations, latOrigin, lonOrigin, 50);

        const sortedGasStations = nearbyGasStations.sort((a, b) => {
            const distanceA = calculateDistance(latOrigin, lonOrigin, parseFloat(a['Latitud'].replace(',', '.')), parseFloat(a['Longitud (WGS84)'].replace(',', '.')));
            const distanceB = calculateDistance(latOrigin, lonOrigin, parseFloat(b['Latitud'].replace(',', '.')), parseFloat(b['Longitud (WGS84)'].replace(',', '.')));
            return distanceA - distanceB;
        });

        const nearestGasStation = sortedGasStations[0]
        const nearestFuelPrice = parseFloat(nearestGasStation['Precio Gasolina 95 E5'].replace(',', '.'))

        return parseFloat(((route.distance / 100) * consumptionAt100 * nearestFuelPrice).toFixed(2));
    }

}

export class ElectricCostStrategy implements ICostStrategy {
    async calculate(route: Route, consumptionAt100: number): Promise<number> {
        const price: number = await getElectricityPrice();

        return parseFloat(((route.distance / 100) * consumptionAt100 * (price / 1000)).toFixed(2));
    }
}