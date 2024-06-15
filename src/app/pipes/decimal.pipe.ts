import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalComma'
})
export class DecimalCommaPipe implements PipeTransform {

  transform(value: number | string): string {
    if (typeof value === 'number') {
      return value.toString().replace('.', ',');
    } else if (typeof value === 'string') {
      return value.replace('.', ',');
    }
    return value;
  }

}
