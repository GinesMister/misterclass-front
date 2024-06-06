import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourFormatter'
})
export class HourFormatterPipe implements PipeTransform {

  transform(value: Date | string): string {
    let date = new Date(value);
    if (isNaN(date.getTime())) {
      return '';
    }
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

}
