import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import Clock from "../src/Clock";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit,
  }
});

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.grow}>
            React Demo
          </Typography>

          <Link href="/">
            <Button color="inherit">Countries</Button>
          </Link>

          <Link href="/rest">
            <Button color="inherit">Rest</Button>
          </Link>
          <Link href="/both">
            <Button color="inherit">Both</Button>
          </Link>
          <Button disableRipple disableFocusRipple color="inherit">
            <Clock />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);
