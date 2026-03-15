import { type InputHTMLAttributes, useId } from 'react'
import styles from './Input.module.css'

export function Input({
  label,
  type = 'text',
  inputMode,
  className = '',
  id: idProp,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal' | 'search'
  className?: string
}) {
  const generatedId = useId()
  const id = idProp ?? generatedId

  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        className={styles.input}
        {...props}
      />
    </div>
  )
}
