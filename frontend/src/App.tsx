import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { EventDetails } from './pages/EventDetails';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/:eventId">
          <EventDetails />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
