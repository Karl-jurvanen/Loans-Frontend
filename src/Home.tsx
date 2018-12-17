import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ResponsiveDrawer from "./ResponsiveDrawer";
import UserContext from "./UserContext";

class Home extends React.Component<any, any> {
  render() {
    return (
      <div className="root">
        <UserContext.Provider value={{ name: "test", id: 1 }}>
          <ResponsiveDrawer page={this.props.page}>
            {this.props.children}
          </ResponsiveDrawer>
        </UserContext.Provider>
      </div>
    );
  }
}

export default Home;
