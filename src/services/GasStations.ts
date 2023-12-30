import { ListaEESSPrecio } from "./APITypes";

const GAS_PRICE_URL = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/";

let instanceOfGasStations: Array<ListaEESSPrecio>;
let instanceOfGasStationsLastUpdateTime: number = 0;
export async function getGasStations() {
    const currentTime = new Date().getTime();

    if (!instanceOfGasStations || (!!instanceOfGasStationsLastUpdateTime &&  (currentTime - instanceOfGasStationsLastUpdateTime > 30 * 60 * 1000))) {
        const target = new URL(GAS_PRICE_URL);
        const resp = await fetch(target.toString());
        const {ListaEESSPrecio} = await resp.json();
        instanceOfGasStations = ListaEESSPrecio;
        instanceOfGasStationsLastUpdateTime = currentTime;
    }
    return instanceOfGasStations;
}