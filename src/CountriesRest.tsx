import React from "react";
import CountryRest from "./CountryRest";


class CountriesRest extends React.Component<any, any> {
  onSelect(selectedCountry) {
    this.props.selectCard(selectedCountry);
  }

  public render() {
    return (
      <div>
        
        {this.props.data.map((item, i) => (
          <CountryRest
            key={i}
            country={item}
            selectCard={this.onSelect.bind(this, item)}
            
          />
        ))}
      </div>
    );
  }
}

export default CountriesRest;
