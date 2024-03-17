import { Component, OnInit, Input } from '@angular/core';
import { ICurrentWeather } from 'src/app/models/weather-data.model';

@Component({
  selector: 'app-simple-weather',
  templateUrl: './simple-weather.component.html',
  styleUrls: ['./simple-weather.component.scss']
})
export class SimpleWeatherComponent implements OnInit {

  @Input() currentWeather?: ICurrentWeather

  constructor() { }

  ngOnInit(): void {
  }

}
