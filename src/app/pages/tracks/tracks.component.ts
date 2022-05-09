import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { EntryCollection } from 'contentful';
import { of, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ITrackFields } from 'src/app/integrations/contentful/models/contentful';
import { ContentfullContentService } from 'src/app/integrations/contentful/services/contentful-content.service';
import { ContentfulService } from 'src/app/utils/contentful.service';
@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent implements OnInit {
  tracks$!: Observable<EntryCollection<ITrackFields>>;

  constructor(
    private contentfulContentService: ContentfullContentService<ITrackFields>,
    private contentfulService: ContentfulService,
    private transloco: TranslocoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tracks$ = of(
      this.route.snapshot.data['tracks'] as EntryCollection<ITrackFields>
    );

    this.tracks$ = this.transloco.langChanges$.pipe(
      switchMap((locale) => {
        const query = {
          content_type: 'track',
          locale,
        };
        return this.contentfulContentService.getEntries(query);
      })
    );
  }

  getFirstParagraph(richText: unknown): string {
    const description = this.contentfulService.returnHtmlFromRichText(richText);
    let firstDot = description.indexOf('.', 150);
    return description.slice(0, firstDot + 1);
  }
}
