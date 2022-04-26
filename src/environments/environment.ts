import { contentfulSpace } from './contentful.environment';
export const environment = {
  production: false,
  space: '8cn2oov2dxi6',
  ...contentfulSpace,
  contentTypeIds: {
    track: 'track',
  },
  translocoFilePath: '/assets/i18n',
};
