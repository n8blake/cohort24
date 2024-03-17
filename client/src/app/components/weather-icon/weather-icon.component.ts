import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.scss'],
})
export class WeatherIconComponent implements OnInit {
  @Input() weather?: string | any;

  constructor() {}

  ngOnInit(): void {}

  getWeatherIconClass(weather: string | any): string {
    const weatherIcons: { [key: string]: string } = {
      Clear: 'bi-brightness-high',
      Cloudy: 'bi-cloudy',
      Dust: 'bi-cloud-haze',
      Fog: 'bi-cloud-haze',
      Haze: 'bi-cloud-haze',
      MostlyClear: 'bi-cloud-sun',
      MostlyCloudy: 'bi-clouds',
      PartlyCloudy: 'bi-cloud-sun',
      ScatteredThunderstorms: 'bi-cloud-lightning-rain',
      Smoke: 'bi-cloud-haze',
      Breezy: 'bi-wind',
      Windy: 'bi-wind',
      Drizzle: 'bi-cloud-drizzle',
      HeavyRain: 'bi-cloud-rain-heavy',
      Rain: 'bi-cloud-rain',
      Showers: 'bi-cloud-rain-heavy',
      Flurries: 'bi-cloud-snow',
      HeavySnow: 'bi-snow2',
      MixedRainAndSleet: 'bi-cloud-rain',
      MixedRainAndSnow: 'bi-cloud-rain',
      MixedRainfall: 'bi-cloud-rain',
      MixedSnowAndSleet: 'bi-cloud-snow',
      ScatteredShowers: 'bi-cloud-rain-heavy',
      ScatteredSnowShowers: 'bi-cloud-snow',
      Sleet: 'bi-cloud-snow',
      Snow: 'bi-snow',
      SnowShowers: 'bi-cloud-snow',
      Blizzard: 'bi-snow2',
      BlowingSnow: 'bi-wind',
      FreezingDrizzle: 'bi-cloud-drizzle',
      FreezingRain: 'bi-cloud-rain',
      Frigid: 'bi-thermometer',
      Hail: 'bi-cloud-hail',
      Hot: 'bi-thermometer-high',
      Hurricane: 'bi-hurricane',
      IsolatedThunderstorms: 'bi-cloud-lightning-rain',
      SevereThunderstorm: 'bi-cloud-lightning-rain',
      Thunderstorm: 'bi-cloud-lightning-rain',
      Thunderstorms: 'bi-cloud-lightning-rain',
      Tornado: 'bi-tornado',
      TropicalStorm: 'bi-hurricane',
    };

    return weatherIcons[this.weather] || 'bi-question-circle'; // Default icon if not found
  }
}

