import { ButtonHTMLAttributes, FC } from 'react'

export const SimpleButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => <button data-testid="simple-button" style={{ color: 'red' }} {...props} />