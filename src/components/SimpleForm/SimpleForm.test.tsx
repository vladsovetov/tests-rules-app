import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { SimpleForm } from './SimpleForm';

test('renders with default props', async () => {
  render(<SimpleForm onSubmit={jest.fn()} />);
  expect(await screen.findByTestId("simple-form")).toBeInTheDocument();
  expect(await screen.findByTestId("simple-form-submit-button")).toBeInTheDocument();
});

test('returns filled data on submit', async () => {
  const username = 'My Name'
  const handleSubmitMock = jest.fn()
  render(<SimpleForm onSubmit={handleSubmitMock} />);

  userEvent.type(await screen.findByTestId('simple-form-username'), username)
  userEvent.click(await screen.findByTestId('simple-form-submit-button'))

  expect(handleSubmitMock).toBeCalledWith({
    username
  })
});
