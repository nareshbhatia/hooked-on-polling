import React from 'react';
import Debug from 'debug';
import { HeartbeatContext, PricingStateProvider } from './contexts';
import { useInterval } from './hooks';
import { HomePage } from './HomePage';
import { formatTime } from './utils';

const debug = Debug('App');

export const App: React.FC = () => {
    // Start heartbeat at current time. This will trigger the first poll
    // as soon as the app starts because initialPricingState.lastPollTime
    // is set to 0.
    const [heartbeat, setHeartbeat] = React.useState(new Date().getTime());
    debug('heartbeat:           %s', formatTime(heartbeat));

    // Start a 10 second heartbeat
    useInterval(() => {
        setHeartbeat(new Date().getTime());
    }, 10000);

    return (
        <div className="App">
            <HeartbeatContext.Provider value={heartbeat}>
                <PricingStateProvider>
                    <HomePage />
                </PricingStateProvider>
            </HeartbeatContext.Provider>
        </div>
    );
};
