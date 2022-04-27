import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { TranslocoService } from '@ngneat/transloco';
import { of } from 'rxjs';
import { tracks } from 'src/app/spec-helpers/track.spec-helper';
import { TracksService } from './services/tracks.service';

import { TracksComponent } from './tracks.component';

describe('TracksComponent', () => {
  let spectator: Spectator<TracksComponent>;

  const createComponent = createComponentFactory({
    component: TracksComponent,
    shallow: true,
    providers: [
      mockProvider(TracksService, {
        tracks$: of(tracks.items),
      }),
      mockProvider(TranslocoService, {
        langChanges$: of('es'),
      }),
    ],
  });

  beforeEach(async () => {
    spectator = createComponent({
      detectChanges: false,
    });
  });

  it('should create', () => {
    spectator.detectChanges();
    expect(spectator.component).toBeTruthy();
  });

  it('should render properly track cards', () => {
    spectator.detectChanges();
    const trackCards = spectator.queryAll('mat-card');
    const titleFirstCard = spectator.query('mat-card-header');
    const paragraphFirstCard = spectator.query('mat-card-content p');
    const description = 'En esta ruta de unos 45 min y 1.23 km';

    expect(trackCards.length).toBe(tracks.items.length);
    expect(titleFirstCard).toHaveText(tracks.items[0].fields.name);
    expect(paragraphFirstCard).toHaveText(description);
    expect(spectator.query('img')).toHaveAttribute(
      'src',
      `${tracks.items[0].fields.images[0].fields.imageFile.fields.file.url}?w=500`
    );
  });
});
