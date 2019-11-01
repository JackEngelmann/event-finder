import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { EventDetailPage } from './pages/EventDetailPage';
import { ImpressumPage } from './pages/ImpressumPage';
import { DataPolicyPage } from './pages/DataPolicyPage';
import { ContactPage } from './pages/Contact';
import { ApolloProvider } from '@apollo/react-hooks'
import { apolloClient } from './api';
import { ClubDetailPage } from './pages/ClubDetailPage';

const App: React.FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <HashRouter>
        <Switch>
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
          <Route path="/club/:clubId">
            <ClubDetailPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </HashRouter>
    </ApolloProvider>
  );
}

export default App;
