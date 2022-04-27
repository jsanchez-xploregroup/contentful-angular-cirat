import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import * as contentful from 'contentful';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ContentfulService } from 'src/app/utils/contentful.service';
import { Track } from './models/track';
import { TracksService } from './services/tracks.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  tracks$!: Observable<contentful.Entry<Track>[]>;

  constructor(
    private tracksService: TracksService,
    private contentfulService: ContentfulService,
    private transloco: TranslocoService
  ) {
    this.tracks$ = this.tracksService.tracks$;
  }

  ngOnInit(): void {
    this.subscription = this.transloco.langChanges$.subscribe(
      (locale: string) => {
        const queryObj = {
          locale,
        };
        this.tracksService.getTracks(queryObj);
      }
    );
  }

  getFirstParagraph(richText: unknown): string {
    const description = this.contentfulService.returnHtmlFromRichText(richText);
    let firstDot = description.indexOf('.', 150);
    return description.slice(0, firstDot + 1);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
