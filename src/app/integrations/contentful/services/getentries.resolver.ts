import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { EntryCollection } from 'contentful';
import { ContentfulQuery } from 'src/app/pages/tracks/models/contentfull-query';
import { ITrackFields } from '../models/contentful';
import { ContentfullContentService } from './contentful-content.service';

@Injectable({
  providedIn: 'root',
})
export class GetEntriesResolver<T extends ITrackFields>
  implements Resolve<EntryCollection<T>>
{
  constructor(
    private contentfulContentService: ContentfullContentService<T>,
    private translocoService: TranslocoService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<EntryCollection<T>> {
    const slug = route.params['slug'];
    const query = this.getQuery(slug);
    return this.contentfulContentService.getEntries(query);
  }

  getQuery(slug: string): ContentfulQuery {
    const locale = this.translocoService.getActiveLang();
    const query = {
      content_type: 'track',
      locale,
    };
    if (slug) {
      return {
        ...query,
        'fields.slug[in]': slug,
      };
    }
    return query;
  }
}
