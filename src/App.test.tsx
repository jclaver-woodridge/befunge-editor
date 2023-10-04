import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from './App';

test('has the word "befunge" somewhere in the app by default', () => {
    render(<App />);
    const befungeElements = screen.getAllByText(/befunge/i);
    expect(befungeElements.length).toBeGreaterThan(0);
});
