import { PollingAction } from './PollingAction';
import { StockPrice } from '../models';

/** The state maintained by the notificationsReducer */
export interface PricingState {
    lastPollTime: Date;
    polling: boolean;
    error: any; // tslint:disable-line:no-any
    stockPrice: StockPrice;
}

/** The reducer itself */
export const pricingReducer = (state: PricingState, action: PollingAction) => {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                lastPollTime: action.payload.pollTime,
                polling: true,
                error: undefined
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                polling: false,
                error: undefined,
                stockPrice: action.payload.stockPrice
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                polling: false,
                error: action.payload
            };
        default:
            throw new Error();
    }
};
