let formattedCurrentDate = "";
let formattedTomorrowDate = "";

const ELECTRICITY_PRICE_URL = `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?time_trunc=hour`;

export async function getElectricityPrice(): Promise<number> {
    updateDates()
    const preparedURLString = ELECTRICITY_PRICE_URL + `&start_date=${formattedCurrentDate}T00:00` + `&end_date=${formattedTomorrowDate}T00:00`;
    const resp = await fetch(preparedURLString);
    const jsresp = await resp.json();
    const prices = jsresp['included'][0]['attributes']['values']
    return calculateAvgElectricityPrice(prices)
}

function calculateAvgElectricityPrice(arr) : number {
    return  arr.map(item => item.value).reduce((sum, value, index, array) => sum + value / array.length, 0)
}

function updateDates() {
    const currentDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);

    formattedCurrentDate = currentDate.toISOString().split('T')[0];
    formattedTomorrowDate = tomorrowDate.toISOString().split('T')[0];
}