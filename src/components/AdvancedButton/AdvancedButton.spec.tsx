import { render, screen } from '@testing-library/react';
import { AdvancedButton } from './AdvancedButton';

test('renders as button', async () => {
  render(<AdvancedButton type='button' />);
  expect(await screen.findByTestId("advanced-button")).toBeInTheDocument();
});

test('renders as link', async () => {
  render(<AdvancedButton type='link' />);
  expect(await screen.findByTestId("advanced-button-link")).toBeInTheDocument();
});
