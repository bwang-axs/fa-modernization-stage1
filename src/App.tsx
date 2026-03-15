import { Routes, Route, Navigate } from 'react-router-dom'
import { VariantRoute } from './components/VariantRoute'
import { Layout } from './components/Layout/Layout'
import { TicketsPage } from './pages/TicketsPage'
import { ListingsPage } from './pages/ListingsPage'
import { AccountPage } from './pages/AccountPage'
import { SellLandingWrapper } from './landing/SellLandingWrapper'
import { SellLandingPage } from './landing/SellLandingPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/current/tickets" replace />} />
      <Route path="/sell" element={<SellLandingWrapper />}>
        <Route index element={<SellLandingPage />} />
      </Route>
      <Route path="/current" element={<VariantRoute variant="current" />}>
        <Route index element={<Navigate to="tickets" replace />} />
        <Route element={<Layout />}>
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
      </Route>
      <Route path="/future" element={<VariantRoute variant="future" />}>
        <Route index element={<Navigate to="tickets" replace />} />
        <Route element={<Layout />}>
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
