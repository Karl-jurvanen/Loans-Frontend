import * as React from "react";
import Home from "../src/Home";
import CountriesApp from "../src/CountriesApp";
import Clock from "../src/Clock";
import RestApiDemo from "../src/RestApiDemo";
import CountriesRest from "../src/CountriesRest";
import Countries from "../src/Countries";
import Test from "../src/Test";
import Paper from "@material-ui/core/Paper";

export default () => (
  <Home>
    <Paper>
      <CountriesApp/>
    </Paper>
  </Home>
);
