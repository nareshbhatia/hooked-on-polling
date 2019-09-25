import React from 'react';
import {
    INITIAL_PRICING_STATE,
    PricingContextProps,
    pricingReducer,
    PricingStore
} from './stores';
import { usePolling } from './hooks';

export const HomePage = () => {
    // Create reducer
    const [state, dispatch] = React.useReducer(
        pricingReducer,
        INITIAL_PRICING_STATE
    );
    const pricingContextProps: PricingContextProps = { state, dispatch };
    const { error, stockPrice } = state;

    // Enable the poller
    usePolling(pricingContextProps);

    if (error) {
        return <div data-testid="error">Error: {error.message}</div>;
    }

    return (
        <PricingStore.Provider value={pricingContextProps}>
            <h1>Hooked on Polling!</h1>
            <p data-testid="stock-price">
                {stockPrice.symbol}: {stockPrice.price}
            </p>
        </PricingStore.Provider>
    );
};
