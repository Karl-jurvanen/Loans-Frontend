import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiPath from "./ApiPath";
import UserContext from "./UserContext";
import { getJwt, reroute } from "./helpers/jwt";

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
      this._isMounted && this.setState({ loaded: true, data });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes } = this.props;

    if (!this.state.loaded) {
      return (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      );
    } else {
      return (
        <Paper className={classes.root}>
          <UserContext.Consumer>
            {context => (
              <div>
                {context.id}
                {context.name}
              </div>
            )}
          </UserContext.Consumer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }
}

export default withStyles(styles)(Users);
