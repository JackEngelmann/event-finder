import { Provider } from 'react-redux'
import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { EventsPage } from './pages/EventsPage'
import { EventDetailPage } from './pages/EventDetailPage'
import { ImpressumPage } from './pages/ImpressumPage'
import { DataPolicyPage } from './pages/DataPolicyPage'
import { ContactPage } from './pages/Contact'
import { ApolloProvider } from '@apollo/react-hooks'
import { apolloClient } from './api'
import { ClubDetailPage } from './pages/ClubDetailPage'
import { AdminPage } from './pages/AdminPage'
import { AdminAddEventPage } from './pages/AdminAddEventPage'
import { AdminUpdateEventPage } from './pages/AdminUpdateEventPage'
import { AdminAddClubPage } from './pages/AdminAddClubPage'
import { AdminUpdateClubPage } from './pages/AdminUpdateClubPage'
import { ComponentLibraryPage } from './pages/ComponentLibrary'
import { LoginPage } from './pages/LoginPage'
import { LoginRedirect } from './containers/LoginRedirect'
import { store } from './redux/store'
import { ClubsPage } from './pages/ClubsPage'

const App: React.FC = () => {
    return (
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
            </HashRouter>
        </ApolloProvider>
    )
}

export default App
