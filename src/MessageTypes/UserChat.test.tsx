import React from 'react';
import { render, screen } from '@testing-library/react';
import UserChat from "./UserChat";

let sampleMessage = "This is a test user message"
test('Renders user test message', () => {
  render(<UserChat message={sampleMessage}></UserChat>);
  const testElement = screen.getByText(sampleMessage);
  expect(testElement).toBeInTheDocument();
});

test('User message has correct background color', () => {
  render(<UserChat message={sampleMessage}></UserChat>);
  const testElement = screen.getByText(sampleMessage);
  expect(testElement).toHaveStyle(`background-color: #88BB88`)
});