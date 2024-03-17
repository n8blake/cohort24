export interface IWeatherData {
    currentWeather: ICurrentWeather,
    forecastDaily: IForcastDaily
}
export interface ICurrentWeather {
  name?: string;
  metadata?: any;
  asOf?: Date;
  cloudCover?: number;
  conditionCode?: string;
  daylight?: boolean;
  humidity?: number;
  pressure?: number;
  pressureTrend?: string;
  temperature?: number;
  temperatureApparent?: number;
  temperatureDewPoint?: number;
  uvIndex?: number;
  visibility?: number;
  windDirection?: number;
  windGust?: number;
  windSpeed?: number;
}

export interface IForcastDaily {
    name: string,
    days: Array<IForecastDayData>,
    metadata: any
}

export interface IForecast {
  forecastStart: Date;
  forecastEnd: Date;
  cloudCover: number;
  conditionCode: string;
  humidity: number;
  precipitationAmount: number;
  precipitationAmountByType: any;
  precipitationChance: number;
  precipitationType: number;
  snowfallAmount: number;
  windDirection: number;
  windSpeed: number;
}
export interface IForecastDayData {
  conditionCode?: string;
  forcaseEnd: Date;
  forecastStart: Date;
  maxUvIndex: number;
  moonPhase: string;
  moonrise: Date;
  moonset: Date;
  precipitationAmount: number;
  precipitationAmountByType?: any;
  precipitationChance: number;
  precipitationType: string;
  snowfallAmount: number;
  solarMidnight: Date;
  solarNoon: Date;
  sunrise: Date;
  sunriseCivil: Date;
  sunriseNautical: Date;
  sunriseAstronomical: Date;
  sunset: Date;
  sunsetCivil: Date;
  sunsetNautical: Date;
  sunsetAstronomical: Date;
  temperatureMax: number;
  temperatureMin: number;
  daytimeForecast: IForecast;
  overnightForecast: IForecast;
  restOfDayForecast: IForecast;
}