import * as React from "react";
import Grid from "@material-ui/core/Grid";
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

class Users extends React.Component<{}, IUsersState> {
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
    return (
      <Paper>
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

export default Users;
