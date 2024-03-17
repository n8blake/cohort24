import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap, Observable, of } from 'rxjs';
import { IWeatherData } from '../models/weather-data.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  baseURL: string = '';

  constructor(private http: HttpClient) {
    if (!environment.production) {
      this.baseURL = environment.apiURL;
    }
  }

  getWeather(latitude: string|number, longitutde: string|number): Observable<IWeatherData> {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   }),
    // };
    return this.http.get<IWeatherData>(
      this.baseURL + `/api/weather/?lat=${latitude}&long=${longitutde}`
    )
    .pipe(catchError(this.handleError<IWeatherData>('getWeather')));
  }

  private handleError<T>(
    operation = 'operation',
    result?: T
  ): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
