import { Component, Input, OnInit } from '@angular/core';
import { IForcastDaily } from '../../models/weather-data.model';
import { IForecastDayData } from '../../models/weather-data.model';

@Component({
  selector: 'app-upcoming-weather',
  templateUrl: './upcoming-weather.component.html',
  styleUrls: ['./upcoming-weather.component.scss']
})
export class UpcomingWeatherComponent implements OnInit {

  @Input() forecast?: IForcastDaily
  trimmedForecast?: Array<IForecastDayData>

  constructor() { }

  ngOnInit(): void {
    if(this.forecast){
      console.log(this.forecast);
      this.trimmedForecast = this.forecast.days.filter(entry => this.forecast!.days.indexOf(entry) < 7)
    }
  }

}
