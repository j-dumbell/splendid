import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders the title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Splendid/i);
  expect(linkElement).toBeInTheDocument();
});
