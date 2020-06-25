import React, { useContext, useReducer } from 'react';
import { PricingAction, pricingReducer, PricingState } from './pricingReducer';

export type PricingActionDispatch = (action: PricingAction) => void;

// ---------- Context ----------
// Note: Don't provide default value in context, it's not very useful.
// Provide it only in Context.Provider (see below).
// For details, see: https://kentcdodds.com/blog/how-to-use-react-context-effectively
const PricingStateContext = React.createContext<PricingState | undefined>(
    undefined
);

const PricingActionDispatchContext = React.createContext<
    PricingActionDispatch | undefined
>(undefined);

// ---------- Hooks ----------
function usePricingState(): PricingState {
    const state = useContext(PricingStateContext);
    if (state === undefined) {
        throw new Error(
            'usePricingState must be used within a PricingStateProvider'
        );
    }
    return state;
}

function usePricingActionDispatch(): PricingActionDispatch {
    const dispatch = useContext(PricingActionDispatchContext);
    if (dispatch === undefined) {
        throw new Error(
            'usePricingActionDispatch must be used within a PricingStateProvider'
        );
    }
    return dispatch;
}

// ---------- Provider ----------
const initialPricingState: PricingState = {
    lastPollTime: 0,
    polling: false,
    error: undefined,
    stockPrice: {
        symbol: 'AAPL',
        price: 0,
    },
};

const PricingStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(pricingReducer, initialPricingState);

    return (
        <PricingStateContext.Provider value={state}>
            <PricingActionDispatchContext.Provider value={dispatch}>
                {children}
            </PricingActionDispatchContext.Provider>
        </PricingStateContext.Provider>
    );
};

export { PricingStateProvider, usePricingState, usePricingActionDispatch };
