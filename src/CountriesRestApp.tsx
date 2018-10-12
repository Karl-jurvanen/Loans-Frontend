import * as React from "react";
import CountriesRest from "./CountriesRest";
import Grid from "@material-ui/core/Grid";

interface ICountriesState {
  data: any;
  selected: any;
}

class CountriesRestApp extends React.Component<{}, ICountriesState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: ["testitem"],
      selected: []
    };
  }

  onSelect(maa) {
    let index = this.state.selected.findIndex(x => x === maa);

    if (index == -1) {
      var joined = this.state.selected.concat(maa);
      this.setState({ selected: joined });
    }
  }

  onUnSelect(maa) {
    var filtered = this.state.selected.filter(item => item != maa);

    this.setState({ selected: filtered });
  }

  public async componentDidMount() {
    console.log("inside componenDidMount");

    const fetchedData = await fetch(
      "https://restcountries.eu/rest/v2/all?fields=name;capital;population;flag;subregion"
    );

    const data = await fetchedData.json();

    this.setState({ data });
  }

  render() {
    return (
      <div className="Muipaper" style={{ display: "flex" }}>
        <Grid container>
          <Grid item xs={6}>
            <CountriesRest
              data={this.state.data}
              selectCard={this.onSelect.bind(this)}
            />
          </Grid>
          <Grid item xs={6}>
            <CountriesRest
              data={this.state.selected}
              selectCard={this.onUnSelect.bind(this)}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CountriesRestApp;
