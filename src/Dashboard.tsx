import React from "react";
import UserContext from "./UserContext";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { List, ListItem, Divider } from "@material-ui/core";
import Login from "./Login";
export default function Dashboard(props) {
  return (
    <Paper style={{padding: 3}}>
      <UserContext.Consumer>
        {context =>
          context.id !== null ? (
            <Typography variant="title" >
              {"Welcome " + context.name}
            </Typography>
          ) : (
            <React.Fragment>
              <Typography variant="display1" gutterBottom align="center">
                Welcome to the loan system. You must log in to access this
                website.{" "}
              </Typography>
              <Typography variant="subheading" align="center">
                Note: This is a demo application where you can log in as a test
                user with the following credentials.
              </Typography>
              <List>
                <ListItem>
                  <List>
                    <ListItem dense>user@example.com</ListItem>
                    <ListItem dense>basicpassword</ListItem>
                  </List>
                </ListItem>
                <Divider />
                <ListItem>
                  <List>
                    <ListItem dense>admin@example.com</ListItem>
                    <ListItem dense>adminpassword</ListItem>
                  </List>
                </ListItem>
              </List>
            </React.Fragment>
          )
        }
      </UserContext.Consumer>
    </Paper>
  );
}
