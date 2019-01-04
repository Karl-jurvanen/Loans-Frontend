import * as React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Tooltip } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import ReturnedIcon from "@material-ui/icons/CheckCircleOutline";
import ApiPath from "./ApiPath";
import { getJwt, reroute } from "./helpers/jwt";
import MUIDataTable from "mui-datatables";

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

const columns = [
  {
    name: "Status",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        const returned = tableMeta.rowData[7];

        if (returned === "") {
          console.log("null");
        }
        switch (value) {
          case "Late":
            return (
              <Tooltip title="Late">
                <ErrorIcon color="error" />
              </Tooltip>
            );

          case "Returned":
            return (
              <Tooltip title="Returned">
                <ReturnedIcon style={{ color: "green" }} />
              </Tooltip>
            );
          case "Loaned":
            return <div />;
        }
      }
    }
  },
  {
    name: "Id",
    options: {
      filter: false
    }
  },
  { name: "Device Id", options: {} },
  { name: "Device Name", options: {} },
  { name: "Loaner", options: {} },
  {
    name: "Begins",
    options: {
      filter: false
    }
  },
  {
    name: "Ends",
    options: {
      filter: false
    }
  },
  {
    name: "Returned",
    options: {
      filter: false
    }
  }
];

const options = {
  filterType: "dropdown",
  responsive: "scroll",
  print: false,
  download: false,
  selectableRows: false,
  rowsPerPage: 10,
  rowsPerPageOptions: [10, 20, 100]
};

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

  checkStatus(item: ILoan) {
    let date = new Date(item.ends);
    if (item.timeReturned !== null) {
      return "Returned";
    } else if (date.getTime() < new Date().getTime()) {
      return "Late";
    } else {
      return "Loaned";
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
        // <TableCell>{row.id}</TableCell>
        // <TableCell>{row.code}</TableCell>
        // <TableCell>{row.name}</TableCell>
        // <TableCell>
        //   {row.loanerFirstName + " " + row.loanerLastName}
        // </TableCell>
        // <TableCell>{this.parsedate(row.begins)}</TableCell>
        // <TableCell>{this.parsedate(row.ends)}</TableCell>
        // <TableCell>{this.parsedate(row.timeReturned)}</TableCell>

        <MUIDataTable
          title={"Loans"}
          data={this.state.data.map(item => {
            return [
              this.checkStatus(item),
              item.id,
              item.code,
              item.name,
              item.loanerFirstName + " " + item.loanerLastName,
              this.parsedate(item.begins),
              this.parsedate(item.ends),
              this.parsedate(item.timeReturned)
            ];
          })}
          columns={columns}
          options={options}
        />
      );
    }
  }
}

export default withStyles(styles)(Equipment);
