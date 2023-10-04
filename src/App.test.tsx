import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from './App';

test('has the word "befunge" somewhere in the app by default', () => {
    render(<App />);
    const befungeElement = screen.getByText(/befunge/i);
    expect(befungeElement).toBeInTheDocument();
});
