import React from 'react';
import { PollingAction } from './PollingAction';
import { PricingState } from './pricingReducer';

export const INITIAL_PRICING_STATE: PricingState = {
    lastPollTime: new Date(0),
    polling: false,
    error: undefined,
    stockPrice: {
        symbol: 'AAPL',
        price: 0
    }
};

export interface PricingContextProps {
    state: PricingState;
    dispatch: React.Dispatch<PollingAction>;
}

export const PricingStore = React.createContext<PricingContextProps>({
    state: INITIAL_PRICING_STATE,
    dispatch: () => {
        /* istanbul ignore next */
        return;
    }
});
