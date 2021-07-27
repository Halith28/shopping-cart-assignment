import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../screens/home/home";
import Login from "../screens/login/login";
import notFound from "../screens/NotFound/notFound";
import Products from "../screens/products/products";
import SignUp from "../screens/signup/Signup";
import { Routes } from "./routes";

const RouterApp = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={Routes.home} component={Home} />
        <Route exact path={Routes.products} component={Products} />
        <Route exact path={Routes?.login} component={Login} />
        <Route exact path={Routes?.signUp} component={SignUp} />
        <Route exact path="/" component={SignUp} />

        <Route path="*" component={notFound} />
      </Switch>
    </Router>
  );
};

export default RouterApp;
