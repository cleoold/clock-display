import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {
  IWeatherProp,
  IWeatherState
} from './types';
import {
  fetchRetry
} from './fetch';
import conf from './config';

const APIUrlBase = `http://api.openweathermap.org/data/2.5/forecast?appid=${conf.OpenWeatherAPIKey}&units=metric&cnt=25&q=`;

const s = StyleSheet.create({

});

const formatCityString = (str: string) => 
  str.split(',').filter(w => w !== '' && w !== ' ')
    .map(w => w.trim())
    .map((w, i) => {
      if (w.length === 2 && i !== 0) /** region name is of two letters, and does not appear in the place of a city name,
                                        then it is a province name */
        return w.toUpperCase();
      return w.charAt(0).toUpperCase() + w.slice(1)
    })
    .join(', ');

export default class WeatherTile extends React.PureComponent<IWeatherProp, IWeatherState> {
  nextLoad: number = 0;

  constructor(props: IWeatherProp) {
    super(props);
    this.state = {
      cityName: formatCityString(props.city),
      success: false,
      data: {}
    };
  }

  componentDidMount(): void {
    const that = this;
    this.nextLoad = setTimeout(async function fn() {
      that.fetchData();
      that.nextLoad = setTimeout(fn, that.state.success ? 300000 : 30000);
    }, 0);
  }

  async fetchData(): Promise<void> {
    try {
      const fetched = await fetchRetry(APIUrlBase + this.state.cityName);
      if (fetched.status !== 200)
        throw Error();
      this.setState({
        success: true,
        data: await fetched.json()
      });
    } catch (e) {
      this.setState({
        success: false
      });
    }
  }

  componentWillUnmount(): void {
    clearTimeout(this.nextLoad);
  }

  render(): React.ReactNode {
    return (
      <View>
      </View>
    );
  }
}
