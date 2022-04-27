import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { TracksService } from '../services/tracks.service';
import * as contentful from 'contentful';
import { Track } from '../models/track';
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable } from 'rxjs';
import { ContentfulService } from 'src/app/utils/contentful.service';
import { TranslocoService } from '@ngneat/transloco';

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
    public contentfulService: ContentfulService,
    private transloco: TranslocoService
  ) {
    this.track$ = this.tracksService.track$;
  }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const locale = this.transloco.getActiveLang();
      const queryObj = {
        locale,
      };
      this.tracksService.getTrack(params.get('slug') as string, queryObj);
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
