import { Injectable } from '@angular/core';
import * as contentful from 'contentful';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { AppSettings } from 'src/app/common/appSettings';
import { LanguageService } from 'src/app/pages/header/services/language.service';
import { environment } from 'src/environments/environment';
import { Store } from 'store';
import { ContentfulQuery } from '../models/contentfull-query';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  tracks$: Observable<contentful.Entry<Track>[]>;
  locale: string = AppSettings.LANGUAGES.EN;

  private cdaClient = contentful.createClient({
    space: environment.space,
    accessToken: environment.accessToken,
  });

  constructor(private store: Store, private languageService: LanguageService) {
    this.tracks$ = this.languageService.lang.pipe(
      switchMap((lang) => {
        this.locale = lang;
        return from(this.getTracks()).pipe(map((tracks) => tracks.items));
      })
    );
  }

  async getTracks(
    query?: ContentfulQuery
  ): Promise<contentful.EntryCollection<Track>> {
    const queryObj = {
      content_type: 'track',
      locale: this.locale,
      ...query,
    };

    const tracks = await this.cdaClient.getEntries<Track>(queryObj);
    this.store.set('tracks', tracks.items);
    return tracks;
  }

  getTrack(slug: string): Observable<contentful.Entry<Track>> {
    return this.store.select<contentful.Entry<Track>[]>('tracks').pipe(
      map((tracks: contentful.Entry<Track>[]) => {
        const track = tracks.find(
          (t: contentful.Entry<Track>) => t.fields.slug === slug
        );
        return track as contentful.Entry<Track>;
      })
    );
  }
}
