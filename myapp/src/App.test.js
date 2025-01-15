import React from 'react';
import { render, screen } from '@testing-library/react';
import ShowEvents from './components/Event/ShowEvents';

test('renders the "Events List" message', () => {
  render(<ShowEvents />);
  const EventsListText = screen.getByText('Events List');
  expect(EventsListText).toBeInTheDocument();
});