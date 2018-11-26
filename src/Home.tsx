import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBar from "./ButtonAppBar";

class Home extends React.Component<any, any> {
  render() {
    return (
      <div className="root">
      <ButtonAppBar/>
        {this.props.children}
      </div>
    );
  }
}

export default Home;
