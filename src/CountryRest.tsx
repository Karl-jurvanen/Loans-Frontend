import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = createStyles({
  card: {
    maxHeight: 250,
    maxWidth: 1000
  },
  media: {
    height: 140,
  },
});

function CountryRest(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea
        onClick={() => props.selectCard()}
        style={{ width: "100%" }}
      >
        <CardContent>
          <Grid container spacing={40}>
            <Grid item xs={4}>
              <CardMedia  component="img" image={props.country.flag} />
            </Grid>

            <Grid item xs={8}>
              <Typography color="textSecondary">{props.country.ID}</Typography>

              <Typography variant="headline" component="h2">
                {props.country.name}
              </Typography>

              <Typography color="textSecondary">
                {"Capital: " + props.country.capital}
              </Typography>

              <Typography color="textSecondary">
                {"Population: " + props.country.population}
              </Typography>

              <Typography color="textSecondary">
                {"Region: " + props.country.subregion}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default withStyles(styles)(CountryRest);
