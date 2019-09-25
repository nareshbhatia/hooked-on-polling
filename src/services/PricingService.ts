import axios from 'axios';
import { StockPrice } from '../models';

const api =
    'https://cors-anywhere.herokuapp.com/https://financialmodelingprep.com/api/v3';

async function fetchStockPrice(symbol: string): Promise<StockPrice> {
    const resp = await axios.get(
        `${api}/stock/real-time-price/${symbol}?datatype=json`
    );
    return resp.data;
}

export const PricingService = {
    fetchStockPrice
};
