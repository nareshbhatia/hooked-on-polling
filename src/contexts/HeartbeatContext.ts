import React, { useContext } from 'react';

// ---------- Context ----------
/** provides time in millis since epoch */
const HeartbeatContext = React.createContext<number | undefined>(undefined);

// ---------- Hooks ----------
function useHeartbeat(): number {
    const heartbeat = useContext(HeartbeatContext);
    if (heartbeat === undefined) {
        throw new Error('useHeartbeat must be used within a HeartbeatProvider');
    }
    return heartbeat;
}

export { HeartbeatContext, useHeartbeat };
