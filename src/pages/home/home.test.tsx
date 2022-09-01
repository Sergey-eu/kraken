import React, { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './home.page';

beforeEach(() => {
  // eslint-disable-next-line
  // @ts-ignore: Unreachable code error
  delete window.ResizeObserver;
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.restoreAllMocks();
});

const RoutedPageComponent = (
  <BrowserRouter>
    <Routes >
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/chart'} element={<></>} />
    </Routes>
  </BrowserRouter>
);

test('home page loaded', () => {
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
