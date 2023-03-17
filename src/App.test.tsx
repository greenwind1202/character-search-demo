import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
          },
        ],
      }),
  })
) as jest.Mock;

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/SEARCHING CHARACTER APPLICATION/i);
  expect(linkElement).toBeInTheDocument();
});

describe('App', () => {
  it('load character on mount', async () => {
    await act(async () => render(<App />));
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });
});
