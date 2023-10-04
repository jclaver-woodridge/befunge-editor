import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from './App';

test('has the name of the author somewhere in the document', () => {
  render(<App />);
  const linkElement = screen.getByText(/joe/i);
  expect(linkElement).toBeInTheDocument();
});
