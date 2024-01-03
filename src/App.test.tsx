import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from './App';

describe('Render the app correctly', () => {
  test('should render app', async () => {
    render(<App />);
  });
});
