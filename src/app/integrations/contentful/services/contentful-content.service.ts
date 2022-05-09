import { Injectable } from '@angular/core';
import { EntryCollection, createClient } from 'contentful';
import { ContentfulQuery } from 'src/app/pages/tracks/models/contentfull-query';
import { ContentfulClientService } from './contentfulclient.service';

@Injectable({
  providedIn: 'root',
})
export class ContentfullContentService<T> {
  constructor(private contentfulClientService: ContentfulClientService) {}

  getEntries(query?: ContentfulQuery): Promise<EntryCollection<T>> {
    return this.contentfulClientService.cdaClient.getEntries<T>(query);
  }
}
