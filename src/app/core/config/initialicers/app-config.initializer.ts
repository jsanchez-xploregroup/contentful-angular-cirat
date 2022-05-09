import { FactoryProvider, InjectionToken } from '@angular/core';
import { ContentfulClientApi } from 'contentful';
import { ContentfulClientService } from 'src/app/integrations/contentful/services/contentfulclient.service';

export const CDA_CLIENT = new InjectionToken<ContentfulClientApi>('CDA_CLIENT');

function cdaClientFactory(
  contentfulClientService: ContentfulClientService
): ContentfulClientApi {
  return contentfulClientService.cdaClient;
}

export const appConfigInitializer: FactoryProvider = {
  provide: CDA_CLIENT,
  useFactory: cdaClientFactory,
  deps: [ContentfulClientService],
};
