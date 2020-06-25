import React, { Fragment } from 'react';
import { usePricingState } from './contexts';
import { usePolling } from './hooks';

export const HomePage = () => {
    const pricingState = usePricingState();
    const { error, stockPrice } = pricingState;

    // Enable the poller
    usePolling();

    if (error) {
        return <div data-testid="error">Error: {error.message}</div>;
    }

    return (
        <Fragment>
            <h1>Hooked on Polling!</h1>
            <p data-testid="stock-price">
                {stockPrice.symbol}: {stockPrice.price}
            </p>
        </Fragment>
    );
};
