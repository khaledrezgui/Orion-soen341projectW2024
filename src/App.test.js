
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App'; // Corrected import statement

describe('App Component', () => {
  test('renders the expected message', () => {
    render(<App />);
    const messageElement = screen.getByText(/expected message/i);
    expect(messageElement).toBeInTheDocument();
  });
});
