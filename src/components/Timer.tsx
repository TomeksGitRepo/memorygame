import React from 'react';
import { connect } from 'react-redux';
import { finishTime } from '../actions';
import './Timer.css';

class Timer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state.startTime = new Date();
  }

  state = {
    timeElapsed: Date,
    startTime: new Date()
  };

  computeElapsedTime(startTime: Date): number {
    let timeNow: Date = new Date();
    return (timeNow.getTime() - this.state.startTime.getTime()) / 1000;
  }

  componentDidMount() {
    this.setState({
      timeElapsed: Math.floor(this.computeElapsedTime(new Date()))
    });
    setInterval(
      () =>
        this.setState({
          timeElapsed: Math.floor(this.computeElapsedTime(new Date()))
        }),
      1000
    );
  }

  componentWillUnmount() {
    this.props.dispatch(
      finishTime(this.computeElapsedTime(this.state.startTime))
    );
  }

  render() {
    return (
      <div className="clock">
        Twój czas:
        <br />
        {this.state.timeElapsed}
      </div>
    );
  }
}

export default connect()(Timer);
