import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';
import { ILocation, IPlace } from 'src/app/models/place.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  coordinates?: GeolocationCoordinates;
  location?: ILocation;
  place?: IPlace;
  postalCode?: any;
  initializingPosition: boolean = true;

  constructor(private locationService: GeolocationService) {}

  ngOnInit(): void {
    this.initPosition();
  }

  success = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //console.log(`Lat ${latitude} long: ${longitude}`);
    this.location = { latitude, longitude };
    this.locationService.saveLocation(this.location);
    this.initializingPosition = false;
    if(this.location){
      this.reverseGeocodeLocation();
    }
  };

  error = () => {
    console.log('location error');
    this.initializingPosition = false;
    if (this.location) {
      this.reverseGeocodeLocation();
    }
  };

  reverseGeocodeLocation = () => {
    const setPlace = (place: IPlace) => {
      this.place = place;
    };

    this.locationService.getReverseGeocode(this.location!).subscribe({
      next(places: IPlace[]) {
        if(places && places.length > 0){
          setPlace(places[0]);
        }
      }
    });
  }

  

  initPosition = () => {
    console.log('getting position');
    try {
      this.location = this.locationService.getSavedLocation()
    } catch(err) {
      console.error(err);
    }
    navigator.geolocation.getCurrentPosition(this.success, this.error);
  }
}
