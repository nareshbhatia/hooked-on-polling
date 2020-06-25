import React from 'react';
import {
    fireEvent,
    render,
    waitFor,
    waitForElement,
} from '@testing-library/react';
import { HeartbeatContext, PricingStateProvider } from '../contexts';
import { HomePage } from '../HomePage';
import { PricingService } from '../services';

// Set environment variables used by the PricingService
const STOCK_SERVICE_API_KEY = 'STOCK_SERVICE_API_KEY';
const STOCK_SERVICE_URL = 'STOCK_SERVICE_URL';
const apiKey = 'some-api-key';
const apiUrl = 'some-api-url';
(window as any)._env_ = {
    STOCK_SERVICE_API_KEY: apiKey,
    STOCK_SERVICE_URL: apiUrl,
};

// Mock fetchStockPrice()
const fetchStockPrice = jest
    .spyOn(PricingService, 'fetchStockPrice')
    .mockResolvedValueOnce({
        symbol: 'AAPL',
        price: 100,
    })
    .mockResolvedValueOnce({
        symbol: 'AAPL',
        price: 200,
    })
    .mockRejectedValueOnce(new Error('Pricing error'));

const Container = () => {
    const [heartbeat, setHeartbeat] = React.useState(
        new Date('2010-01-01T00:00:00Z').getTime()
    );

    const handleClick = () => {
        // set heartbeat to 1 minute so that polling is initialized on every heartbeat
        setHeartbeat(heartbeat + 60 * 1000);
    };

    return (
        <HeartbeatContext.Provider value={heartbeat}>
            <PricingStateProvider>
                <HomePage />
                <button onClick={handleClick}>Heartbeat</button>
            </PricingStateProvider>
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
        await waitFor(() => expect(fetchStockPrice).toHaveBeenCalledTimes(1));
        expect(getByTestId('stock-price')).toHaveTextContent('AAPL: 100');

        // Trigger 2nd poll
        fireEvent.click(getByText('Heartbeat'));
        await waitFor(() => expect(fetchStockPrice).toHaveBeenCalledTimes(2));
        expect(getByTestId('stock-price')).toHaveTextContent('AAPL: 200');

        // Trigger 3rd poll
        fireEvent.click(getByText('Heartbeat'));
        await waitFor(() => expect(fetchStockPrice).toHaveBeenCalledTimes(3));
        expect(getByTestId('error')).toHaveTextContent('Error: Pricing error');
    });
});
