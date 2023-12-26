import { Route } from "../model/Route";

export interface ICostStrategy {
    calculate(route: Route, consumptionAt100: number): number
}

export class BycicleCostStartey implements ICostStrategy {
    calculate(route: Route, consumptionAt100: number): number {
        throw new Error("Method not implemented.");
    }
}

export class FootCostStartey implements ICostStrategy {
    calculate(route: Route, consumptionAt100: number): number {
        throw new Error("Method not implemented.");
    }
}