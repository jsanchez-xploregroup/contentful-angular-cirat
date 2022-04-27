import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
} from '@ngneat/spectator';
import { TranslocoService } from '@ngneat/transloco';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let spectator: SpectatorService<LanguageService>;

  const createService = createServiceFactory({
    service: LanguageService,
    providers: [mockProvider(TranslocoService)],
  });

  beforeEach(() => (spectator = createService()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should change language', () => {
    const lang = 'en-US';
    const languageService = spectator.service as any;
    spyOn(languageService.subject, 'next');
    spectator.service.changeLang(lang);
    expect(
      spectator.inject(TranslocoService).setActiveLang
    ).toHaveBeenCalledWith(lang);
    expect(languageService.subject.next).toHaveBeenCalledWith(lang);
  });

  it('should get language by default', (done) => {
    spectator.service.lang.subscribe((lang) => {
      expect(lang).toBe('en-US');
      done();
    });
  });
});
