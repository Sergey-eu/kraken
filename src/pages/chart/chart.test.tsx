import React, { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ChartPage } from './chart.page';
// import * as d3 from 'd3/dist/d3.min'
const { ResizeObserver } = window;

beforeEach(() => {
  // eslint-disable-next-line
  // @ts-ignore: Unreachable code error
  delete window.ResizeObserver;
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
  jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(100);
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100);
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.restoreAllMocks();
});

const RoutedPageComponent = (
  <MemoryRouter initialEntries={['/chart']}>
    <Routes >
      <Route path={'/chart'} element={<ChartPage />} />
      {/* <Route path={'/'} element={<></>} /> */}
    </Routes>
  </MemoryRouter>
);

// test('chart page loaded', () => {
//   render(RoutedPageComponent);
//   // expect(screen.getByRole('heading')).toHaveTextContent('Live Crypto Tracker');
//   expect(screen.getByText('← Change Markets')).toBeInTheDocument();
// });

// test('market selected', () => {
//   render(RoutedPageComponent);
//   userEvent.click(screen.getByText('Select currency pairs...'));
//   userEvent.click(screen.getByLabelText('BTC/USD'));
//   expect(screen.getByRole('button')).toHaveTextContent('BTC/USD');
// });

test('tracking initiated', () => {
  render(RoutedPageComponent);
  expect(screen.getByText('← Change Markets')).toBeInTheDocument();
});
