// Import necessary dependencies for testing
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Import the component you want to test
import Clients from './index';
import TableSkeletonLoader from '@/components/Skeleton/tableSkeleton';

// Mock RTK Query hook
import { useGetClientsQuery } from '../../../store/services/client.service';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { FormDataProvider } from '@/contexts/clientFormContext';
import AddClientForm from './Forms/clientForm';
const mockUseGetClientsQuery = useGetClientsQuery as jest.MockedFunction<typeof useGetClientsQuery>;
jest.mock('../../../store/services/client.service', () => ({
  ...jest.requireActual('../../../store/services/client.service'), // Use the actual implementation for other functions
  useGetClientsQuery: jest.fn(),
}));

// Tests
it('displays loading indicator when fetching data', async () => {
  // Mock loading state
  mockUseGetClientsQuery.mockReturnValue({
    data: null,
    isLoading: true, // Set to true to simulate loading
    isFetching: true, // Set to true to simulate fetching
    isError: false,
    refetch: jest.fn(),
  });
  // Render the component
  render(
    <BrowserRouter>
      <TableSkeletonLoader />
    </BrowserRouter>,
  );

  // Check if the loading indicator is displayed
  // Adjust the assertion to match the loading logic
  act(() => {
    userEvent.click(screen.getByText('Add new Client'));
    render(
      <FormDataProvider>
        <AddClientForm />,
      </FormDataProvider>,
    );
    // expect(mockedNavigate).toHaveBeenCalledWith('/dashboard/customers/clients/add');
  });
  expect(screen.getByTestId('table-skeleton-loader')).toBeInTheDocument();
});

it('displays error message on data fetch failure', async () => {
  // Mock error state
  mockUseGetClientsQuery.mockReturnValue({
    data: null,
    isLoading: false,
    isFetching: false,
    isError: true, // Set to true to simulate an error
    refetch: jest.fn(),
  });
  // Render the component
  render(
    <BrowserRouter>
      <Clients />
    </BrowserRouter>,
  );

  // Check if the error message is displayed
  expect(screen.getByText('No data to display')).toBeInTheDocument();
});

// Additional tests can be added for other states and behaviors

// For navigation tests, you might need to import 'act' from '@testing-library/react' and wrap user interactions in it
// Example:
// act(() => {
//   userEvent.click(screen.getByText('Add new Client'));
// });
// Ensure navigation assertions are executed after the asynchronous behavior is complete
