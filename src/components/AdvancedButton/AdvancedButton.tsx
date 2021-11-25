import { FC } from 'react'

export const AdvancedButton: FC<{ type: 'button' | 'link' }> = ({ type, children, ...rest }) => {

  if (type === 'button') {
    return <button data-testid="advanced-button" {...rest}>{children}</button>
  } else {
    return <a data-testid="advanced-button-link" href="somewhere.com" {...rest}>{children}</a>
  }
}