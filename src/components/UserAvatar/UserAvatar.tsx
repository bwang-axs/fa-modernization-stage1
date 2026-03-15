import styles from './UserAvatar.module.css'

type UserAvatarProps = {
  /** Display name used to derive initials (e.g. "John Smith" → "JS") */
  name?: string
  /** Optional size in pixels; default 36 */
  size?: number
  className?: string
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function UserAvatar({ name = 'John Smith', size = 36, className = '' }: UserAvatarProps) {
  const initials = getInitials(name)

  return (
    <div
      className={`${styles.avatar} ${className}`.trim()}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      title={name}
      aria-label={`Signed in as ${name}`}
    >
      {initials}
    </div>
  )
}
