import * as React from "react";

class Clock extends React.Component<any, any> {
  constructor(props) {
    super(props);
    let time = new Date();
    time.setUTCHours(time.getUTCHours() + props.offset);
    this.state = { time: time };
  }

  render() {
    return (
      <div>
        {this.state.time.getHours() + ":"}
        {this.state.time.getMinutes() + ":"}
        {this.state.time.getSeconds()}
      </div>
    );
  }

  componentDidMount() {
    let intervalID = setInterval(() => this.tick(), 1000);
    this.setState({ intervalID: intervalID });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  tick() {
    let time = new Date();
    time.setUTCHours(time.getUTCHours() + this.props.offset);
    this.setState({ time: time });
  }
}
export default Clock;
