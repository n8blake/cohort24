import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap, Observable, of } from 'rxjs';
import { ILocation, IPlace } from '../models/place.model';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  position?: GeolocationPosition;
  locationAvailable?: boolean;
  locationResolution: any = null;
  locationError: any = null;
  baseURL: string = '';

  constructor(private http: HttpClient) {
    if (!environment.production) {
      this.baseURL = environment.apiURL;
    }
    this.position = this.getSavedLocation();
  }

  success = (position: GeolocationPosition) => {
    this.position = position;
    this.locationResolution(this.position);
  };

  error = () => {
    this.locationAvailable = false;
    this.locationError('Locaton services unavailable');
  };

  getLocation(): GeolocationPosition | any {
    return this.position;
  }

  getSavedLocation(): ILocation | any {
    const savedLocation = localStorage.getItem('location');
    if (savedLocation) {
      return JSON.parse(savedLocation);
    }
  }

  saveLocation(location: ILocation) {
    const locationStr = JSON.stringify(location);
    localStorage.setItem('location', locationStr);
  }

  getReverseGeocode(location: ILocation): Observable<IPlace[]> {
    return this.http
      .get<IPlace[]>(
        this.baseURL +
          `/api/location/?lat=${location.latitude}&long=${location.longitude}`
      )
      .pipe(catchError(this.handleError<IPlace[]>('getReverseGeocode')));
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
