import { VFC, useState } from 'react'

import { SimpleButton } from '../SimpleButton/SimpleButton'

export const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts'

export const AdvancedForm: VFC = () => {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    setSubmitting(true)
    setError('')

    fetch(API_ENDPOINT).then(async (data) => {
      console.info(await data.json())
    }).catch((e) => setError(e.message))
      .finally(() => setSubmitting(false))
  }

  return <form data-testid="advanced-form" onSubmit={handleSubmit} name="advanced-form">
    {error && <span data-testid="advanced-form-error"></span>}

    <input name="username" data-testid="advanced-form-username" />
    <SimpleButton data-testid="advanced-form-submit-button" disabled={submitting}>Submit</SimpleButton>
  </form >
}