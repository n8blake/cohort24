export interface IPlace {
  country: string;
  countryCode: string;
  displayMapRegion: any;
  formattedAddressLines: Array<string>;
  name: string;
  coordinate: ILocation;
  structuredAddress: any;
}

export interface ILocation {
    latitude: number;
    longitude: number;
}