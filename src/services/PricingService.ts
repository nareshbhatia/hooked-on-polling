import axios from 'axios';
import Debug from 'debug';
import { StockPrice } from '../models';

const debug = Debug('PricingService');

const apiKey = (window as any)._env_?.STOCK_SERVICE_API_KEY;
const apiUrl = (window as any)._env_?.STOCK_SERVICE_URL;

async function fetchStockPrice(symbol: string): Promise<StockPrice> {
    const resp = await axios.get(
        `${apiUrl}/stock/real-time-price/${symbol}?apikey=${apiKey}&datatype=json`
    );
    const stockPrice = resp.data;
    debug('---> price: %d', stockPrice.price);

    return stockPrice;
}

export const PricingService = {
    fetchStockPrice,
};
