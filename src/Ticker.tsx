
import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {
  ITimerProp,
  ITimerState } from './types';

const s = StyleSheet.create({
  mainClock: {
    textAlign: 'center',
    fontSize: 90,
    color: '#e6f3f5',
    paddingVertical: 15
  },
  mainDate: {
    textAlign: 'center',
    fontSize: 23,
    color: '#e6f3f5'
  }
});

function twoDigits(n: number | string): string {
  return ('0' + n).slice(-2);
}

export default class Ticker extends React.PureComponent<ITimerProp, ITimerState> {
  static monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  static dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];
  nextLoad: number = 0;

  constructor(props: ITimerProp) {
    super(props);
    this.state = {
      now: new Date()
    };
  }

  componentDidMount(): void {
    let that = this;
    this.nextLoad = setTimeout(function fn() {
      that.tick();
      that.nextLoad = setTimeout(fn, 1000);
    }, 1000);
  }

  componentWillUnmount(): void {
    clearTimeout(this.nextLoad);
  }

  tick(): void {
    this.setState({
      now: new Date()
    });
  }

  render(): React.ReactNode {
    let now = this.state.now;
    return (
      <View style={this.props.style}>
        <Text style={s.mainClock}>
          {twoDigits(now.getHours())}:{twoDigits(now.getMinutes())}:{twoDigits(now.getSeconds())}
        </Text>
        <Text style={s.mainDate}>
          {Ticker.dayNames[now.getDay()-1]} {Ticker.monthNames[now.getMonth()]} {twoDigits(now.getDate())}, {now.getFullYear()}
        </Text>
      </View>
    );
  }
}


