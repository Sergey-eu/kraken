import React, { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import { HomePage } from './home.page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const RoutedPageComponent = (
  <BrowserRouter>
    <Routes >
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/chart'} element={<></>} />
    </Routes>
  </BrowserRouter>
);

test('homepage loaded', () => {
  render(RoutedPageComponent);
  expect(screen.getByRole('heading')).toHaveTextContent('Live Crypto Tracker');
  expect(screen.getByText('Select currency pairs...')).toBeInTheDocument();
  expect(screen.getByText('Track')).toBeInTheDocument();
});

test('market selected', () => {
  render(RoutedPageComponent);
  userEvent.click(screen.getByText('Select currency pairs...'));
  userEvent.click(screen.getByLabelText('BTC/USD'));
  expect(screen.getByRole('button')).toHaveTextContent('BTC/USD');
});

test('tracking initiated', () => {
  render(RoutedPageComponent);
  userEvent.click(screen.getByText('Track'));
  expect(location.pathname).toBe('/chart');
});
