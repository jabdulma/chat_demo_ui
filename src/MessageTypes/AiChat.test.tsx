import React from 'react';
import { render, screen } from '@testing-library/react';
import AiChat from "./AiChat";
import SystemMessage from "./SystemMessage";

let sampleMessage = "This is a test AI message"
test('Renders AI test message', () => {
  render(<AiChat message={sampleMessage}></AiChat>);
  const testElement = screen.getByText(sampleMessage);
  expect(testElement).toBeInTheDocument();
});

test('AI message has correct background color', () => {
  render(<SystemMessage message={sampleMessage}></SystemMessage>);
  const testElement = screen.getByText(sampleMessage);
  expect(testElement).toHaveStyle(`background-color: #B0B0B0`)
});