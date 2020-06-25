import { useEffect } from 'react';
import Debug from 'debug';
import {
    useHeartbeat,
    usePricingState,
    usePricingActionDispatch,
} from '../contexts';
import { PricingService } from '../services';
import { formatTime } from '../utils';

const debug = Debug('usePolling');

const POLL_INTERVAL = 30 * 1000;
const SYMBOL = 'AAPL';

/** Executes polling for getting pricing information */
export const usePolling = () => {
    const heartbeat = useHeartbeat();
    const state = usePricingState();
    const dispatch = usePricingActionDispatch();

    const lastPollTime = state.lastPollTime;

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT', payload: { pollTime: heartbeat } });
            try {
                const stockPrice = await PricingService.fetchStockPrice(SYMBOL);
                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: { stockPrice },
                });
            } catch (error) {
                dispatch({ type: 'FETCH_FAILURE', payload: error });
            }
        };

        if (heartbeat - lastPollTime >= POLL_INTERVAL) {
            debug(
                'lastPollTime: %s',
                lastPollTime > 0 ? formatTime(lastPollTime) : '00:00:00'
            );
            debug('    ---> polling');
            fetchData();
        }
    }, [heartbeat, lastPollTime, dispatch]);
};
