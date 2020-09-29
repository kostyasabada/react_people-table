import React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

import './App.scss';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const App = () => (
  <div className="App">
    <header>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              className="nav__link"
              activeClassName="nav__active"
              to="/"
              exact
            >
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              className="nav__link"
              activeClassName="nav__active"
              to="/people"
            >
              People
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>

    <Switch>
      <Route path="/" exact>
        <h1>HomePage</h1>
      </Route>
      <Route path="/home">
        <Redirect to="/" />
      </Route>
      <Route path="/people/:personSlug?">
        <PeoplePage />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  </div>
);

export default App;
