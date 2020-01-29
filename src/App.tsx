
import React, { ReactDOM } from 'react';
import {
  Animated,
  View,
  StatusBar,
  StyleSheet
} from 'react-native';
import Ticker from './Ticker';
import { IAppProp, IAppState } from './types';

const bgColors = [ '#32a852', '#1f522d', '#215245', '#114957', '#12274f', '#114957', '#215245', '#1f522d', '#32a852' ];
const bgColorsTiming = [ 0, .1, .3, .4, .5, .6, .7, .8, 1 ];

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default class App extends React.PureComponent<IAppProp, IAppState> {
  animation: Animated.Value;

  constructor(props: IAppProp) {
    super(props);
    this.animation = new Animated.Value(0);
  }

  componentDidMount(): void {
    this.startBGAnimation();
  }

  startBGAnimation(): void {
    this.animation.setValue(0);
    Animated.loop(Animated.timing(
      this.animation, {
        toValue: 1, duration: 40000
      }
    )).start();
  }

  render(): React.ReactNode {
    const BGColorConfig = this.animation.interpolate({
      inputRange: bgColorsTiming, outputRange: bgColors
    });
    return (
      <>
        <StatusBar hidden />
        <Animated.View style={{ ...s.container, backgroundColor: BGColorConfig }}>
          <Ticker />
        </Animated.View>
      </>
    );
  }
};


