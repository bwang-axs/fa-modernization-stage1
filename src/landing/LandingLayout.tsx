import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import styles from './LandingLayout.module.css'

export function LandingLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main} id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
