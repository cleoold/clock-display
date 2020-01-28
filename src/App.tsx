
import React from 'react';
import {
  View,
  StatusBar,
  StyleSheet
} from 'react-native';
import Ticker from './Ticker';

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default function App(): JSX.Element {
  return (
    <>
      <StatusBar hidden />
      <View style={s.container}>
        <Ticker />
      </View>
    </>
  );
};


