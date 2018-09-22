import * as React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Country(props) {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary">{props.maa.ID}</Typography>

        <Typography variant="headline" component="h2">
          {props.maa.name}
        </Typography>

        <Typography color="textSecondary">
          {"population: " + props.maa.population}
        </Typography>

        <Typography color="textSecondary">
          {"percentage: " + props.maa.percentage}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Country;
//export default withStyles(styles)(Country);
