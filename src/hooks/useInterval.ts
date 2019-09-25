import { useEffect, useRef } from 'react';

/** Based on https://overreacted.io/making-setinterval-declarative-with-react-hooks/ */
// tslint:disable-next-line:no-any
export function useInterval(callback: (...args: any[]) => void, delay: number) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        // @ts-ignore
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            // @ts-ignore
            savedCallback.current();
        }
        /* istanbul ignore next */
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        } else {
            /* istanbul ignore next */
            return () => {
                return;
            };
        }
    }, [delay]);
}
