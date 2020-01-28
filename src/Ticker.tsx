
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
  center: {
    textAlign: 'center'
  }
});

export default class Ticker extends React.PureComponent<ITimerProp, ITimerState> {
  timeout: number = 0;

  constructor(props: ITimerProp) {
    super(props);
    this.state = {
      now: new Date()
    };
  }

  componentDidMount(): void {
    let that = this;
    this.timeout = setTimeout(function fn() {
      that.setState({
        now: new Date()
      });
      that.timeout = setTimeout(fn, 1000);
    }, 1000);
  }

  componentWillUnmount(): void {
    clearTimeout(this.timeout);
  }

  render(): React.ReactNode {
    return (
      <View style={this.props.style}>
        <Text style={s.center}>
          {(String(this.state.now))}
        </Text>
      </View>
    );
  }
}


