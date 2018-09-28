import * as React from "react";
import CountriesApp from "./CountriesApp";
import ButtonAppbar from "./ButtonAppBar";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

class Home extends React.Component<any, any> {
  render() {
    return (
      <div className="root">
        <ButtonAppbar />
        {this.props.children}
      </div>
    );
  }
}

export default Home;
