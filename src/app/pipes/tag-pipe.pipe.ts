import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatTags', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(values: string[]) {
    if (values.length === 0) return;
    let newValue = `"${values[0]}"`;
    if (values.length === 1) return newValue;
    for (let i = 1; i < values.length; i++) {
      newValue += `, "${values[i]}"`;
    }
    return newValue;
  }
}