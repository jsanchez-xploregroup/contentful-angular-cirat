import { ActivatedRoute, Router } from '@angular/router';
import {
  byTestId,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { TranslocoService } from '@ngneat/transloco';
import { of } from 'rxjs';
import { tracks } from 'src/app/spec-helpers/track.spec-helper';
import { TracksService } from '../services/tracks.service';
import { TrackDetailComponent } from './track-detail.component';

describe('TrackDetailComponent', () => {
  let spectator: Spectator<TrackDetailComponent>;

  const createComponent = createComponentFactory({
    component: TrackDetailComponent,
    shallow: true,
    providers: [
      mockProvider(ActivatedRoute, {
        paramMap: of({
          get: () => 'test-slug',
        }),
      }),
      mockProvider(TracksService, {
        track$: of(tracks.items[0]),
      }),
      mockProvider(Router),
      mockProvider(TranslocoService, {
        getActiveLang: () => 'en-US',
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render a track', () => {
    expect(spectator.query('h3')).toHaveText(tracks.items[0].fields.name);
    expect(spectator.queryAll('p').length).toBe(6);
  });

  it('should back to tracks on click button', () => {
    spectator.click(byTestId('back-button'));
    expect(spectator.inject(Router).navigate).toHaveBeenCalledWith(['/tracks']);
  });
});
