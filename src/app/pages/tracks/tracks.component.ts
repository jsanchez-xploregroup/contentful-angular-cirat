import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { EntryCollection } from 'contentful';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ITrackFields } from 'src/app/integrations/contentful/models/contentful';
import { ContentfullContentService } from 'src/app/integrations/contentful/services/contentful-content.service';
import { ContentfulService } from 'src/app/utils/contentful.service';
@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  tracks$!: Observable<EntryCollection<ITrackFields>>;

  constructor(
    private contentfulContentService: ContentfullContentService<ITrackFields>,
    private contentfulService: ContentfulService,
    private transloco: TranslocoService
  ) {
    this.tracks$ = this.contentfulContentService.entries$;
  }

  ngOnInit(): void {
    this.subscription = this.transloco.langChanges$.subscribe(
      (locale: string) => {
        const query = {
          content_type: 'track',
          locale,
        };
        this.contentfulContentService.getEntries(query);
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
