import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { VariantRoute } from './components/VariantRoute'
import { Layout } from './components/Layout/Layout'
import { CurrentAccountLayout } from './components/Layout/CurrentAccountLayout'
import { EventDetailLayout } from './components/Layout/EventDetailLayout'
import { TicketsPage } from './pages/TicketsPage'
import { ListingsPage } from './pages/ListingsPage'
import { EventsV2Page } from './pages/EventsV2Page'
import { ListingsV2Page } from './pages/ListingsV2Page'
import { AccountLayout } from './pages/Account/AccountLayout'
import { ProfilePage } from './pages/Account/ProfilePage'
import { OrdersPage } from './pages/Account/OrdersPage'
import { HistoryPage } from './pages/Account/HistoryPage'
import { OrderHistoryV2Page } from './pages/Account/OrderHistoryV2Page'
import { SettingsPage } from './pages/Account/SettingsPage'
import { HelpCenterPage } from './pages/Account/HelpCenterPage'
import { OffersPage } from './pages/Account/OffersPage'
import { MorePage } from './pages/Account/MorePage'
import { SellLandingWrapper } from './landing/SellLandingWrapper'
import { SellLandingPage } from './landing/SellLandingPage'
import { EventDetailPage } from './pages/EventDetail/EventDetailPage'
import { TicketsUpgradesPage } from './pages/TicketsUpgradesPage'
import { TicketsParkingPage } from './pages/TicketsParkingPage'
import { TicketsMerchPage } from './pages/TicketsMerchPage'
import { TicketsAddOnsPage } from './pages/TicketsAddOnsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/current/tickets" replace />} />
      <Route path="/sell" element={<SellLandingWrapper />}>
        <Route index element={<SellLandingPage />} />
      </Route>
      {/* Current variant: account shell with left nav (desktop) / bottom nav (mobile), no app banner */}
      <Route path="/current" element={<VariantRoute variant="current" />}>
        <Route element={<CurrentAccountLayout />}>
          <Route index element={<Navigate to="tickets" replace />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="tickets-upgrades" element={<TicketsUpgradesPage />} />
          <Route path="tickets-parking" element={<TicketsParkingPage />} />
          <Route path="tickets-merch" element={<TicketsMerchPage />} />
          <Route path="tickets-addons" element={<TicketsAddOnsPage />} />
          <Route path="tickets/:eventId" element={<EventDetailLayout />}>
            <Route index element={<EventDetailPage />} />
            <Route path="upgrades" element={<EventDetailPage />} />
            <Route path="parking" element={<EventDetailPage />} />
            <Route path="merch" element={<EventDetailPage />} />
            <Route path="addons" element={<EventDetailPage />} />
          </Route>
          <Route path="orders" element={<OrdersPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="more" element={<MorePage />} />
          <Route path="account" element={<Outlet />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpCenterPage />} />
          </Route>
        </Route>
      </Route>
      {/* New variant: existing layout with NavTabs (Tickets, Listings, Account) and app banner */}
      <Route path="/new" element={<VariantRoute variant="new" />}>
        <Route index element={<Navigate to="tickets" replace />} />
        <Route path="tickets/:eventId" element={<EventDetailLayout />}>
          <Route index element={<EventDetailPage />} />
          <Route path="upgrades" element={<EventDetailPage />} />
          <Route path="parking" element={<EventDetailPage />} />
          <Route path="merch" element={<EventDetailPage />} />
          <Route path="addons" element={<EventDetailPage />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpCenterPage />} />
          </Route>
        </Route>
      </Route>
      {/* Current V2 variant: duplicate of current IA under /currentV2 */}
      <Route path="/currentV2" element={<VariantRoute variant="currentV2" />}>
        <Route element={<CurrentAccountLayout basePath="/currentV2" />}>
          <Route index element={<Navigate to="events" replace />} />
          <Route path="events" element={<EventsV2Page />} />
          <Route path="events/:eventId" element={<EventDetailLayout />}>
            <Route index element={<EventDetailPage />} />
            <Route path="upgrades" element={<EventDetailPage />} />
            <Route path="parking" element={<EventDetailPage />} />
            <Route path="merch" element={<EventDetailPage />} />
            <Route path="addons" element={<EventDetailPage />} />
          </Route>
          <Route path="listings" element={<ListingsV2Page />} />
          <Route path="events-upgrades" element={<TicketsUpgradesPage />} />
          <Route path="events-parking" element={<TicketsParkingPage />} />
          <Route path="events-merch" element={<TicketsMerchPage />} />
          <Route path="events-addons" element={<TicketsAddOnsPage />} />
          <Route path="order-history" element={<OrderHistoryV2Page />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="more" element={<MorePage />} />
          <Route path="account" element={<Outlet />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpCenterPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="/future" element={<VariantRoute variant="future" />}>
        <Route index element={<Navigate to="tickets" replace />} />
        <Route path="tickets/:eventId" element={<EventDetailLayout />}>
          <Route index element={<EventDetailPage />} />
          <Route path="upgrades" element={<EventDetailPage />} />
          <Route path="parking" element={<EventDetailPage />} />
          <Route path="merch" element={<EventDetailPage />} />
          <Route path="addons" element={<EventDetailPage />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpCenterPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
