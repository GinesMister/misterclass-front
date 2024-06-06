import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'europeanDate'
})
export class DateFormatterPipe implements PipeTransform {

  transform(value: Date | string): string {
    let date = new Date(value);
    if (isNaN(date.getTime())) {
      return '';
    }
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
