import { Pipe, PipeTransform } from '@angular/core';
import { IEntity } from '../../interfaces/my-media-data.interfaces';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: IEntity[], searchTerm: string): IEntity[] {
    if (!items || !searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      const title = item.name.toLowerCase();
      return title.includes(searchTerm);
    });
  }
}
