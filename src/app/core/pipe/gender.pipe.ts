import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
  //the name will be use in template
})
export class GenderPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: string): string {
    if (value === 'M') return 'Male';
    if (value === 'F' || value === 'female') return 'Female';
    return '';
  }
}
