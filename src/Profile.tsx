import * as React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ApiPath from "./ApiPath";
import { getJwt, getUserId, reroute } from "./helpers/jwt";
import { Typography, Divider } from "@material-ui/core";

const styles = theme =>
  createStyles({
    root: {
      width: "100",
      maxWidth: 400,
      margin: "0 auto",
      flexFlow: "1"
    },
    inline: {
      display: "inline"
    }
  });

class Profile extends React.Component<any, any> {
  _isMounted: boolean;

  constructor(props: any) {
    super(props);
    this._isMounted = false;
    this.state = {
      userId: null,
      data: { id: null, firstName: "", lastName: "", email: "", role: "" }
    };
  }

  public async componentDidMount() {
    this._isMounted = true;
    const userId = getUserId();
    if (!userId) {
      localStorage.removeItem("jwt");
      reroute("/login");
    }
    const fetchedData = await fetch(`${ApiPath}/users/${userId}`, {
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
    const user = this.state.data;
    return this.state.data.id === null ? (
      <div>loading</div>
    ) : (
      <Paper className={classes.root}>
        <List>
          <ListItem style={{ margin: "0 auto" }}>
            <Typography variant="display1">Profile</Typography>
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary={
                <Typography variant="caption" component="span">
                  name
                </Typography>
              }
              secondary={
                <Typography
                  variant="headline"
                  component="span"
                  className={classes.inline}
                >
                  {user.firstName + " " + user.lastName}
                </Typography>
              }
            />
          </ListItem>

          <ListItem divider>
            <ListItemText
              primary={
                <Typography variant="caption" component="span">
                  email
                </Typography>
              }
              secondary={
                <Typography
                  variant="headline"
                  component="span"
                  className={classes.inline}
                >
                  {user.email}
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="caption" component="span">
                  role
                </Typography>
              }
              secondary={
                <Typography
                  variant="headline"
                  component="span"
                  className={classes.inline}
                >
                  {user.role}
                </Typography>
              }
            />
          </ListItem>
          {user.adminStatus === 1 && (
            <React.Fragment>
              <Divider />
              <ListItem>
                <Typography variant="headline" component="span">
                  administrator
                </Typography>
              </ListItem>
            </React.Fragment>
          )}
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(Profile);
