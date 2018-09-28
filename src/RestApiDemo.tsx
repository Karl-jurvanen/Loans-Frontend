import React from "react";

interface ICountriesState {
  data: any;
}

class RestApiDemo extends React.Component<{}, ICountriesState> {
  constructor(props) {
    super(props);
    this.state = {
      data: ["testitem"]
    };
  }

  public async componentDidMount() {
    console.log("inside componenDidMount");

    const fetchedData = await fetch("https://restcountries.eu/rest/v2/all");

    const data = await fetchedData.json();

    this.setState({ data });
  }

  public render() {
    return (
      <div>
        <h1>RestApiDemo</h1>

        {console.log(this.state.data)}
        {this.state.data.map((item, index) => (
          <div key={index}> 
            
          
          </div>
        ))}
      </div>
    );
  }
}

export default RestApiDemo;
