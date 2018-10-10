import Router from "next/router";
import * as React from "react";
import Link from "next/link";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button
} from "@material-ui/core";

class CountryInfo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      country: ["testitem"]
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
      <Card >
        <CardContent>
          <Grid container spacing={40}>
            <Grid item sm={5} xs={12}>
              <CardMedia component="img" image={this.state.country.flag} />
            </Grid>
            <Grid item sm={5} xs={8}>
              <Typography variant="headline" component="h2">
                {this.state.country.name}
              </Typography>
              <Typography variant="headline" component="h2">
                {this.state.country.nativeName}
              </Typography>

                {console.log(this.state.country)}

            </Grid>

            <Grid item sm = {2} xs={4}>
              <Link href="/rest">
                <Button color="primary" style={{ width: "100%" }}>Back</Button>
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default CountryInfo;
