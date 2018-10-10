import * as React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button
} from "@material-ui/core";
import Link from "next/link";

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
  }
});

function CountryRest(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={10}>
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
        <Grid item xs={2}>
          <Link href={{ pathname: "/country_info", query: { name: props.country.name } }}>
            <Button className={classes.button}>INFO</Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
}

export default withStyles(styles)(CountryRest);
