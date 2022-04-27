import {
  byTestId,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { HeaderComponent } from './header.component';
import { LanguageService } from './services/language.service';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;

  const createComponent = createComponentFactory({
    component: HeaderComponent,
    shallow: true,
    providers: [mockProvider(LanguageService)],
  });

  beforeEach(async () => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should behave call changeLang function', () => {
    spectator.dispatchFakeEvent(byTestId('en-button'), 'click');
    expect(spectator.inject(LanguageService).changeLang).toHaveBeenCalledWith(
      'en-US'
    );
  });
});
