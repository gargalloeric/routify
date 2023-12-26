import { Route } from "../model/Route";

export interface ICostStrategy {
    calculate(route: Route, consumptionAt100: number): number
}

export class BycicleCostStartey implements ICostStrategy {
    calculate(route: Route, consumptionAt100: number): number {
        return (route.distance/100) * consumptionAt100;
    }
}

export class FootCostStartey implements ICostStrategy {
    calculate(route: Route, consumptionAt100: number): number {
        return (route.distance/100) * consumptionAt100;
    }
}