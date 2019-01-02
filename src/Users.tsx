import * as React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiPath from "./ApiPath";
import UserContext from "./UserContext";
import { getJwt, reroute } from "./helpers/jwt";

import MUIDataTable from "mui-datatables";
interface IUsersState {
  loaded: boolean;
  data: [
    {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    }
  ];
}

interface IUsersProps {
  classes: {
    root: string;
    table: string;
    progress: string;
  };
}

const styles = theme =>
  createStyles({
    root: {
      width: "100%",
      overflowX: "auto"
    },
    table: {
      minWidth: 700
    },
    progress: {
      margin: "20%",
      textAlign: "center"
    }
  });

const columns = ["Id", "First Name", "Last Name", "Email", "Role"];

class Users extends React.Component<IUsersProps, IUsersState> {
  _isMounted: boolean;

  constructor(props: any) {
    super(props);
    this._isMounted = false;
    this.state = {
      loaded: false,
      data: [{ id: null, firstName: "", lastName: "", email: "", role: "" }]
    };
  }

  public async componentDidMount() {
    this._isMounted = true;
    const fetchedData = await fetch(`${ApiPath}/users`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${getJwt()}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
    // this token is invalid, remove it and redirect to login

    if (fetchedData.status === 401) {
      localStorage.removeItem("jwt");
      console.log("401");
      reroute("/login");
    } else {
      const data = await fetchedData.json();
      //const data = null
      this._isMounted && this.setState({ loaded: true, data });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes } = this.props;

    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      print: false,
      download: false,
      selectableRows: false,
    };
    if (!this.state.loaded) {
      return (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      );
    } else {
      return (
        <MUIDataTable
          title={"Users"}
          data={this.state.data.map(item => {
            return [
              item.id,
              item.firstName,
              item.lastName,
              item.email,
              item.role
            ];
          })}
          columns={columns}
          options={options}
        />
      );
    }
  }
}

export default withStyles(styles)(Users);
