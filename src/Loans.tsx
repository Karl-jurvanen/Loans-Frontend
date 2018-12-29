import * as React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Tooltip } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import ReturnedIcon from "@material-ui/icons/CheckBoxOutlined";
import ApiPath from "./ApiPath";
import { getJwt, reroute } from "./helpers/jwt";

interface ILoan {
  id: number;
  deviceId: number;
  code: string;
  name: string;
  info: string;
  begins: string;
  ends: string;
  timeReturned: string;
  loanerId: string;
  loanerFirstName: string;
  loanerLastName: string;
  returned: boolean;
}

interface ILoansState {
  loaded: boolean;
  data: [ILoan];
}

interface ILoansProps {
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

class Equipment extends React.Component<ILoansProps, ILoansState> {
  _isMounted: boolean;

  constructor(props: any) {
    super(props);
    this._isMounted = false;
    this.state = {
      loaded: false,
      data: [
        {
          id: null,
          deviceId: null,
          code: "",
          name: "",
          info: "",
          begins: "",
          ends: "",
          timeReturned: "",
          loanerId: null,
          loanerFirstName: "",
          loanerLastName: "",
          returned: null
        }
      ]
    };
  }

  public async componentDidMount() {
    this._isMounted = true;
    const fetchedData = await fetch(`${ApiPath}/loans`, {
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

      data.forEach(element => {
        element.returned = element.timeReturned === null ? true : false;
      });
      this._isMounted && this.setState({ loaded: true, data });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  pad(n) {
    return n < 10 ? "0" + n : n;
  }
  parsedate(timestamp: string) {
    //make sure that empty timestamp does not output NaNs
    if (timestamp === "" || timestamp === null) {
      return "";
    }

    let date = new Date(timestamp);
    let output =
      this.pad(date.getDate()) +
      "." +
      this.pad(date.getMonth() + 1) +
      "." +
      date.getFullYear() +
      "      " +
      this.pad(date.getHours()) +
      ":" +
      this.pad(date.getMinutes());
    return output;
  }

  checkLate(item: ILoan) {
    let date = new Date(item.ends);
    if (date.getTime() < new Date().getTime() && item.timeReturned === null) {
      return true;
    } else {
      return false;
    }
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>id</TableCell>
                <TableCell>Device id</TableCell>
                <TableCell>Device Name</TableCell>
                <TableCell>Loaner</TableCell>
                <TableCell>Begins</TableCell>
                <TableCell>Ends</TableCell>
                <TableCell>Returned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>
                      {row.timeReturned !== null ? (
                        <Tooltip title="Returned">
                          <ReturnedIcon style={{ color: "green" }} />
                        </Tooltip>
                      ) : this.checkLate(row) ? (
                        <Tooltip title="Late">
                          <ErrorIcon color="error" />
                        </Tooltip>
                      ) : null}
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      {row.loanerFirstName + " " + row.loanerLastName}
                    </TableCell>
                    <TableCell>{this.parsedate(row.begins)}</TableCell>
                    <TableCell>{this.parsedate(row.ends)}</TableCell>
                    <TableCell>{this.parsedate(row.timeReturned)}</TableCell>
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

export default withStyles(styles)(Equipment);
