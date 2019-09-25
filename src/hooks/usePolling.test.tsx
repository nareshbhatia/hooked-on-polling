import React from 'react';
import {
    fireEvent,
    render,
    waitForDomChange,
    waitForElement
} from '@testing-library/react';
import { HeartbeatContext } from '../contexts';
import { HomePage } from '../HomePage';

jest.mock('../services/PricingService', () => ({
    PricingService: {
        fetchStockPrice: jest
            .fn()
            .mockResolvedValueOnce({
                symbol: 'AAPL',
                price: 100
            })
            .mockResolvedValueOnce({
                symbol: 'AAPL',
                price: 200
            })
            .mockRejectedValueOnce(new Error('Pricing error'))
    }
}));

const Container = () => {
    const [heartbeat, setHeartbeat] = React.useState(
        new Date('2010-01-01T00:00:00Z')
    );

    const handleClick = () => {
        // set heartbeat to 1 minute so that polling is initialized on every heartbeat
        setHeartbeat(new Date(heartbeat.getTime() + 60 * 1000));
    };

    return (
        <HeartbeatContext.Provider value={heartbeat}>
            <HomePage />
            <button onClick={handleClick}>Heartbeat</button>
        </HeartbeatContext.Provider>
    );
};

// ----- Test -----
describe('usePolling', () => {
    it('fetches data on every heartbeat', async () => {
        const { getByTestId, getByText } = render(<Container />);
        const stockPrice = getByTestId('stock-price');

        // Initial content
        expect(stockPrice).toHaveTextContent('AAPL: 0');

        // 1st poll goes out right away because last poll was at epoch
        await waitForDomChange({ container: stockPrice });
        expect(getByTestId('stock-price')).toHaveTextContent('AAPL: 100');

        // Trigger 2nd poll
        fireEvent.click(getByText('Heartbeat'));
        await waitForDomChange({ container: stockPrice });
        expect(getByTestId('stock-price')).toHaveTextContent('AAPL: 200');

        // Trigger 3rd poll
        fireEvent.click(getByText('Heartbeat'));
        await waitForElement(() => getByTestId('error'));
        expect(getByTestId('error')).toHaveTextContent('Error: Pricing error');
    });
});
