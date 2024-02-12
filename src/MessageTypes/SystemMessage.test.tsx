import React from 'react';
import { render, screen } from '@testing-library/react';
import SystemMessage from "./SystemMessage";

let sampleMessage = "This is a test system message"
test('Renders system test message', () => {
  render(<SystemMessage message={sampleMessage}></SystemMessage>);
  const testElement = screen.getByText(sampleMessage);
  expect(testElement).toBeInTheDocument();
  expect(testElement).toHaveStyle(`background-color: #B0B0B0`)
});

test('System message has correct background color', () => {
  render(<SystemMessage message={sampleMessage}></SystemMessage>);
  const testElement = screen.getByText(sampleMessage);
  expect(testElement).toHaveStyle(`background-color: #B0B0B0`)
});