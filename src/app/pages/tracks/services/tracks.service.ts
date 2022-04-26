import { Injectable } from '@angular/core';
import * as contentful from 'contentful';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContentfulQuery } from '../models/contentfull-query';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  tracks$ = new Subject<contentful.Entry<Track>[]>();
  track$ = new Subject<contentful.Entry<Track>>();

  private cdaClient = contentful.createClient({
    space: environment.space,
    accessToken: environment.accessToken,
  });

  async getTracks(query?: ContentfulQuery): Promise<void> {
    const queryObj = {
      content_type: 'track',
      ...query,
    };

    const tracks = await this.cdaClient.getEntries<Track>(queryObj);
    this.tracks$.next(tracks.items);
  }

  async getTrack(slug: string, query?: ContentfulQuery): Promise<void> {
    const queryObj = {
      content_type: 'track',
      'fields.slug[in]': slug,
      ...query,
    };

    const track = await this.cdaClient.getEntries<Track>(queryObj);
    this.track$.next(track.items[0]);
  }
}
