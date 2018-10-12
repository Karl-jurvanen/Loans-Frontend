import React, { Fragment } from "react";
import Home from "../src/Home";
import CountriesApp from "../src/CountriesApp";
import Clock from "../src/Clock";
import RestApiDemo from "../src/RestApiDemo";
import CountriesRestApp from "../src/CountriesRestApp";
import Grid from "@material-ui/core/Grid";

export default () => (
  <Home>
    <Grid container>
      <Grid item xs={12} md={6}>
        <CountriesApp />
      </Grid>

      <Grid item xs={12} md={6}>
        <CountriesRestApp />
      </Grid>
    </Grid>
  </Home>
);
