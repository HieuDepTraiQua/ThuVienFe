import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeText'
})
export class CapitalizeTextPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return value[0].toUpperCase() + value.substr(1).toLowerCase();
    }
    return value;
  }

}
