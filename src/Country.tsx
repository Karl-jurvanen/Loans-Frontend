import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function Country(props) {
  return (
    <Card>
      <CardActionArea
        onClick={() => props.selectCard()}
        style={{ width: "100%" }}
      >
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
      </CardActionArea>
    </Card>
  );
}

export default Country;
