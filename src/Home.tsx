import * as React from "react";
import CountriesApp from "./CountriesApp";
import ButtonAppbar from "./ButtonAppBar";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Router from "react-router";
import Route from "react-router";

class Home extends React.Component<any, any> {
  render() {
    return (
      <Paper className="Muipaper">
        <ButtonAppbar />

        <CountriesApp />
      </Paper>
    );
  }
}

export default Home;
