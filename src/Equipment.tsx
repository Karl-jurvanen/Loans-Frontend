import * as React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ApiPath from "./ApiPath";
import { getJwt, reroute } from "./helpers/jwt";

interface IEquipmentState {
  data: [
    {
      id: number;
      code: number;
      name: string;
      info: string;
    }
  ];
}

interface IEquipmentProps {
  classes: {
    root: string;
    table: string;
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
    }
  });

class Equipment extends React.Component<IEquipmentProps, IEquipmentState> {
  _isMounted: boolean;

  constructor(props: any) {
    super(props);
    this._isMounted = false;
    this.state = {
      data: [{ id: null, name: "", info: "", code: null }]
    };
  }

  public async componentDidMount() {
    this._isMounted = true;
    const fetchedData = await fetch(`${ApiPath}/equipment`, {
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
      this._isMounted && this.setState({ data });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Device id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.info}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(Equipment);
