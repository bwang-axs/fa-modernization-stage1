import { Outlet } from 'react-router-dom'
import { AccountSideNav } from '../../components/AccountSideNav/AccountSideNav'
import styles from './AccountLayout.module.css'

export function AccountLayout() {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.aside}>
        <AccountSideNav />
      </aside>
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  )
}
