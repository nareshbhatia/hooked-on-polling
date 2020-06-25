import { StockPrice } from '../models';

// ---------- State ----------
export interface PricingState {
    lastPollTime: number;
    polling: boolean;
    error: any;
    stockPrice: StockPrice;
}

// ---------- Actions ----------
export interface FetchInit {
    type: 'FETCH_INIT';
    payload: {
        pollTime: number;
    };
}

export interface FetchSuccess {
    type: 'FETCH_SUCCESS';
    payload: {
        stockPrice: StockPrice;
    };
}

export interface FetchFailure {
    type: 'FETCH_FAILURE';
    payload: any;
}

export type PricingAction = FetchInit | FetchSuccess | FetchFailure;

// ---------- Reducer ----------
export const pricingReducer = (state: PricingState, action: PricingAction) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                lastPollTime: action.payload.pollTime,
                polling: true,
                error: undefined,
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                polling: false,
                error: undefined,
                stockPrice: action.payload.stockPrice,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                polling: false,
                error: action.payload,
            };
        default:
            throw new Error();
    }
};
