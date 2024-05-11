import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countriesCodes'
})
export class CountriesCodesPipe implements PipeTransform {

  transform(value: string = "0", codePart2: string = "0"): string {
    return value + codePart2;
  }

}
