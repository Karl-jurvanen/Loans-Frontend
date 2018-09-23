import * as React from "react";
import Country from "./Country";

class Countries extends React.Component<any, any> {
  onSelect(selectedCountry) {
    this.props.selectCard(selectedCountry);
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        {this.props.maat.map(row => {
          return (
            <Country
              key={row.ID}
              maa={row}
              selectCard={this.onSelect.bind(this, row)}
            />
          );
        })}
      </div>
    );
  }
}
export default Countries;
