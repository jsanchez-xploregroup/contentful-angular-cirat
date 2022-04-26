import { writeFile } from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: true,   
  accessToken: '${process.env['CONTENTFUL_TEST_ACCESS_TOKEN']}',
  space: '8cn2oov2dxi6',
  contentTypeIds: {
    track: 'track',
  },
  translocoFilePath: '/assets/i18n',
   
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
