import * as React from "react";
import { withStyles } from "@material-ui/core/styles";

interface IProps {
  offset: number,
  classes: any
}

class Clock extends React.Component<IProps, any> {
  public static defaultProps: IProps = {
    offset: 0,
    classes: {}
  };

  constructor(props) {
    super(props);
    let time = new Date();
    time.setUTCHours(time.getUTCHours() + props.offset);
    this.state = { time: time };
  }

  render() {
    const { classes } = this.props;
    return (
      <div >
        {this.state.time.getHours()  + ":"}
        {(this.state.time.getMinutes() < 10 ? "0" + this.state.time.getMinutes() : this.state.time.getMinutes()) + ":"}
        {this.state.time.getSeconds() < 10 ? "0" + this.state.time.getSeconds() : this.state.time.getSeconds()}
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
export default  Clock;
