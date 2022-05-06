import { Injectable } from '@angular/core';
import { EntryCollection, Entry, createClient } from 'contentful';
import { Subject } from 'rxjs';
import { ContentfulQuery } from 'src/app/pages/tracks/models/contentfull-query';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentfullContentService<T> {
  entries$ = new Subject<EntryCollection<T>>();
  entry$ = new Subject<Entry<T>>();

  private cdaClient = createClient({
    space: environment.space,
    accessToken: environment.accessToken,
  });

  async getEntries(query?: ContentfulQuery): Promise<void> {
    const entries = await this.cdaClient.getEntries<T>(query);
    console.log(entries);
    this.entries$.next(entries);
  }

  async getEntry(slug: string, query?: ContentfulQuery): Promise<void> {
    const queryObj = {
      content_type: 'track',
      'fields.slug[in]': slug,
      ...query,
    };

    const entry = await this.cdaClient.getEntries<T>(queryObj);
    this.entry$.next(entry.items[0]);
  }
}
