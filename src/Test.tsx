import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import Clock from "./Clock";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import withWidth from '@material-ui/core/withWidth';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit,
  },
  field: {
    textAlign: "center"
  }
});

function Test(props) {
  const { classes } = props;
  const { width } = props;
  var num = 3;
  return (
    <Grid container alignContent="center" direction="row">
      <Grid item md={4} xs={6} className={classes.field}>
      {width}
      </Grid>

      <Grid item md={4} xs={6} className={classes.field}>
        <Clock />
      </Grid>
      {(width === 'lg' || width === 'md' )? 
      <Grid item xs={4} className={classes.field}>
        {num > 1 ? <Clock /> : <Fragment />}
      </Grid>
      :<Fragment></Fragment>
  }
    </Grid>
  );
}

export default withStyles(styles)(withWidth()( Test));
