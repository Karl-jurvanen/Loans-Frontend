import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = theme =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 700
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

    await fetch("http://localhost:9000/api/v1/login", {
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
      })
      .catch(error => console.error("Error:", error));
  }
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
              <FormLabel>Email</FormLabel>
            </Grid>
            <Grid item>
              <input
                type="text"
                name="email"
                onChange={e => this.handleChange(e)}
              />
            </Grid>
            <Grid item>
              <FormLabel>Password</FormLabel>
            </Grid>
            <Grid item>
              <input
                type="password"
                name="password"
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
