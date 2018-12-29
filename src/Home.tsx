import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ResponsiveDrawer from "./ResponsiveDrawer";
import UserContext from "./UserContext";
import jwtDecode from "jwt-decode";
import { getJwt } from "./helpers/jwt";
class Home extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: "Guest",
        id: null,
        admin: false
      }
    };
  }
  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.setState({ value: { name: "Guest", id: null, admin: false } });
  };
  componentDidMount() {
    this.checkJwt();
  }
  checkJwt = () => {
    const jwt = getJwt();
    if (!jwt) {
      this.setState({ value: { name: "Guest", id: null, admin: false } });
      console.log("guest");
    } else {
      const user = jwtDecode(jwt);
      console.log(user);

      this.setState({
        value: {
          name: user.name,
          id: user.id,
          admin: user.admin === "true"
        }
      });
    }
  }

  render() {
    return (
      <div className="root">
        <UserContext.Provider value={this.state.value}>
          <ResponsiveDrawer page={this.props.page}>
            {this.props.children}
          </ResponsiveDrawer>
        </UserContext.Provider>
      </div>
    );
  }
}

export default Home;
