const ELECTRICITY_PRICE_URL = 'https://api.preciodelaluz.org/v1/prices/avg?zone=PCB';

export async function getElectricityPrice() {
    const target = new URL(ELECTRICITY_PRICE_URL);
    const resp = await fetch(target.toString()); // TODO proxy - failing request
    console.log(resp)
    const {price} = await resp.json();
    return parseFloat(price)
}