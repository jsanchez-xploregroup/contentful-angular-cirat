import { Injectable } from '@angular/core';
import { ContentfulClientApi, createClient } from 'contentful';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentfulClientService {
  private contentfulClient = createClient({
    space: environment.space,
    accessToken: environment.accessToken,
  });

  get cdaClient(): ContentfulClientApi {
    return this.contentfulClient;
  }
}
