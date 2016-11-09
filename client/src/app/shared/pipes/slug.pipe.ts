import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'slug'})
export class SlugPipe implements PipeTransform {
  transform(value: string): any {
    if ( ! value) return null;

    return value.replace(/[-_]+/g, ' ').replace(/([\.,;])/g, '$1 ').split(' ').map(word => {
        return word.substr(0, 1).toUpperCase() + word.substr(1)
    }).join(' ')
  }
}
