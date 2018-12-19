import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import TextField from "@material-ui/core/TextField";
import ApiPath from "./ApiPath";

const styles = theme =>
  createStyles({
    root: {
      flexWrap: "wrap",
      width: "100%",
      minWidth: "500",
    }
  });

class Login extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    console.log("email" + this.state.email);
    console.log("password" + this.state.password);
    event.preventDefault();
    this.setState({ error: "" });

    await fetch(`${ApiPath}/login`, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: this.state.password,
        email: this.state.email
      })
    })
      .then(res => {
        if (res.status === 401) {
          console.log("401");
          this.setState({ error: "wrong username or password", password: "" });
          throw 401;
        }
        this.setState({ error: "", password: "" });

        return res.json();
      })
      .then(res => {
        localStorage.setItem("jwt", res.token);
        console.log(res);
        this.reroute();
      })
      .catch(error => console.error("Error:", error));
  }

  reroute = () => {
    Router.push("/users");
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <form onSubmit={e => this.handleSubmit(e)}>
          <Grid
            container
            className={classes.root}
            direction="column"
            alignItems="center"
            spacing={8}
          >
            <Grid item>
              <Typography variant="headline">Login</Typography>
            </Grid>

            <Grid item>
              <TextField
                required
                autoFocus
                label="Email"
                name="email"
                margin="normal"
                fullWidth
                onChange={e => this.handleChange(e)}
              />
            </Grid>

            <Grid item>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                name="password"
                margin="normal"
                value={this.state.password}
                onChange={e => this.handleChange(e)}
              />
            </Grid>
            <Grid item>
              <Typography style={{ color: "#CC0000" }}>
                {this.state.error}
              </Typography>
            </Grid>
            <Grid item>
              <Button type="submit" value="Submit" variant="text" fullWidth>
                Sing in
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(Login);
