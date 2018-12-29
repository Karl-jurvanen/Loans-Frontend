import * as React from "react";
import Home from "../src/Home";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Dashboard from '../src/Dashboard'
import Login from '../src/Login'
export default () => (
  <Home page="Home">
    <Dashboard /> 
  </Home>
);
