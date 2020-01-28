/** stylesheet for individual elements */
export type Style = {};

export type ITimerProp = { style?: Style };
export type ITimerState = { now: Date };
export type IWeatherProp = { style?: Style, city: string };
export type IWeatherState = { success: boolean, data: any };
