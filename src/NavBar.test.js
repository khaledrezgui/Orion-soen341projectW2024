import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import NavBar from './Components/NavBar/NavBar'; // Adjust the import path as necessary

describe('NavBar Component', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    // Assuming your NavBar contains a link or text related to the home page
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  // Add more tests here based on the functionality and elements within your NavBar
});
