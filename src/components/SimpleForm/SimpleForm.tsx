import { VFC } from 'react'

import { SimpleButton } from '../SimpleButton/SimpleButton'

interface SimpleFormProps {
  onSubmit: (data: Record<string, unknown>) => void
}

export const SimpleForm: VFC<SimpleFormProps> = ({ onSubmit }) => {

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    onSubmit({
      username: e.currentTarget.elements.username.value
    })
  }

  return <form data-testid="simple-form" onSubmit={handleSubmit} name="simple-form">
    <input name="username" data-testid="simple-form-username" />
    <SimpleButton data-testid="simple-form-submit-button">Submit</SimpleButton>
  </form >
}