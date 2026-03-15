import { type HTMLAttributes, type ReactNode } from 'react'
import styles from './Card.module.css'

export function Card({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`${styles.card} ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}
