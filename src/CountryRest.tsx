import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = createStyles({
  card: {
    maxHeight: 250,
    maxWidth: 700
  },
  media: {
    height: 140
  },
  button: {
    width: "100%",
    height: "100%"
  },
});

function CountryRest(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs = {10}>
          <CardActionArea
            onClick={() => props.selectCard()}
            style={{ width: "100%" }}
          >
            <CardContent>
              <Grid container spacing={40}>
                <Grid item xs={4}>
                  <CardMedia component="img" image={props.country.flag} />
                </Grid>

                <Grid item xs={6}>
                  <Typography color="textSecondary">
                    {props.country.ID}
                  </Typography>

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

                <Grid item xs={2} />
              </Grid>
            </CardContent>
          </CardActionArea>
        </Grid>
        <Grid item xs = {2}>
          <Button className={classes.button}>INFO</Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default withStyles(styles)(CountryRest);
