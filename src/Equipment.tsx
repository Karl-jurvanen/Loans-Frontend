import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiPath from "./ApiPath";
import { getJwt, reroute } from "./helpers/jwt";
import MUIDataTable from "mui-datatables";

import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
  createStyles
} from "@material-ui/core/styles";
import { Overrides } from "@material-ui/core/styles/overrides";
interface IEquipmentState {
  loaded: boolean;
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
      minWidth: 700,
      maxHeight: 400
    },
    progress: {
      margin: "20%",
      textAlign: "center"
    }
  });
const columns = ["Device Id", "Name", "Info"];

class Equipment extends React.Component<IEquipmentProps, IEquipmentState> {
  _isMounted: boolean;

  constructor(props: any) {
    super(props);
    this._isMounted = false;
    this.state = {
      loaded: false,
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
      rowsPerPage: 10,
      rowsPerPageOptions: [10, 20, 100]
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
            title={"Equipment"}
            data={this.state.data.map(item => {
              return [item.code, item.name, item.info];
            })}
            columns={columns}
            options={options}
          />
      );
    }
  }
}

export default withStyles(styles)(Equipment);
