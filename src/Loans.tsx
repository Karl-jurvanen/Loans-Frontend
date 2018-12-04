import * as React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

interface ILoansState {
  data: [
    {
      id: number;
      deviceId: number;
      code: string;
      name: string;
      info: string;
      begins: string;
      ends: string;
    }
  ];
}

interface ILoansProps {
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

class Equipment extends React.Component<ILoansProps, ILoansState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [
        { id: null, deviceId: null, code: "", name: "", info: "", begins: "", ends: "" }
      ]
    };
  }

  public async componentDidMount() {
    const fetchedData = await fetch("http://localhost:9000/api/v1/loans");

    const data = await fetchedData.json();

    this.setState({ data });
  }

  pad(n) {
    return n < 10 ? "0" + n : n;
  }
  parsedate(timestamp: string) {
    //make sure that empty timestamp does not output NaNs
    if (timestamp === "") {
      return "";
    }

    let date = new Date(timestamp);
    console.log("date");
    console.log(date.getHours() + " " + date.getMinutes());
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

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Info</TableCell>
              <TableCell>Begins</TableCell>
              <TableCell>Ends</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.info}</TableCell>
                  <TableCell>{this.parsedate(row.begins)}</TableCell>
                  <TableCell>{this.parsedate(row.ends)}</TableCell>
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
