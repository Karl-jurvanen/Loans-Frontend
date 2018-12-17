import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ResponsiveDrawer from "./ResponsiveDrawer";

class Home extends React.Component<any, any> {
  render() {
    return (
      <div className="root">
        <ResponsiveDrawer page={this.props.page}>{this.props.children}</ResponsiveDrawer>
      </div>
    );
  }
}

export default Home;
