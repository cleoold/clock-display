/** stylesheet for individual elements */
export type Style = {};

export type IAppProp = {};
export type IAppState = {};

export type ITimerProp = {
  style?: Style
};
export type ITimerState = {
  now: Date
};

export type IWeatherProp = {
  city: string,
  style?: Style
};
export type IWeatherState = {
  cityName: string,
  success: boolean,
  data: any
};
