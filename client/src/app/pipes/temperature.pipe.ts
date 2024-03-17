import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number, scale = 'C'): string {
    switch (scale) {
      case 'F':
        return `${Math.round(value * (9 / 5) + 32)} ° F`;
      case 'F-':
        return `${Math.round(value * (9 / 5) + 32)} °`;
      case 'K':
        return `${Math.round((value + 273.15 + Number.EPSILON) * 100) / 100}K`;
      case 'C-':
        return `${Math.round(value)} °`;
      default:
        return `${Math.round(value)} ° C`;
    }
    
  }

}
