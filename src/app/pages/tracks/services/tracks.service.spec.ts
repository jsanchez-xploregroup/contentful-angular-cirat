import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { tracks } from 'src/app/spec-helpers/track.spec-helper';

import { TracksService } from './tracks.service';

describe('AuthService', () => {
  let spectator: SpectatorService<TracksService>;
  const createService = createServiceFactory({
    service: TracksService,
  });

  beforeEach(() => (spectator = createService()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should return tracks and tracks$ have been called', async () => {
    const tracksService = spectator.service as any;
    spyOn(tracksService.cdaClient, 'getEntries').and.returnValue(tracks as any);
    spyOn(tracksService.tracks$, 'next');
    await tracksService.getTracks();
    expect(tracksService.cdaClient.getEntries).toHaveBeenCalled();
    expect(tracksService.tracks$.next).toHaveBeenCalled();
  });

  it('should return a track and track$ have been called', async () => {
    const tracksService = spectator.service as any;
    spyOn(tracksService.cdaClient, 'getEntries').and.returnValue(tracks as any);
    spyOn(tracksService.track$, 'next');
    await tracksService.getTrack('test-slug');
    expect(tracksService.cdaClient.getEntries).toHaveBeenCalled();
    expect(tracksService.track$.next).toHaveBeenCalled();
  });
});
