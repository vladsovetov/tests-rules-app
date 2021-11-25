import { render, screen } from '@testing-library/react';
import { SimpleButton } from './SimpleButton';

test('renders with default props', async () => {
  render(<SimpleButton />);
  expect(await screen.findByTestId("simple-button")).toBeInTheDocument();
});
