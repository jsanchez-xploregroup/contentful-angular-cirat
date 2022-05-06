import { Pipe, PipeTransform } from '@angular/core';
import { IImages } from '../models/contentful';

@Pipe({
  name: 'getFirstImage',
})
export class GetFirstImagePipe implements PipeTransform {
  transform(entryImages: IImages[] | undefined, widht: number): string {
    if (Array.isArray(entryImages) && entryImages[0]) {
      return (
        `${entryImages[0].fields.imageFile?.fields.file.url}?w=${widht}` || ''
      );
    }
    return '';
  }
}
