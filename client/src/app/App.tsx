import { Provider } from 'react-redux'
import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { EventsPage } from '../pages/EventsPage/EventsPage'
import { EventDetailPage } from '../pages/EventDetailPage/EventDetailPage'
import { ImpressumPage } from '../pages/ImpressumPage/ImpressumPage'
import { DataPolicyPage } from '../pages/DataPolicyPage/DataPolicyPage'
import { ContactPage } from '../pages/ContactPage/ContactPage'
import { ApolloProvider } from '@apollo/react-hooks'
import { apolloClient } from '../api'
import { ClubDetailPage } from '../pages/ClubDetailPage/ClubDetailPage'
import { AdminPage } from '../pages/AdminPage/AdminPage'
import { AdminAddEventPage } from '../pages/AdminAddEventPage/AdminAddEventPage'
import { AdminUpdateEventPage } from '../pages/AdminUpdateEventPage/AdminUpdateEventPage'
import { AdminAddClubPage } from '../pages/AdminAddClubPage/AdminAddClubPage'
import { AdminUpdateClubPage } from '../pages/AdminUpdateClubPage/AdminUpdateClubPage'
import { ComponentLibraryPage } from '../pages/ComponentLibrary/ComponentLibrary'
import { LoginPage } from '../pages/LoginPage/LoginPage'
import { LoginRedirect } from '../components/LoginRedirect/LoginRedirect'
import { store } from '../redux/store'
import { ClubsPage } from '../pages/ClubsPage/ClubsPage'
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary'
import { CookieBanner } from '../components/CookieBanner'

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <ApolloProvider client={apolloClient}>
                <HashRouter>
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
                    <CookieBanner />
                </HashRouter>
            </ApolloProvider>
        </ErrorBoundary>
    )
}

export default App
