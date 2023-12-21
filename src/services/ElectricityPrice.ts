const ELECTRICITY_PRICE_URL = `${import.meta.env.VITE_ELECTICITY_URL}/v1/prices/avg?zone=PCB`;

export async function getElectricityPrice() {
    const resp = await fetch(ELECTRICITY_PRICE_URL);
    const {price} = await resp.json();
    return parseFloat(price)
}