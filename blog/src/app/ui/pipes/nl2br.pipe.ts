import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'nl2br'})
export class NewLineToBrPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return value.replace(new RegExp('\n', 'g'), '<br>');
    }
    return '';
  }
}
