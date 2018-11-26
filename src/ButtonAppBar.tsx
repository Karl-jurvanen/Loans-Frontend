import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit">
            <MenuIcon/>
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.grow}>
            React Demo
          </Typography>

          <Link href="/">
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);
