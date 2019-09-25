import { StockPrice } from '../models';

/** Actions that can be performed on the state */
export interface FetchInitAction {
    type: 'FETCH_INIT';
    payload: {
        pollTime: Date;
    };
}

export interface FetchSuccessAction {
    type: 'FETCH_SUCCESS';
    payload: {
        stockPrice: StockPrice;
    };
}

export interface FetchFailureAction {
    type: 'FETCH_FAILURE';
    payload: any; // tslint:disable-line:no-any
}

export type PollingAction =
    | FetchInitAction
    | FetchSuccessAction
    | FetchFailureAction;
