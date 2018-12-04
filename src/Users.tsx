import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

interface IUsersState {
  data: [
    {
      id: number;
      firstName: string;
      lastName: string;
    }
  ];
}

interface IUsersProps {
  classes: {
    root: string;
    table: string;
  };
}

const styles = theme => createStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class Users extends React.Component<IUsersProps, IUsersState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [{ id: null, firstName: "", lastName: "" }]
    };
  }

  public async componentDidMount() {
    const fetchedData = await fetch("http://localhost:9000/api/v1/users");

    const data = await fetchedData.json();

    this.setState({ data });
    console.log(this.state);
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(Users);
