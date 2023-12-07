import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toSentence',
})

export class ToSentencePipe implements PipeTransform {
  transform(items: string[]): string {
    if (!items || items.length === 0) {
      return '';
    }

    if (items.length === 1) {
      return items[0];
    }

    return (
      items.slice(0, items.length - 1).join(', ') +
      ' and ' +
      items[items.length - 1]
    );
  }
}
