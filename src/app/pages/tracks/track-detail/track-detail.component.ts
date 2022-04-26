import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { TracksService } from '../services/tracks.service';
import * as contentful from 'contentful';
import { Track } from '../models/track';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/utils/contentful.service';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss'],
})
export class TrackDetailComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  track$!: Observable<contentful.Entry<Track>>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tracksService: TracksService,
    public contentfulService: ContentfulService
  ) {}

  ngOnInit(): void {
    this.subscription = this.tracksService.tracks$.subscribe(() => {
      this.track$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          this.tracksService.getTrack(params.get('slug') as string)
        )
      );
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  goBack(): void {
    this.router.navigate(['/tracks']);
  }
}
