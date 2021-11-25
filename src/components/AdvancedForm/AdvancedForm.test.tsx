import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { AdvancedForm, API_ENDPOINT } from './AdvancedForm';

export const server = setupServer()


beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  })
})
afterAll(() => {
  server.close()
})

test('renders with default props', async () => {
  render(<AdvancedForm />);
  expect(await screen.findByTestId("advanced-form")).toBeInTheDocument();
  expect(await screen.findByTestId("advanced-form-submit-button")).toBeInTheDocument();
});

test('blocks submit button upon data submission and unblocks on success response', async () => {
  server.use(rest.get(API_ENDPOINT, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          "userId": 1,
          "id": 1,
          "title": "mocked title",
          "body": "mocked body"
        }
      ])
    )
  }))
  const username = 'My Name'
  render(<AdvancedForm />);

  userEvent.type(await screen.findByTestId('advanced-form-username'), username)
  userEvent.click(await screen.findByTestId('advanced-form-submit-button'))

  expect(await screen.findByTestId('advanced-form-submit-button')).toHaveProperty('disabled', true)
  await waitFor(async () => {
    expect(await screen.findByTestId('advanced-form-submit-button')).toHaveProperty('disabled', false)
  })
});


test('blocks submit button upon data submission and unblocks on failed response', async () => {
  server.use(rest.get(API_ENDPOINT, (req, res, ctx) => {
    res.networkError('Something went wrong')
  }))
  const username = 'My Name'
  render(<AdvancedForm />);

  userEvent.type(await screen.findByTestId('advanced-form-username'), username)
  userEvent.click(await screen.findByTestId('advanced-form-submit-button'))

  expect(await screen.findByTestId('advanced-form-submit-button')).toHaveProperty('disabled', true)
  await waitFor(async () => {
    expect(await screen.findByTestId('advanced-form-submit-button')).toHaveProperty('disabled', false)
    expect(await screen.findByTestId('advanced-form-error')).toBeInTheDocument()
  })
});
