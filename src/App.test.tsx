import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Base rendering test', () => {
  render(<App />);
  const linkElement = screen.getByText(/Chatbot/i);
  expect(linkElement).toBeInTheDocument();
});
