import { Provider } from 'react-redux'
import React, { Suspense } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { apolloClient } from '../api'
import { LoginRedirect } from '../components/LoginRedirect/LoginRedirect'
import { store } from '../redux/store'
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary'
import { CookieBanner } from '../components/CookieBanner'
import { CookiesProvider } from 'react-cookie'
import { LoadingIndicator } from '../components/LoadingIndicator/LoadingIndicator'

const AdminAddClubPage = React.lazy(() =>
  import('../pages/AdminAddClubPage/AdminAddClubPage')
)
const AdminAddEventPage = React.lazy(() =>
  import('../pages/AdminAddEventPage/AdminAddEventPage')
)
const AdminPage = React.lazy(() => import('../pages/AdminPage/AdminPage'))
const AdminUpdateClubPage = React.lazy(() =>
  import('../pages/AdminUpdateClubPage/AdminUpdateClubPage')
)
const AdminUpdateEventPage = React.lazy(() =>
  import('../pages/AdminUpdateEventPage/AdminUpdateEventPage')
)
const ClubDetailPage = React.lazy(() =>
  import('../pages/ClubDetailPage/ClubDetailPage')
)
const ClubsPage = React.lazy(() => import('../pages/ClubsPage/ClubsPage'))
const ComponentLibraryPage = React.lazy(() =>
  import('../pages/ComponentLibrary/ComponentLibrary')
)
const ContactPage = React.lazy(() => import('../pages/ContactPage/ContactPage'))
const DataPolicyPage = React.lazy(() =>
  import('../pages/DataPolicyPage/DataPolicyPage')
)
const EventDetailPage = React.lazy(() =>
  import('../pages/EventDetailPage/EventDetailPage')
)
const EventsPage = React.lazy(() => import('../pages/EventsPage/EventsPage'))
const ImpressumPage = React.lazy(() =>
  import('../pages/ImpressumPage/ImpressumPage')
)
const LoginPage = React.lazy(() => import('../pages/LoginPage/LoginPage'))

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={apolloClient}>
        <CookiesProvider>
          <HashRouter>
            <Suspense fallback={<LoadingIndicator />}>
              <Provider store={store}>
                <Switch>
                  <Route path="/login">
                    <LoginPage />
                  </Route>
                  <Route path="/component-library">
                    <ComponentLibraryPage />
                  </Route>
                  <Route exact path="/admin">
                    <LoginRedirect />
                    <AdminPage />
                  </Route>
                  <Route path="/admin/add-event">
                    <LoginRedirect />
                    <AdminAddEventPage />
                  </Route>
                  <Route path="/admin/event/:eventId">
                    <LoginRedirect />
                    <AdminUpdateEventPage />
                  </Route>
                  <Route path="/admin/add-club">
                    <LoginRedirect />
                    <AdminAddClubPage />
                  </Route>
                  <Route path="/admin/club/:clubId">
                    <LoginRedirect />
                    <AdminUpdateClubPage />
                  </Route>
                  <Route path="/impressum">
                    <ImpressumPage />
                  </Route>
                  <Route path="/data-policy">
                    <DataPolicyPage />
                  </Route>
                  <Route path="/contact">
                    <ContactPage />
                  </Route>
                  <Route path="/event/:eventId">
                    <EventDetailPage />
                  </Route>
                  <Route path="/event">
                    <EventsPage />
                  </Route>
                  <Route path="/club/:clubId">
                    <ClubDetailPage />
                  </Route>
                  <Route path="/club">
                    <ClubsPage />
                  </Route>
                  <Redirect from="/" exact to="/event" />
                </Switch>
              </Provider>
            </Suspense>
            <CookieBanner />
          </HashRouter>
        </CookiesProvider>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

export default App
