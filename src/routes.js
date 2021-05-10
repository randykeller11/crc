import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Onboarding from "./components/Onboarding";
import Watchlist from "./components/Watchlist";

export const UnauthenticatedRoutes = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>

          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export const AuthenticatedRoutes = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route path="/profile/:uid/watchlist">
            <Watchlist />
          </Route>
          <Route path="/onboard">
            <Onboarding />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
