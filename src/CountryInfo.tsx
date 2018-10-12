import Router from "next/router";
import * as React from "react";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography, Grid, Button } from "@material-ui/core";

class CountryInfo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      country: {
        currencies: []
      }
    };
  }

  public async componentDidMount() {
    console.log("inside componenDidMount");
    const country_name = Router.query.name;

    let url: string = "https://restcountries.eu/rest/v2/name/";
    url += country_name;
    url += "?fullText=true";

    const fetchedData = await fetch(url);

    const data = await fetchedData.json();

    this.setState({ country: data[0] });
    console.log(this.state.data);
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Grid container spacing={40}>
            <Grid item sm={5} xs={12}>
              <CardMedia component="img" image={this.state.country.flag} />
            </Grid>
            <Grid item sm={5} xs={8}>
              <Typography variant="display1" component="h2">
                {this.state.country.name}
              </Typography>

              {this.state.country.name !== this.state.country.nativeName ? (
                <Typography variant="display1" component="h2">
                  {this.state.country.nativeName}
                </Typography>
              ) : (
                <React.Fragment />
              )}

              <Typography color="textSecondary" style={{ paddingTop: 5 }}>
                {"Capital: " + this.state.country.capital}
              </Typography>

              <Typography color="textSecondary">
                {"Population: " + this.state.country.population}
              </Typography>

              {console.log(this.state.country)}
              {console.log(this.state.country.currencies)}

              <Typography variant="caption" style={{ paddingTop: 5 }}>
                Currencies
              </Typography>
              {this.state.country.currencies.map(item => (
                <Typography key={item} variant="body1" color="textSecondary">
                  {item.name}
                </Typography>
              ))}
            </Grid>

            <Grid item sm={2} xs={4}>
              <Link href="/rest">
                <Button color="primary" style={{ width: "100%" }}>
                  Back
                </Button>
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default CountryInfo;
