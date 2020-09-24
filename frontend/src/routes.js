import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

import PrivateRoute from './components/PrivateRoute'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />

      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />


      <PrivateRoute path="/home" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Routes;