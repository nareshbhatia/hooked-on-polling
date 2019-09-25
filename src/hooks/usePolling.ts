import React from 'react';
import { HeartbeatContext } from '../contexts';
import { PricingContextProps } from '../stores';
import { PricingService } from '../services';

const POLL_INTERVAL = 20 * 1000;
const SYMBOL = 'AAPL';

const { useContext, useEffect } = React;

/** Executes polling for getting pricing information */
export const usePolling = ({ state, dispatch }: PricingContextProps) => {
    const heartbeat = useContext(HeartbeatContext);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT', payload: { pollTime: heartbeat } });
            try {
                const stockPrice = await PricingService.fetchStockPrice(SYMBOL);
                // console.log('---> price:', stockPrice.price);
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: { stockPrice }
                });
            } catch (error) {
                dispatch({ type: 'FETCH_FAILURE', payload: error });
            }
        };

        if (
            heartbeat.getTime() - state.lastPollTime.getTime() >=
            POLL_INTERVAL
        ) {
            // console.log('---> lastPollTime:', state.lastPollTime.getTime());
            // console.log('---> heartbeat:   ', heartbeat.getTime());
            // console.log('---> polling');
            fetchData();
        }
    }, [heartbeat, state, dispatch]);
};
