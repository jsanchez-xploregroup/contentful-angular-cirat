import * as contentful from 'contentful';

import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of, Subject } from 'rxjs';
import { tracks } from 'src/app/spec-helpers/track.spec-helper';
import { TracksService } from './services/tracks.service';

import { TracksComponent } from './tracks.component';
import { Track } from './models/track';

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

  it('should render track cards', () => {
    spectator.detectChanges();
    const trackCards = spectator.queryAll('mat-card');
    expect(trackCards.length).toBe(tracks.items.length);
  });
});
