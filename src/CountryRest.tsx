import React, { Fragment } from "react";
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

import withWidth from "@material-ui/core/withWidth";
import Link from "next/link";

const styles = createStyles({
  card: {
    maxWidth: 700
  },
  media: {
    height: 140
  },
  button: {
    width: "100%",
    height: "100%"
  },
  flag: {
    visibility: "visible"
  }
});

function CountryRest(props) {
  const { classes } = props;
  const { width } = props;

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item sm={10} xs={12}>
          <CardActionArea
            onClick={() => props.selectCard()}
            style={{ width: "100%", padding: 10 }}
          >
            <CardContent>
              <Grid container spacing={40}>
                <Grid xs={12}>
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
              </Grid>
            </CardContent>
          </CardActionArea>
        </Grid>
        <Grid item sm={2} xs={12}>
          <Link
            href={{
              pathname: "/country_info",
              query: { name: props.country.name }
            }}
          >
            <Button className={classes.button}>INFO</Button>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
}

export default withStyles(styles)(withWidth()(CountryRest));
