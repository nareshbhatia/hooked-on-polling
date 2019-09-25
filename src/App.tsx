import React from 'react';
import { HeartbeatContext } from './contexts';
import { useInterval } from './hooks';
import { HomePage } from './HomePage';

const App: React.FC = () => {
    const [heartbeat, setHeartbeat] = React.useState(new Date());

    // Start a 1 second heartbeat
    useInterval(() => {
        setHeartbeat(new Date());
    }, 1 * 1000);

    return (
        <div className="App">
            <HeartbeatContext.Provider value={heartbeat}>
                <HomePage />
            </HeartbeatContext.Provider>
        </div>
    );
};

export default App;
