import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

let scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

test('Base rendering test', () => {
  render(<App />);
  const linkElement = screen.getByText(/Chatbot/i);
  expect(linkElement).toBeInTheDocument();
});
