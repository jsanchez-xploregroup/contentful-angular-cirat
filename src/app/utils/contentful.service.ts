import { Injectable } from '@angular/core';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  constructor() {}

  returnHtmlFromRichText(richText: any): string {
    if (
      richText === undefined ||
      richText === null ||
      richText.nodeType !== 'document'
    ) {
      return '<p>Error</p>';
    }
    return documentToHtmlString(richText);
  }
}
