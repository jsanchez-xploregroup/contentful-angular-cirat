import { Inject, Injectable } from '@angular/core';
import { CDA_CLIENT } from '@core/config/initialicers/app-config.initializer';
import { ContentfulClientApi, EntryCollection } from 'contentful';
import { ContentfulQuery } from 'src/app/pages/tracks/models/contentfull-query';
import { ContentfulClientService } from './contentfulclient.service';

@Injectable({
  providedIn: 'root',
})
export class ContentfullContentService<T> {
  constructor(@Inject(CDA_CLIENT) private cdaClient: ContentfulClientApi) {}

  getEntries(query?: ContentfulQuery): Promise<EntryCollection<T>> {
    return this.cdaClient.getEntries<T>(query);
  }
}
