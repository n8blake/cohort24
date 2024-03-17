import { Component, Input, OnInit } from '@angular/core';
import { ICurrentWeather } from 'src/app/models/weather-data.model';

@Component({
  selector: 'app-current-weather-table',
  templateUrl: './current-weather-table.component.html',
  styleUrls: ['./current-weather-table.component.scss']
})
export class CurrentWeatherTableComponent implements OnInit {

  @Input() currentWeather?: ICurrentWeather

  constructor() { }

  ngOnInit(): void {
  }

}
