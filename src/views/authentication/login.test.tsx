import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import LoginContainer from './loginContainer';

// jest.mock('node-fetch', () => {
//   return jest.fn(() => Promise.resolve());
// });
// let mockFetch;
describe('LoginContainer', () => {
  // existing tests
  //   beforeEach(() => {
  //     mockFetch = jest.fn(() => Promise.resolve());
  //   });
  test('login fails with invalid email', async () => {
    render(<LoginContainer />, { wrapper: MemoryRouter });

    userEvent.type(screen.getByLabelText('Email Address'), 'invalid');
    userEvent.type(screen.getByLabelText('Password'), 'password123');

    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  test('login fails with empty password', async () => {
    render(<LoginContainer />, { wrapper: MemoryRouter });

    userEvent.type(screen.getByLabelText('Email Address'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), '');

    userEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByText('Password required')).toBeInTheDocument();
  });
});
